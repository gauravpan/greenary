import { Box, Heading, Stack } from '@chakra-ui/react'
import AddProduct from './AddProduct'

const topFood = {
  name: 'Anjel',
  sales: 90,
}
const topFoods = Array(4).fill(topFood)

export default function TopProductsDisplay() {
  return (
    <>
      <AddProduct />
      <Heading size="sm" pt="6">
        Top Handsome people
      </Heading>
      <Stack spacing="6" pt="5" color="gray.600">
        {topFoods.map(({ name, sales }) => (
          <Box bg="white" p="4" shadow="lg" rounded="lg">
            <Heading size="md" pb="3" color="black">
              {name}
            </Heading>
            <Box>
              <Box>{sales} sales today</Box>
              <Box>{sales} sales this week</Box>
              <Box>{sales} sales this month</Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </>
  )
}
