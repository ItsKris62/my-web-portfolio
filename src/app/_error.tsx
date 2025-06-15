
import Link from 'next/link'

export default function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">{statusCode || 500}</h1>
      <p className="text-xl mt-4">An unexpected error has occurred.</p>
      <Link href="/">
        <a className="mt-6 px-6 py-3 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition">
          Go back home
        </a>
      </Link>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res?.statusCode ?? err?.statusCode
  return { statusCode }
}