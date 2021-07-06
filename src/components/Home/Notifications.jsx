import {
  Box,
  Heading,
  Stack,
  HStack,
  Spinner,
  Image,
  Divider,
} from '@chakra-ui/react'
import { getTopBids } from '../../utils/queries'
import { useRouter } from 'next/dist/client/router'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const order = {
  customerName: 'Gaurav',
  foodName: 'pizza',
  items: 10,
  time: Date.UTC(),
}

const orders = Array(10).fill(order)

export default function Notofications() {
  const router = useRouter()
  const { data: res, isLoading } = useQuery([], getTopBids, {
    refetchOnWindowFocus: false,
  })

  if (isLoading || !res)
    return (
      <Box mx="auto" py="12">
        <Spinner />
      </Box>
    )

  const topBids = res?.data?.data

  return (
    <>
      <Heading size="sm">Top Bids this weeks</Heading>
      <Stack pt="5" spacing="2" color="gray.600">
        {topBids.map((bid) => {
          let fromNow = dayjs(bid.createdAt).fromNow()
          return (
            <Box key={bid._id}>
              <HStack>
                <Image
                  boxSize="8"
                  rounded="full"
                  src="https://bit.ly/kent-c-dodds"
                />
                <Box flexGrow="1" ml="2">
                  {`${'Random User'} bidded Rs ${bid.amount} on ${
                    bid.product ? bid.product.name : ''
                  }`}
                </Box>
                <Box color="gray.500">{fromNow}</Box>
              </HStack>
              <Divider borderColor="gray.300" />
            </Box>
          )
        })}
      </Stack>
    </>
  )
}
