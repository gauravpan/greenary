import { Container, Box } from '@chakra-ui/react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import Header from './Header'
import NavBar from './NavBar'
import AddProductModal from '../Home/AddProductModal'

export default function Layout({ children }) {
  const navRef = useRef(null)
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (loading) return null
    if (!session) {
      router.push('/login')
    }
  }, [session, loading])

  if (loading || !session) return null

  return (
    <Box>
      <AddProductModal />
      <style jsx global>
        {`
          html {
            background: var(--chakra-colors-gray-100);
          }
        `}
      </style>
      <Header />
      <Box ref={navRef} />
      <NavBar navRef={navRef} />
      <Container maxW="container.lg" pt="8">
        {children}
      </Container>
    </Box>
  )
}
