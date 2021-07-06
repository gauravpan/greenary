import React from 'react'
import { Box, Heading, Flex, Link, Text } from '@chakra-ui/react'
const Footer = () => {
  const quickLinks = [
    { title: 'Home', link: '/' },
    { title: 'Explore', link: '/explore' },
    { title: 'About', link: '/about' },
  ]
  return (
    <Box
      maxW="1600px"
      m="0 auto"
      mt="50px"
      p={['20px 30px', '30px 60px', '30px 80px']}
      bg="green.100"
    >
      <Heading as="h6" fontSize="18px">
        AGRO
      </Heading>
      <Flex dir="row" justify="space-between" mt="15px">
        <Box>
          <Heading as="h2" fontSize="16px">
            Quick Links
          </Heading>
          {quickLinks.map((el, index) => (
            <Box
              fontWeight="400"
              _hover={{ color: 'green.500' }}
              mt="8px"
              fontSize="16px"
              key={index}
            >
              <Link href={el.link}>
                <a>{el.title}</a>
              </Link>
            </Box>
          ))}
        </Box>
        <Box>
          <Heading as="h2" fontSize="16px">
            Quick Links
          </Heading>
          {quickLinks.map((el, index) => (
            <Box
              fontWeight="400"
              _hover={{ color: 'green.500' }}
              mt="8px"
              fontSize="16px"
              key={index}
            >
              <Link href={el.link}>
                <a>{el.title}</a>
              </Link>
            </Box>
          ))}
        </Box>
        <Box>
          <Heading as="h2" fontSize="16px">
            Quick Links
          </Heading>
          {quickLinks.map((el, index) => (
            <Box
              fontWeight="400"
              _hover={{ color: 'green.500' }}
              mt="8px"
              fontSize="16px"
              key={index}
            >
              <Link href={el.link}>
                <a>{el.title}</a>
              </Link>
            </Box>
          ))}
        </Box>
        <Box>
          <Heading as="h2" fontSize="16px">
            Quick Links
          </Heading>
          {quickLinks.map((el, index) => (
            <Box
              fontWeight="400"
              _hover={{ color: 'green.500' }}
              mt="8px"
              fontSize="16px"
              key={index}
            >
              <Link href={el.link}>
                <a>{el.title}</a>
              </Link>
            </Box>
          ))}
        </Box>
      </Flex>
      <Text mt="15px">
        Copyright &copy; {new Date().getFullYear()}. All rights reserved.
      </Text>
    </Box>
  )
}

export default Footer
