'use client'
import FIcon from '@/app/icons/F'
import HomeIcon from '@/app/icons/Home'
import FriendsIcon from '@/app/icons/Friends'
import VideoIcon from '@/app/icons/Video'
import MarketplaceIcon from '@/app/icons/Marketplace'
import GroupIcon from '@/app/icons/Group'
import MenuIcon from '@/app/icons/Menu'
import MessengerIcon from '@/app/icons/Messenger'
import NotifyIcon from '@/app/icons/Notify'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactComponentElement, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import Search from './Search'
import ActionIcon from './ActionIcon'
import AllMenu from './AllMenu'
import Image from 'next/image'

export default function Header() {
  const pathname = usePathname()

  return (
    <div data-test_id="header" className="flex justify-center shadow px-4">
      <div className="flex-1 flex py-2">
        <FIcon />
        <Search />
      </div>
      <div className="flex space-x-2 pt-2">
        <MainLink href="/"
          active={pathname == "/"}
          icon={<HomeIcon variant={pathname == "/" ? "contained" : "outlined"} />} />
        <MainLink href="/friends"
          active={pathname == "/friends"}
          icon={<FriendsIcon variant={pathname == "/friends" ? "contained" : "outlined"} />} />
        <MainLink href="/videos"
          active={pathname == "/videos"}
          icon={<VideoIcon variant={pathname == "/videos" ? "contained" : "outlined"} />} />
        <MainLink href="/marketplace"
          active={pathname == "/marketplace"}
          icon={<MarketplaceIcon variant={pathname == "/marketplace" ? "contained" : "outlined"} />} />
        <MainLink href="/groups"
          active={pathname == "/groups"}
          icon={<GroupIcon variant={pathname == "/groups" ? "contained" : "outlined"} />} />
      </div>
      <div className="flex-1 flex items-center space-x-2.5 py-2">
        <span className="ml-auto"></span>
        <ActionIcon icon={<MenuIcon />} crossAxis={120}><AllMenu/></ActionIcon>
        <ActionIcon height={420} icon={<MessengerIcon />}>
          <div className="h-full  w-[300px] bg-red-200"></div>
        </ActionIcon>
        <ActionIcon icon={<NotifyIcon />}>
          <div className="h-full w-[200px] bg-red-200"></div>
        </ActionIcon>
        <ActionIcon height={420} crossAxis={-30} icon={<Image className="w-10 h-10 rounded-full border-2 border-[#f2f2f2]" height={40} width={40} src="/profile.jpg" alt="user photo" />}>
          <div className="h-full w-[200px] bg-red-200"></div>
        </ActionIcon>
      </div>
    </div>
  )
}



function MainLink({ active, href, icon }: { active: boolean, href: string, icon: ReactNode }) {
  return (
    <Link href={href} className={twMerge(clsx("flex justify-center items-center py-2 px-8 rounded-lg border-b-[3px] border-white transition-colors hover:bg-[#f0f2f5] fill-current", {
      "border-blue-500 rounded-none hover:bg-transparent text-blue-500": active
    }))}>
      {icon}
    </Link>
  )
}

