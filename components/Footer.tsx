import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-light">
      <div className="container">
        <div className="flex space-x-4 py-md">
          <a
            href="https://www.linkedin.com/in/blake-boucher/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://codepen.io/ricecrisp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodePen
          </a>
          <a
            href="https://github.com/RiceCrisp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
