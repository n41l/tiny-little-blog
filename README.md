![tailwind-nextjs-banner](/public/static/images/twitter-card.png)

# Tailwind Nextjs Starter Blog backed by Ghost

This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) blogging starter blog backed by [Ghost](https://ghost.org/). The basic structure of this project is inherited from [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog), a wonderful blog template, if you have a existing Jekyll and Hugo individual blogs this tempalte is a perfect replacement. 

[Ghost](https://ghost.org/) is used as a headless CMS in this project, for now there isn't any content(post, author, etc.) archive mechanisms(investigating on [Contentlayer](https://contentlayer.dev/)).

## Why this project?

I wanted to have a blog friendly to myself: 
* Easy content mangement
* Good enough writing experience
* Easy content embedded


## Todo

- [ ] Newsletter subscription
- [ ] Brand new interface
- [ ] Content archive
- [ ] Ghost event notification(webhook)
- [ ] Ghost membership

## Development
### Setup Ghost

You should install Ghost locally first, here we will use the `ghost-cli` tool to install Ghost:

``` bash
$ npm install ghost-cli -g
```
Then, make a folder for your ghost isntance:
``` bash
$ mkdir ~/path/to/your/ghost/instance & cd ~/path/to/your/ghost/instance
```
In that folder install ghost with the **CLI tool**:
``` bash
$ ghost install local
```
After successful installation, Ghost is running on [http://localhost:2368](http://localhost:2368) now. The root endpoint [/](http://localhost:2368) for the default blog frontend and endpoint [/ghost](http://localhost:2368/ghost) for the admin.

> **Note:** Ghost is compatible with certain Node.js versions(16.x/18.x) only, check this [Ghost Supported Node versions](https://ghost.org/docs/faq/node-versions/) for detail. For Node installation, recommend [nvm](https://github.com/nvm-sh/nvm#install-script).

### Setup the Blog

First, clone the project into the folder for your blog:
``` bash
$ git clone https://github.com/n41l/tiny-little-blog.git ~/path/to/your/blog
```
Then, get into that folder and install all dependencies using `yarn`:
``` bash
$ cd ~/path/to/your/blog & yarn install
```
> **Note:** install `yarn` via `npm install yarn -g` is recommended.

Before running the blog server, some configuration for Ghost is needed:
``` typescript
  ...
  env: {
    GHOST_URL: "http://127.0.0.1:2368", 
    GHOST_CONTENT_KEY: "cd00f866b229bb942d8b8dfd50",
    POST_PER_PAGE: 5,
  },
  ...
```
Set the `GHOST_URL` and `GHOST_CONTENT_KEY` environment variables in `next.config.js` file, you can get those values from [Ghost Admin](http://localhost:2368/ghost/#/settings/integrations) by create a new custom integration. In detail page of your custom integration, you will find desire url and keys. For details check [Working With Next.js](https://ghost.org/docs/jamstack/next/).

Finally, run the develpment server:
``` bash
$ yarn dev
```

## Structure of the Project



## Deploy

**Vercel**  
The easiest way to deploy the template is to deploy on [Vercel](https://vercel.com). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

**Netlify**
[Netlify](https://www.netlify.com/)’s Next.js runtime configures enables key Next.js functionality on your website without the need for additional configurations. Netlify generates serverless functions that will handle Next.js functionalities such as server-side rendered (SSR) pages, incremental static regeneration (ISR), `next/images`, etc.

See [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/#next-js-runtime) for suggested configuration values and more details.

**Static hosting services / GitHub Pages / S3 / Firebase etc.**

1. Add `output: 'export'` in `next.config.js`. See [static exports documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#configuration) for more information.
2. Comment out `headers()` from `next.config.js`.
3. Change `components/Image.tsx` to use a standard `<img>` tag instead of `next/image`:

   ```ts
   /* eslint-disable jsx-a11y/alt-text */
   /* eslint-disable @next/next/no-img-element */
   import NextImage, { ImageProps } from 'next/image'

   // @ts-ignore
   const Image = ({ ...rest }: ImageProps) => <img {...rest} />

   export default Image
   ```

   Alternatively, to continue using `next/image`, you can use an alternative image optimization provider such as Imgix, Cloudinary or Akamai. See [image optimization documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization) for more details.

4. Remove `api` folder and components which call the server-side function such as the Newsletter component. Not technically required and the site will build successfully, but the APIs cannot be used as they are server-side functions.
5. Run `yarn build`. The generated static content is in the `out` folder.
6. Deploy the `out` folder to your hosting service of choice or run `npx serve out` to view the website locally.

## Support

Using the template? Support this effort by giving a star on GitHub, sharing your own blog and giving a shoutout on Twitter or becoming a project [sponsor](https://github.com/sponsors/timlrx).

## Licence

[MIT](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/LICENSE) © [Timothy Lin](https://www.timlrx.com)
