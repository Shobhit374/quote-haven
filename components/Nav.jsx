'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
import { ConnectionStates } from 'mongoose'

const Nav = () => {
  const {data : session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false)

  useEffect(() =>{
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href = "/" className="flex gap-2 flex-center">
        {/*Logo Image*/}
        <Image src = "/assets/images/logoimg.svg" alt="QuoteHaven Logo"
        width={30}
        height={30}
         />
         {/*Logo description*/}
         <p className="logo_text">
          QuoteHaven
         </p>
      </Link>
      {/*Desktop Navigation*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className='flex fap-3 md:gap-5'>
            <Link href="/create-quote" className="black_btn">
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='Profile' />
            </Link>
          </div>
        ): (
          <>
          {providers && Object.values(providers).map((provider) => (
            <button type='button' key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'
             >
              Sign In
            </button>
          ))}
          </>
        )}
        {/*Providers needed for sign in*/}
      </div>

      {/* Mobile Navigation */ }
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='Profile'
              onClick={() =>settoggleDropdown((prev)=>!prev)} 
              />
              {toggleDropdown && (
                <div className='dropdown'>
                  <Link
                    href = "/profile"
                    className='dropdown_link'
                    onClick={() => settoggleDropdown(false)}
                    >
                     My Profile 
                  </Link>
                  <Link
                    href = "/create-quote"
                    className='dropdown_link'
                    onClick={() => settoggleDropdown(false)}
                    >
                     Create Quote
                  </Link>
                  <button
                    type = 'button'
                    onClick={()=> {
                      settoggleDropdown(false);
                      signOut;
                    }}
                    className='mt-5 w-ful black_btn'>
                      Sign Out
                  </button>
                </div>
              )}
          </div>
        ) : (
          <>
          {providers && Object.values(providers).map((provider) => (
            <button type='button' key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'
             >
              Sign In
            </button>
          ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
