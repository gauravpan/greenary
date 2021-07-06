import { Box, Heading, Stack, HStack, Image, Divider } from '@chakra-ui/react'

const order = {
  customerName: 'Gaurav',
  foodName: 'pizza',
  items: 10,
  time: Date.UTC(),
}

const orders = Array(10).fill(order)

export default function Notofications() {
  return (
    <>
      <Heading size="sm">Notifications</Heading>
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
    </>
  )
}
