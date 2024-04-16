import Link from 'next/link';

import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>flashnotes</h1>
      <Link
        href="/login"
      >
        <span>Log in</span>
      </Link>
      <br />
      <Link
        href="/signup"
      >
        <span>Sign up</span>
      </Link>
    </main>
  );
}
