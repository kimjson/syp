import React, { ReactNode } from 'react'
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'

import useMounted from '@/hooks/useMounted';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [ session, loading ] = useSession()
  const mounted = useMounted();

  if (!mounted || loading) return null;

  if (!session) signIn();

  return (
    <div>
      <Head>
        <title>{title} - Save Your Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
      {session && (
        <div>
          <span>{session.user.email}&nbsp;</span>
          <a href="/api/auth/signout" onClick={(e) => {
            e.preventDefault()
            signOut()
          }}>로그아웃</a>
        </div>
      )}
      </header>
      <h1>{title}</h1>
      {children}
      <footer>
        <hr />
        <a href="https://github.com/sorrykim/syp">소스코드 (깃허브)</a>
      </footer>
    </div>
  )
}

export default Layout
