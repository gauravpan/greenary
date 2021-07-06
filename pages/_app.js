import Head from 'next/head'
import { Provider, useSession } from 'next-auth/client'
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import MainLayout from '../src/components/Layouts/Main.Layout'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const theme = extendTheme(withDefaultColorScheme('green'), {
  styles: { global: { body: { bg: 'gray.50' } } },
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const title = Component.title || 'Green Market'
  const Layout = Component.Layout || MainLayout

  const protectedRoute = Component.protectedRoute || 'YES'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Agro App" />
      </Head>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider session={pageProps.session}>
            <Layout>
              <ReactQueryDevtools />
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
