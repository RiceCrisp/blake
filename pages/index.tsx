import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header, LatestPosts, Footer } from '../components'
import { getAllPosts } from '../lib/api'

export default function Home({ posts }): NextPage {
  return (
    <>
      <Head>
        <title>I make web stuff</title>
      </Head>

      <Header />

      <main className="py-xl">
        <div className="container">
          <h1>Hey, I'm Blake.<br />I make web stuff.</h1>
          <p>Here's my <a href="https://www.linkedin.com/in/blake-boucher/" target="_blank" rel="noopener noreferrer">linkedin</a> and <a href="https://codepen.io/ricecrisp/pen/XWaWxvY" target="_blank" rel="noopener noreferrer">resume</a>.</p>
          <p>And here are some things I found interesting or useful, so maybe you will too.</p>
          <LatestPosts posts={ posts } />
        </div>
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts
    }
  }
}
