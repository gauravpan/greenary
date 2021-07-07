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
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useMutation, useQuery } from 'react-query'
import {
  getProduct,
  getUserBid,
  getBids,
  getProductBids,
} from '../../src/utils/queries'
import { useState, useEffect } from 'react'

import { FormControl, FormLabel } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSession } from 'next-auth/client'

dayjs.extend(relativeTime)

export default function Overview() {
  const router = useRouter()
  const [session] = useSession()
  const [data, setData] = useState(1)

  const { productId } = router.query
  const { data: res, isLoading } = useQuery([productId], getProduct, {
    refetchOnWindowFocus: false,
  })
  console.log(res, session, 'Sessions')
  if (isLoading || !res)
    return (
      <Box mx="auto" py="12">
        <Spinner />
      </Box>
    )

  const product = res?.data?.data
  let readyDate, expiryDate
  if (product) {
    readyDate = product?.readyDate && product?.readyDate.substring(0, 10)
    expiryDate = product?.expiryDate && product?.expiryDate.substring(0, 10)
  }

  return (
    <>
      <Box
        bg="white"
        p="4"
        shadow="lg"
        rounded="lg"
        d={{ base: 'block', md: 'flex' }}
        pt={{ base: '1', md: '5' }}
        pb={0}
        mb={{ base: '4', md: '10' }}
      >
        <Box w="full" pb="7" mr={{ base: '0', md: '50' }} px="1">
          <Image src={product?.images[0]} w={'full'} rounded="md" />
        </Box>
        <Box w="full">
          <Box>
            <Heading pb="3" fontSize="28px" size="sm">
              {product?.name}
            </Heading>
            <Box pt="3" pb="2">
              {' '}
              {product?.description}
            </Box>

            <Box>
              <HStack py={1}>
                <Box w="32" fontWeight="600">
                  Quantity
                </Box>
                <Box fontWeight="600" fontSize="18px" color="gray.800">
                  {product?.quantity} {product?.unit}
                </Box>
              </HStack>
              <HStack py={1}>
                <Box w="32" fontWeight="600">
                  Ready Date
                </Box>
                <Box fontWeight="600" color="gray.800">
                  Rs. {readyDate}
                </Box>
              </HStack>
              <HStack py={1}>
                <Box w="32" fontWeight="600">
                  Expiry Date
                </Box>
                <Box fontWeight="600" color="gray.800">
                  {expiryDate}
                </Box>
              </HStack>
              <HStack py={1}>
                <Box w="32" fontWeight="600">
                  Base Price
                </Box>
                <Box fontWeight="600" fontSize="22px" color="gray.800">
                  {product?.basePrice}
                </Box>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        gridGap="10"
        pt={4}
      >
        <Box flex={1}>
          <Bids data={data} />
        </Box>
        <Box flex={1} pb={5}>
          <BidCard setData={setData} />
        </Box>
      </Box>
    </>
  )
}

function Bids({ data }) {
  const router = useRouter()

  const { productId } = router.query
  const { data: res, isLoading } = useQuery([productId, data], getProductBids, {
    refetchOnWindowFocus: false,
  })

  console.log(res?.data, 'Product bids from component')

  if (isLoading || !res)
    return (
      <Box mx="auto" py="12">
        <Spinner />
      </Box>
    )

  const bids = res?.data?.data

  console.log(res?.data, 'ProductBids from component')

  return (
    <Box display="flex" flexDir="column" maxW={600} mb={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Heading size="md">Bids</Heading>
      </Box>
      <Box display="flex" flexDirection="column">
        <Stack pt="5" spacing="2" color="gray.600">
          {bids &&
            Array.isArray(bids) &&
            bids.map((bid) => {
              let fromNow = dayjs(bid.createdAt).fromNow()
              return (
                <Box
                  key={bid._id}
                  bg="white"
                  p="4"
                  shadow="lg"
                  rounded="lg"
                >
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

function BidCard({ setData }) {
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

  console.log(userId, Boolean(userId), 'UserId')

  const { data: userBid, isLoading: userBidLoading } = useQuery(
    [productId, userId],
    getUserBid,
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(userId),
    }
  )

  console.log(userBid, 'User Biddddd')
  let uBidError = userBid?.data?.error
  let uBid = userBid?.data?.bid
  console.log(uBid, uBidError, 'uBid', 'UBiderror')
  const { handleSubmit, register, reset } = useForm(uBid)

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
      setData((d) => d + 1)
      toast({
        title: 'Product bid successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  useEffect(() => {
    reset(uBid)
  }, [uBid])

  return (
    <Box>
      <Text color="gray.800" fontSize="20px" fontWeight="600">
        {uBid ? 'Update' : 'Add'} Bids
      </Text>

      {uBid && <Text color="gray.700">User have already added bid</Text>}

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
              {uBid ? 'Update Bid' : 'Bid'}
            </Button>
          </HStack>
        </Box>
      </form>
    </Box>
  )
}
