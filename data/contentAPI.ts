import GhostContentAPI from '@tryghost/content-api';

const contentAPI = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: "v5.0"
});

// Ghost content APIs:

// Posts
export async function getPosts(page?: number, size?: number) {
  const pageParam = page && page > 0 ? page : 1;
  const sizeParam = size && size > 0 ? `${size}` : 'all';

  return await contentAPI.posts
    .browse({ include: ["tags", "authors"], page: pageParam, limit: sizeParam })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getPostsByTag(tag: string, page?: number, size?: number) {
  const pageParam = page && page > 0 ? page : 1;
  const sizeParam = size && size > 0 ? `${size}` : 'all';
  return await contentAPI.posts
    .browse({ include: ["tags", "authors"], page: pageParam, limit: sizeParam, filter: `tag:${tag}` })
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

// Tags
export async function getTags() {
  return await contentAPI.tags
    .browse({ include: "count.posts" })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getTagBySlug(slug: string) {
  return await contentAPI.tags
    .read({ slug: slug })
    .catch((err) => {
      throw new Error(err);
    });
}

// Authors
export async function getAuthors() {
  return await contentAPI.authors
    .browse()
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getAuthorBySlug(slug: string) {
  return await contentAPI.authors
    .read({ slug: slug })
    .catch((err) => {
      throw new Error(err);
    });
}
