import { slug } from 'github-slugger'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { getPostsByTag, getTags } from '@/data/contentAPI'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tags = await getTags()
  const paths = tags.map((tag) => ({
    tag: tag.slug,
  }))
  return paths
}

export default async function TagPage({ params }: { params: { tag: string, page: number} }) {
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const pageNumber = params.page
  const pageSize = parseInt(process.env.POSTS_PER_PAGE || "5")
  const posts = await getPostsByTag(tag, pageNumber, pageSize)
  const tags = await getTags()
  const initialDisplayPosts = posts.slice(
    pageSize * (pageNumber - 1),
    pageSize * pageNumber
  )
  const pagination = {
    isNested: true,
    currentPage: pageNumber,
    totalPages: posts.meta.pagination.pages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      tags={tags}
      title={title}
    />
  )
}
