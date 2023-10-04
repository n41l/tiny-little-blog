/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { PostOrPage, Tags } from '@tryghost/content-api'

interface PaginationProps {
  isNested?: boolean
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: PostOrPage[]
  title: string
  initialDisplayPosts?: PostOrPage[]
  tags: Tags,
  pagination?: PaginationProps
}

function Pagination({ isNested, totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const nestedPath = isNested ? pathname.substring(basePath.length + 1).split("/page/")[0] : '/'
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}${nestedPath}` : `/${basePath}${nestedPath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}${nestedPath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  tags,
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const sortedTags = tags.sort((a, b) => b.name!.localeCompare(a.name!))
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="sm:hidden text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden max-h-screen h-full sm:flex flex-wrap bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px] overflow-auto">
            <div className="py-4 px-6">
              {pathname.startsWith('/blog') ? (
                <h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t.id} className="my-3">
                      {pathname.split('/tags/')[1]?.split('/page/')[0] === slug(t.slug) ? (
                        <h3 className="inline py-2 px-3 uppercase text-sm font-bold text-primary-500">
                          {`${t.name} (${t.count?.posts})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t.slug)}`}
                          className="py-2 px-3 uppercase text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t.name}`}
                        >
                          {`${t.name} (${t.count?.posts})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { uuid, slug, published_at, title, excerpt, tags } = post
                return (
                  <li key={uuid} className="py-5">
                    <article className="space-y-2 flex flex-col xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          {
                            published_at !== null && published_at !== undefined ? 
                              <time dateTime={published_at}>
                                {
                                  formatDate(published_at, siteMetadata.locale)
                                }
                              </time> : <></>
                          }
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => <Tag key={tag.id} text={tag.name!} />)}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {excerpt}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination isNested={pagination.isNested} currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
