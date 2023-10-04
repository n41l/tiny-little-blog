import { getPosts, getTags } from '@/data/contentAPI'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const pageNumber = 1
  const posts = await getPosts(pageNumber, POSTS_PER_PAGE)
  const tags = await getTags()
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: posts.meta.pagination.pages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      tags={tags}
      title="All Posts"
    />
  )
}
