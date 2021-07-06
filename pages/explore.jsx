import React from 'react'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import Product from '../src/components/Product'
const Explore = () => {
  return (
    <Box>
      <Heading fontWeight="500" fontSize="25px" as="h2">
        Browse products by your nearby farmers
      </Heading>
      <Heading
        color="green.400"
        fontWeight="500"
        mt="15px"
        fontSize={['16px', '18px']}
        as="h3"
      >
        Most Recent
      </Heading>
      <SimpleGrid
        spacing={['15px', '25px', '35px']}
        columns={[1, 2, 3]}
        my="30px"
      >
        {[1, 2, 3, 4, 5].map((el) => (
          <Product key={el} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Explore
