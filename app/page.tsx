import { getPosts } from '@/data/contentAPI'
import Main from './Main'

export default async function Page() {
  const posts = await getPosts().catch((e) => { console.error(e) });
  posts[0].tags.map((tag) =>  console.log(tag));
  return <Main posts={posts} />
}
