// Copyright (c) 2023 ypg
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client'

import { KBarSearchProvider } from 'pliny/search/KBar'
import { useRouter } from 'next/navigation'

export const SearchProvider = ({ children }) => {
  const router = useRouter()
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          {
            id: 'homepage',
            name: 'Homepage',
            keywords: '',
            shortcut: ['h'],
            section: 'Navigation',
            perform: () => router.push('/'),
          },
          {
            id: 'posts',
            name: 'Blog',
            keywords: '',
            shortcut: ['b'],
            section: 'Navigation',
            perform: () => router.push('/blog'),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: '',
            shortcut: ['p'],
            section: 'Navigation',
            perform: () => router.push('/projects'),
          },
        ],
        // todo: post serach
        // onSearchDocumentsLoad(json) {
        //   return json.map((post: CoreContent<Blog>) => ({
        //     id: post.path,
        //     name: post.title,
        //     keywords: post?.summary || '',
        //     section: 'Blog',
        //     subtitle: post.tags.join(', '),
        //     perform: () => router.push(post.path),
        //   }))
        // },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}