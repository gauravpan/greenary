import { Container, Box } from '@chakra-ui/react'
import { useRef } from 'react'

import Header from './Header'
import NavBar from './NavBar'

export default function Layout({ children }) {
  const navRef = useRef(null)

  return (
    <Box>
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
      <Container maxW="container.lg" py="8">
        {children}
      </Container>
    </Box>
  )
}
