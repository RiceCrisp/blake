import Link from 'next/link'

export default function LatestPosts({ posts }) {
  return (
    <ul className="flex flex-col space-y-4 list-none m-0">
      { !!posts && posts.map(post => {
        const d = new Date(post.date)
        return (
          <li
            key={ post.slug }
            className="flex flex-col space-y-4 border border-solid border-gray-light p-lg clickable hover:bg-gray-light transition"
          >
            <h3 className="m-0">
              <Link href={ `/${post.slug}/` }>
                <a>{ post.title }</a>
              </Link>
            </h3>
            <p className="uppercase text-sm opacity-50 m-0">
              { Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(d) }
            </p>
            <p className="m-0">{ post.excerpt }</p>
          </li>
        )
      }) }
    </ul>
  )
}
