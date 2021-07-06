import Head from 'next/head'
import { Provider } from 'next-auth/client'
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import MainLayout from '../src/components/Layouts/Main.Layout'
import { QueryClientProvider, QueryClient } from 'react-query'

const theme = extendTheme(withDefaultColorScheme('green'), {
  styles: { global: { body: { bg: 'gray.50' } } },
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const title = Component.title || 'Green Market'
  const Layout = Component.Layout || MainLayout

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
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
