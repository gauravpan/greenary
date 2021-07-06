import {
  Box,
  Image,
  HStack,
  Flex,
  Heading,
  Stack,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

const order = {
  customerName: 'Gaurav',
  foodName: 'pizza',
  items: 10,
  time: Date.UTC(),
}
const topFood = {
  name: 'Pizza',
  sales: 90,
}
const orders = Array(10).fill(order)
const topFoods = Array(4).fill(topFood)

Overview.title = 'Home | Agro'
export default function Overview() {
  return (
    <>
      <StatGroup>
        <Stat>
          <StatLabel>Profit (this week)</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Orders (this week)</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Orders (this week)</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>

      <Flex d={{ base: 'block', md: 'flex' }} py="8">
        <Box flexGrow="1" pr={{ md: '12' }}>
          <Heading size="sm">Top Foods</Heading>

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
        </Box>
        <Box w={{ base: 'full', md: 'sm' }} pt={{ base: '8', md: '0' }}>
          <Heading size="sm">Recent Orders</Heading>
          <Stack pt="5" spacing="2" color="gray.600">
            {orders.map((item) => (
              <>
                <HStack>
                  <Image
                    boxSize="8"
                    rounded="full"
                    src="https://bit.ly/kent-c-dodds"
                  />
                  <Box flexGrow="1" ml="2">
                    {`${item.customerName}`} ordered 5 items.
                  </Box>
                  <Box color="gray.500">2h</Box>
                </HStack>
                <Divider borderColor="gray.300" />
              </>
            ))}
          </Stack>
        </Box>
      </Flex>
    </>
  )
}
