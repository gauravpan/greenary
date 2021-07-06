import React from 'react'
import { Box, Heading, Button, HStack } from '@chakra-ui/react'
const HireSection = () => {
  return (
    <Box maxW="1600px" m="0 auto" mt="50px" p={['0 30px', '0 60px', '0 80px']}>
      <Heading as="h4" fontWeight="500" color="green.500">
        Want to hire farmers for your land ?
      </Heading>
      <HStack my="20px" spacing="20px">
        <Button bg="green.100" textColor="green.900" p="12px 30px">
          Hire
        </Button>
        <Button bg="transparent" color="green.600" p="12px 30px">
          Support Farmers
        </Button>
      </HStack>
    </Box>
  )
}

export default HireSection
