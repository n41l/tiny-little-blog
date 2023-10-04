import GhostContentAPI from '@tryghost/content-api';

const contentAPI = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: "v5.0"
});

// Ghost content APIs:

// Posts
export async function getPosts() {
  return await contentAPI.posts
    .browse({ include: ["tags", "authors"], limit: "10" })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getPostBySlug(slug: string) {
  return await contentAPI.posts
    .read({ slug: slug })
    .catch((err) => {
      throw new Error(err);
    });
}

