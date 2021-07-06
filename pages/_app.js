import Head from 'next/head'
import { Provider } from 'next-auth/client'
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import MainLayout from '../src/components/Layouts/Main.Layout'

const theme = extendTheme(withDefaultColorScheme('green'), {
  styles: { global: { body: { bg: 'gray.50' } } },
})

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
        <Provider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
