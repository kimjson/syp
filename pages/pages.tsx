import { signIn, signOut, useSession } from 'next-auth/client'
import useSWR from 'swr';

import Layout from '../components/Layout'

const PagesPage = () => {
  const [ session, loading ] = useSession()
  const {data, error} = useSWR('')
  return(
    <Layout title="Pages">
      <h1>페이지 리스트 - Save Your Page</h1>
      {session && (
        <p>
          <span>{session.user.email}&nbsp;</span>
          <a href="/api/auth/signout" onClick={(e) => {
            e.preventDefault()
            signOut()
          }}>로그아웃</a>
        </p>
      )}
      {!loading && !session && (
        <p>
          <a href="/api/auth/signin" onClick={(e) => {
            e.preventDefault()
            signIn()
          }}>로그인</a>
        </p>
      )}
    </Layout>
  )
}

export default PagesPage
