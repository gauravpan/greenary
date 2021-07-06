import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/client'

Login.Layout = ({ children }) => <> {children} </>
export default function Login() {
  return (
    <>
      <Box d="flex" minH="100vh">
        <Box
          d={{ base: 'none', md: 'flex' }}
          flexDir="column"
          p="6"
          h="100vh"
          w="50%"
          bg="green.500"
          color="white"
        >
          <NextLink href="/">
            {/* <Image cursor="pointer" boxSize="14" src="/betalogo.png" /> */}
            <Heading>Greenary</Heading>
          </NextLink>
          <Box
            flexGrow="1"
            d="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box maxW="sm">
              <Heading py="6">
                Nepal's 1st <br /> bidding platform <br /> made for Farmers.
              </Heading>
              <Text pb="6" color="gray.200">
                Currently, there are over 10,000 farmers listed on our platform
                from all over nepal.
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          w={{ base: '100%', md: '60%' }}
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box w={{ base: 'full', md: 'xl' }} px={{ base: '8', md: '16' }}>
            <Heading py="2" color="green.500">
              Welcome back
            </Heading>
            <Heading size="md" py="2" color="green.400">
              Sign in to contine
            </Heading>
            <Box mt="10" p="10" bg="white" rounded="md" shadow="md">
              <Button
                colorScheme="telegram"
                variant="outline"
                textAlign="center"
                w="full"
                leftIcon={<FcGoogle />}
                onClick={() => signIn('google', { callbackUrl: '/' })}
                my="3"
              >
                Continue with Google
              </Button>
              <Box py="2" textAlign="center" w="full">
                or
              </Box>
              <form>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="email" mt="2">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Heading color="green.500" size="xs" mt="6">
                  <Link>Forgot Password?</Link>
                </Heading>
                <Box
                  d="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pt="6"
                >
                  <Box>
                    New user?
                    <Heading
                      as="span"
                      ml="2"
                      color="green.500"
                      size="xs"
                      mt="6"
                    >
                      <Link>Create account</Link>
                    </Heading>
                  </Box>
                  <Button colorScheme="green" disabled>
                    Sign In
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
