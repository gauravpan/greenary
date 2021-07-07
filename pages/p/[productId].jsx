import {
  Box,
  Spinner,
  Heading,
  Button,
  HStack,
  Image,
  Input,
  Stack,
  Divider,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useMutation, useQuery } from 'react-query'
import { getProduct, getUserBid, getBids } from '../../src/utils/queries'

import { FormControl, FormLabel } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSession } from 'next-auth/client'

dayjs.extend(relativeTime)

export default function Overview() {
  const router = useRouter()
  const [session] = useSession()

  const { productId } = router.query
  const { data: res, isLoading } = useQuery([productId], getProduct, {
    refetchOnWindowFocus: false,
  })
  console.log(res)
  if (isLoading || !res)
    return (
      <Box mx="auto" py="12">
        <Spinner />
      </Box>
    )

  const product = res?.data?.data

  return (
    <>
      <Box d={{ base: 'block', md: 'flex' }} pt={{ base: '5', md: '12' }}>
        <Box w="full" pb="16" mr={{ base: '0', md: '10' }} px="1">
          <Image src={product?.images[0]} w={"full"} rounded="md" />
        </Box>
        <Box  w="full">
          <Box>
            <Heading pb="4" size="sm">
              {product?.name}
            </Heading>
            <Box>
              <HStack>
                <Box w="32">Base Price</Box> <Box>Rs. {product?.basePrice}</Box>
              </HStack>
              <HStack>
                <Box w="32">Quantity</Box>
                <Box>
                  {product?.quantity} {product?.unit}
                </Box>
              </HStack>
            </Box>

            <BidCard />
          </Box>
        </Box>
      </Box>
      <Box py="12">
        <Heading size="sm">About This Product</Heading>
        <Box py="4"> {product?.description}</Box>
      </Box>
      {session && <Bids session={session} />}
    </>
  )
}

function Bids({ session }) {
  const router = useRouter()

  const { productId } = router.query
  const { data: res, isLoading } = useQuery(
    [productId, session?.user?.id],
    getBids,
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  console.log(res, 'bids')

  if (isLoading || !res)
    return (
      <Box mx="auto" py="12">
        <Spinner />
      </Box>
    )

  const bids = res?.data?.data

  console.log(bids, 'Bids----------')

  return (
    <Box
      display="flex"
      flexDir="column"
      minW={600}
      maxW={600}
      mb={3}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Heading size="sm" >Top Bids this weeks</Heading>
      </Box>
      <Box display="flex" flexDirection="column">
        <Stack pt="5" spacing="2" color="gray.600">
          {bids &&
            bids.map((bid) => {
              let fromNow = dayjs(bid.createdAt).fromNow()
              return (
                <Box key={bid._id} minW={400} maxW={600} bg="white" p="4" shadow="lg" rounded="lg">
                  <HStack>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      mb={2}
                      w={'100%'}
                    >
                      <Box
                        fontWeight={600}
                        fontSize={'18px'}
                        color={'gray.800'}
                      >
                        {bid?.title || 'Bid Title'}
                      </Box>
                      {/* {`${bid.user.name} bidded Rs ${bid.amount} on ${
                        bid.product ? bid.product.name : ''
                      }`} */}
                      <Box fontWeight={600} fontSize={'24px'} color="gray.800">
                        Rs {bid.amount}
                      </Box>
                    </Box>

                    {/* <Box color="gray.500">{fromNow}</Box> */}
                  </HStack>
                  <Box mb={2}>{bid?.description}</Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      <Image
                        boxSize="8"
                        rounded="full"
                        src={
                          `${bid.user.image}` || `https://bit.ly/kent-c-dodds`
                        }
                      />
                      <Box fontWeight={600} color={'black'} ml={2}>
                        {bid?.user?.name}
                      </Box>
                    </Box>
                    <Box>{fromNow}</Box>
                  </Box>
                </Box>
              )
            })}
        </Stack>
      </Box>
    </Box>
  )
}

import { addBidMutation } from '../../src/utils/mutations'
import axios from 'axios'

function BidCard() {
  const { mutateAsync, isLoading, isError, data } = useMutation(addBidMutation)
  const toast = useToast()

  if (isError) {
    toast({
      title: 'Unable to bid.',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }

  const [session] = useSession()
  const { data: res } = useQuery(
    'user',
    () =>
      axios({
        method: 'get',
        url: `/api/users/profile/no?email=${session?.user?.email}`,
      }),
    { enabled: !!session?.user?.email, refetchOnWindowFocus: false }
  )

  const userId = res?.data?.data?._id
  const router = useRouter()
  const { productId } = router.query

  const { data: userBid, isLoading: userBidLoading } = useQuery(
    [productId, userId],
    getUserBid,
    {
      refetchOnWindowFocus: false,
    }
  )

  console.log(userBid)
  const { handleSubmit, register } = useForm()

  async function submitHandler(data) {
    console.log({ data })
    console.log({ session, userId })
    let res
    try {
      res = await mutateAsync({ ...data, product: productId, user: userId })
    } catch (error) {}
    console.log(res, 'Res request')
    if (res?.data?.error) {
      toast({
        title: res?.data?.error || 'Unable to bid.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    } else if (res?.data?.success) {
      toast({
        title: 'Product bid successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box py="6" my="3" bg="white" p="2" rounded="md" shadow="sm">
        <FormControl id="amount">
          <FormLabel>Amount</FormLabel>
          <Input
            placeholder="Rs."
            type="number"
            name="amount"
            {...register('amount', { required: true })}
          />
        </FormControl>
        <FormControl id="title">
          <FormLabel>Bid Title</FormLabel>
          <Input
            placeholder="About this bid"
            {...register('title', { required: true })}
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description..."
            {...register('description', { required: true })}
          />
        </FormControl>
        <HStack d="flex" pt="3">
          <Button
            type="submit"
            colorScheme="green"
            minW="24"
            my="2"
            isLoading={isLoading}
          >
            Bid
          </Button>
        </HStack>
      </Box>
    </form>
  )
}
