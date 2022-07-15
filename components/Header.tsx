import React from 'react'
import { PlusSmIcon,BellIcon } from '@heroicons/react/outline'
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";


const Header = () => {
    const { data: session } = useSession();
  return (
    <header
        className="flex items-center justify-between
    px-4 py-4 shadow-md bg-[#24292F] text-white
    sticky top-0 z-50 "
      >
        <div className="flex items-center">
          <div className="mr-4">
            <a className="text-2xl font-extrabold cursor-pointer">
              Code
              <span className="text-xl font-thin p-0.5">Gist</span>
            </a>
          </div>

          <input
            type="text"
            id="voice-search"
            className="bg-[#24292F] w-52  p-1 font-thin border border-gray-700
              text-white text-sm rounded-md mr-4 focus:outline-none focus:text-white focus:bg-gray-600"
            placeholder="Search..."
            required
          ></input>
          <a className="mr-4 cursor-pointer text-sm font-medium">All gists</a>
          <a className="font-medium text-sm cursor-pointer">Back to Github</a>
        </div>
        <div className="flex items-center">
          <BellIcon className="mr-4 w-4 cursor-pointer"  />
          <PlusSmIcon className="mr-4 w-4 cursor-pointer" />
          <Image
            loading="lazy"
            src={session?.user?.image ?? "/satish.jpg"}
            onClick={() => signOut()}
            width={30}
            height={30}
            className="cursor-pointer h-12 w-12 rounded-full ml-6"
          />
        </div>
      </header>
  )
}

export default Header