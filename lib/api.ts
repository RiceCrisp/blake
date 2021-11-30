import { promises as fs } from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), '_posts')

export async function getAllPostSlugs() {
  return await fs.readdir(postsDirectory)
}

export async function getPostBySlug(slug) {
  const jsonPath = path.join(process.cwd(), '_posts', slug, 'data.json')
  const postData = await fs.readFile(jsonPath, 'utf8')
  return JSON.parse(postData)
}

export async function getAllPosts() {
  const postPaths = await fs.readdir(postsDirectory)
  const p = postPaths.map(async (filename) => {
    const jsonPath = path.join(process.cwd(), '_posts', filename, 'data.json')
    const postData = await fs.readFile(jsonPath, 'utf8')
    return {
      ...JSON.parse(postData),
      slug: filename
    }
  })
  return await Promise.all(p)
}
