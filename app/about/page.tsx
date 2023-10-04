import { getAuthorBySlug, getAuthors } from '@/data/contentAPI'
import siteMetadata from '@/data/siteMetadata'
import { AboutLayout, SiteInfo } from '@/layouts/AboutLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default async function Page() {
  const authors = await getAuthors()
  const defaultAuthor = authors.find((author) => author.name === siteMetadata.author)
  const siteInfo = {
    title: siteMetadata.title,
    description: siteMetadata.description,
    founder: siteMetadata.author,
    profile_image: defaultAuthor?.profile_image,
    location: defaultAuthor?.location,
    email: siteMetadata.email,
    github: siteMetadata.github,
    twitter: siteMetadata.twitter,
  }
  return (
    <>
      <AboutLayout content={siteInfo}>
      </AboutLayout>
    </>
  )
}
