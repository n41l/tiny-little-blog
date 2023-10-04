// Copyright (c) 2023 ypg
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactNode } from 'react'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { Nullable } from '@tryghost/content-api'

export interface SiteInfo {
    title: string
    description: string
    founder: string
    profile_image: Nullable<string> | undefined
    location: Nullable<string> | undefined 
    email: Nullable<string> | undefined 
    twitter: Nullable<string> | undefined 
    github: Nullable<string> | undefined 
}

interface Props {
  children: ReactNode
  content: SiteInfo
}

export function AboutLayout({ children, content }: Props) {
  const { founder, profile_image, location, twitter, email, github} = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {profile_image && (
              <Image
                src={profile_image}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full object-contain"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{founder}</h3>
            <div className="text-gray-500 dark:text-gray-400">{location}</div>
            <div className="flex space-x-3 pt-6">
              {email && <SocialIcon kind="mail" href={email} />}
              {github && <SocialIcon kind="github" href={github} />}
              {twitter && <SocialIcon kind="twitter" href={twitter} />}
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
