import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.svg'

export default function Header() {
  return (
    <header className="border-b border-gray-light border-solid">
      <div className="container">
        <Link href="/">
          <a rel="home" className="block w-48 my-md">
            <img
              className="m-0"
              src="/logo.svg"
              alt="Blake Boucher"
              width="500"
              height="100"
            />
          </a>
        </Link>
      </div>
    </header>
  )
}
