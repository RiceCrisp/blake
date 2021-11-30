import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Header, Footer } from '../components'
import { getAllPostSlugs, getPostBySlug } from '../lib/api'

export default function Page(params): NextPage {
  const {
    title,
    date,
    excerpt,
    slug
  } = params
  const DynamicComponent = dynamic(() => import(`../_posts/${slug}/index.tsx`))
  return (
    <>
      <Head>
        <title>{ title }</title>
      </Head>

      <Header />

      <main className="py-xl">
        <div className="container">
          <Link href="/">
            <a className="inline-block uppercase text-sm text-primary mb-xl">◂ Back to Web Stuff</a>
          </Link>
          <div className="flex flex-col space-y-4 bg-gray-light p-lg mb-xl">
            <h1 className="m-0">{ title }</h1>
            <p className="uppercase text-sm opacity-50 m-0">
              { Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date)) }
            </p>
            <p className="m-0">{ excerpt }</p>
          </div>
          <DynamicComponent />
        </div>
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const post = await getPostBySlug(slug)
  return {
    props: {
      ...post,
      slug: slug
    }
  }
}

export async function getStaticPaths() {
  const slugs = await getAllPostSlugs()
  return {
    paths: slugs.map(s => {
      return {
        params: { slug: s, test: 'test' }
      }
    }),
    fallback: false
  }
}
