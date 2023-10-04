import { getPosts } from '@/data/contentAPI'
import Main from './Main'
import { notFound } from 'next/navigation';

export default async function Page() {
  const posts = await getPosts().catch((e) => { notFound() });
  return <Main posts={posts} />
}
