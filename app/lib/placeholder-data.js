// DROP TABLE IF EXISTS users, notes, note_entries CASCADE;

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@dev.com',
    password: '123456',
  },
];

const notes = [
  {
    title: 'My First Note',
    date: '2023-01-16T07:00:00.000Z',
    entry: [
      {
        'Disadvantages of File Based System': 'Data redundancy, data inconsistency, difficult data access, security problems, difficulty concurrent access'
      },
      {
        'Primary goal of DBMS': 'to provide an environment that is convenient and efficient for users to retrieve and store information'
      },
      {'Attribute': 'columns are the sets of facts that we get track of regarding that type of object'},
      {'View': 'A view is a subset of the db which is defined and dedicated for particular users of the system'}
    ]
  },
  {
    title: 'My Second Note',
    date: '2023-06-16T07:00:00.000Z',
    entry: [
      {
        'Explain Hypertext Transfer Protocol': 'HTTP is a set of request methods to perform an action on resources (defined by URLS). Common methods include: GET, POST, PUT, DELETE'
      },
      {
        'Explain JWT (JSON Web Tokens)': ' compact/self contained way to securely transmit info between parties as a JSON object. used for auth and secure data exchange'
      },
      {'What is the purpose of authentication?': 'to protect resources and ensure only authorized users can access specific data or functionalities.'},
      {'Explain greedy algorithm': 'greedy algorithms build up solutions piece by piece and so each piece is going to have the most obvious and immediate benefit.'}
    ]
  }
];

module.exports = {
  users,
  notes
};
