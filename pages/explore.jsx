import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
const Explore = () => {
  return (
    <Box>
      <Heading fontWeight="500" fontSize="25px" as="h2">
        Browse products by your nearby farmers
      </Heading>
      <Box d="flex" gridGap={['20', '25', '35']} my="30">
        <Box borderRadius="10px">
          <Image src="" />
        </Box>
      </Box>
    </Box>
  )
}

export default Explore
