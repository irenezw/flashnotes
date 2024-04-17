import {sql} from '@vercel/postgres';
import {
  User,
  NotesEntry,
  Notes
} from './definitions'

import { unstable_noStore as noStore } from 'next/cache';

export async function fetchNotes() {
  noStore()
  try {
    const data = await sql<Notes>`SELECT * FROM< notes`;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch notes data')
  }
}