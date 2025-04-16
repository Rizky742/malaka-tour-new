'use client'

import { signOut } from "next-auth/react"
// import { Button } from "./ui/button"

export default function SignOutButton() {
  return (
    <button
      className='px-4 py-2 bg-[#44A6D0] text-white cursor-pointer rounded-md text-sm md:text-base'
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Sign Out
    </button>
  // <Button className="cursor-pointer bg-[#44A6D0] hover:bg-[#448cd0]" onClick={() => signOut({callbackUrl: '/login'})}>
  //   Sign Out
  // </Button>
  )
}
