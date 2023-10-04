import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { getPostBySlug, getPosts } from '@/data/contentAPI'
// import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
// import { allBlogs, allAuthors } from 'contentlayer/generated'
// import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => {
    slug: post.slug
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = await getPostBySlug(slug)
  const authorDetails = post.authors

  if (!post) {
    return
  }

  const publishedAt = new Date(post.published_at!).toISOString()
  const modifiedAt = new Date(post.updated_at || post.published_at!).toISOString()
  const authors = authorDetails?.map((author) => author.name ?? "") ?? []
  let imageList = [siteMetadata.socialBanner]
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageList,
    },
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = await getPosts();
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  console.log("123123123123")
  console.log(postIndex)
  if (postIndex === -1) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{' '}
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>
        </PageTitle>
      </div>
    )
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = await getPostBySlug(slug) 
  const postMeta = sortedCoreContents.find((p) => p.slug === slug)
  post.tags = postMeta?.tags ?? []
  post.authors = postMeta?.authors ?? []
  const Layout = PostLayout;

  return (
    <>
      <Layout post={post} prev={prev} next={next}>
        <article>
          <div dangerouslySetInnerHTML={{ __html: post.html!}}></div>
        </article>
      </Layout>
    </>
  )
}
