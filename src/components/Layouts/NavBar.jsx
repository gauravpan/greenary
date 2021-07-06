import { Container, Box, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const List = [
  { name: 'Home', href: '/' },
  { name: 'Market', href: '/market' },
  { name: 'Explore', href: '/explore' },
  { name: 'Settings', href: '/settings' },
]

export default function NavBar({ navRef }) {
  const router = useRouter()
  const active = router.asPath
  const [sticky, setSticky] = useState(false)

  function makeNavSticky() {
    var sticky = navRef.current?.offsetTop
    if (window?.pageYOffset >= sticky) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', makeNavSticky)
    return () => window.removeEventListener('scroll', makeNavSticky)
  }, [])

  function NavItems() {
    return (
      <Container maxW="container.lg">
        <HStack as="nav" spacing="6" bg="white">
          {List.map(({ name, href }) => (
            <Link href={href} passHref>
              <Box
                as="a"
                color={active == href ? 'gray.900' : 'gray.600'}
                cursor="pointer"
                fontWeight="semibold"
                py="2"
                borderColor="black"
                borderBottomWidth={active == href ? '2px' : '0'}
                _hover={{ color: 'gray.900' }}
                bg="white"
              >
                {name}
              </Box>
            </Link>
          ))}
        </HStack>
      </Container>
    )
  }

  return (
    <>
      <Box w="full" bg="white" borderBottomWidth="1px" borderColor="gray.100">
        <NavItems />
      </Box>
      <Box
        pos={sticky && 'fixed'}
        d={sticky ? 'block' : 'none'}
        top="0"
        zIndex="1212"
        w="full"
        bg="white"
        borderBottomWidth="1px"
        borderColor="gray.100"
      >
        <NavItems />
      </Box>
    </>
  )
}