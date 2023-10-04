import ListLayout from '@/layouts/ListLayoutWithTags'
import { getPosts, getTags } from '@/data/contentAPI'

const POSTS_PER_PAGE = 5

export default async function Page({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page);
  const posts = await getPosts(pageNumber, POSTS_PER_PAGE)
  const tags = await getTags()
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  console.log(posts)
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
