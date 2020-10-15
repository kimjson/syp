import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import '@src/stylesheets/index.css';

export default function App ({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (process.browser && process.env.ON_MAINTENANCE && !router.pathname.startsWith('/maintenance')) {
    router.replace('/maintenance');
    return null;
  }
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
