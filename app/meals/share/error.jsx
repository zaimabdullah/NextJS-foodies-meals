'use client'; // Error components must be Client Components

export default function Error() {
  return (
    <main className='error'>
      <h1>An error occured!</h1>
      <p>Failed to create meal.</p>
    </main>
  );
}
