import ListLayout from '@/layouts/ListLayoutWithTags'
import { getPosts } from '@/data/contentAPI'

const POSTS_PER_PAGE = 5

export default async function Page({ params }: { params: { page: string } }) {
  const posts = await getPosts();
  const pageNumber = parseInt(params.page);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
