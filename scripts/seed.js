const { db } = require('@vercel/postgres');
const { users, notes } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  // Ensure the UUID extension is available
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Create the users table if it doesn't exist
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await client.sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  console.log('Seeded users successfully.');
}

async function seedNotes(client) {
  try {
    // Create tables if they do not exist
    await client.sql`CREATE TABLE IF NOT EXISTS notes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title TEXT NOT NULL,
      date TIMESTAMP NOT NULL
    );`;
    await client.sql`CREATE TABLE IF NOT EXISTS note_entries (
      note_id UUID NOT NULL,
      entry JSON NOT NULL,
      FOREIGN KEY (note_id) REFERENCES notes(id)
    );`;

    // Insert data into notes table and note_entries table
    for (const note of notes) {
      const result = await client.sql`
      INSERT INTO notes (title, date) VALUES (${note.title}, ${note.date})
        RETURNING id;
      `;
      if (!result || result.length === 0) {
        console.error('No ID returned for note:', note);
        continue; // Skip this note and continue with others
      }
      const noteId = result[0].id;

      for (const entry of note.entry) {
        await client.sql`
          INSERT INTO note_entries (note_id, entry)
          VALUES (${noteId}, ${JSON.stringify(entry)});
        `;
      }

    }
    console.log('Seeded notes and note entries successfully.');
  } catch (error) {
    console.error('Error in seeding notes:', error);
    throw error; // Re-throw the error to handle it in main()
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedNotes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
