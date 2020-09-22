import React, { ReactNode } from 'react'
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'
import styled from '@emotion/styled';
import Link from 'next/link';

import useMounted from '@src/hooks/useMounted';
import Container from '@src/components/Container.styled';
import BOOKMARKLET from '@src/constants/bookmarklet';

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VerticalCenter = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.header`
  padding: 1em;
  border-bottom: 1px solid black;
`;

const SlimH1 = styled.h1`
  margin: 0;
  margin-right: 1em;
  cursor: pointer;
`;


type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [ session, loading ] = useSession()
  const mounted = useMounted();

  if (!mounted || loading) return null;

  if (!session) signIn();

  function createBookmarklet() {
    return {__html: BOOKMARKLET}
  }

  return (
    <div>
      <Head>
        <title>{title} - SaveYourLink</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header>
        <SpaceBetween>
          <VerticalCenter>
            <Link href="/"><SlimH1>SaveYourLink</SlimH1></Link>
            <div dangerouslySetInnerHTML={createBookmarklet()}></div>
          </VerticalCenter>
          {session && (
            <VerticalCenter>
              <span>{session.user.email}&nbsp;</span>
              <a href="/api/auth/signout" onClick={(e) => {
                e.preventDefault()
                signOut()
              }}>로그아웃</a>
            </VerticalCenter>
          )}
        </SpaceBetween>
      </Header>
      <Container>
        <h1>{title}</h1>
        {children}
      </Container>
      <footer>
        <hr />
        <a href="https://github.com/sorrykim/syp">소스코드 (깃허브)</a>
      </footer>
    </div>
  )
}

export default Layout
