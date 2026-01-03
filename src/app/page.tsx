import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-24">
      <h1 className='font-extrabold text-4xl'>contents</h1>
      <ul className='list-disc'>
        <li>
          <Link href='/travel'>travel</Link>
          <ul className='list-disc ml-4'>
            <li>
              <Link href='/travel/not-visit'>travel/not-visit</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='/wether'>wether</Link>
        </li>
      </ul>
    </main>
  )
}
