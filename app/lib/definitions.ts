export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type NotesEntry = {
  [key: string]: string;
}

export type Notes = {
  title: string;
  date: Date;
  entry: NotesEntry[];
}