import { Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
const HeroSection = () => {
  return (
    <Box
      bgImg="linear-gradient(79.37deg, var(--chakra-colors-green-500) 15.55%, var(--chakra-colors-green-500)),url('https://images.unsplash.com/photo-1555421689-d68471e189f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGVjb21tZXJjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
      bgRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      h="fit-content"
      transition="linear"
      transitionDuration="200ms"
      px={['30px', '50px', '80px']}
      py="50px"
    >
      <Heading
        as="h1"
        color="white"
        fontWeight="600"
        letterSpacing="1px"
        textAlign="center"
        mt="40px"
        fontSize={['25px', '30px', '45px']}
      >
        Welcome to first bidding platform in agriculture of Nepal.
      </Heading>
      <Box maxW="container.sm" m="20px auto 0 auto">
        <Text
          color="whiteAlpha.800"
          fontSize="18px"
          fontWeight="400"
          textAlign="center"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
          perferendis, dolorem esse quibusdam cum praesentium ullam. Expedita
          fugiat temporibus suscipit sunt asperiores explicabo nobis ad!
        </Text>
      </Box>
      <Box m="40px 0">
        <Stack spacing="15px">
          <Text
            textAlign="center"
            color="whiteAlpha.800"
            fontSize="14px"
            letterSpacing="0.5px"
          >
            Let&#39;s get started.
          </Text>
          <HStack justify="center" spacing="40px">
            <Button
              padding="9px 35px"
              color="primary"
              _hover={{ color: 'green.500' }}
              fontWeight="500"
              textTransform="uppercase"
            >
              Get Started
            </Button>
            <Button
              padding="9px 35px"
              _hover={{ bg: 'white', color: 'green.500' }}
              transition="0.2s linear"
              bg="transparent"
              border="1px solid #ffffff"
              color="white"
              fontWeight="500"
              textTransform="uppercase"
            >
              Become an investor
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Box>
  )
}

export default HeroSection
