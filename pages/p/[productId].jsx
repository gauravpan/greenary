import {
  Box,
  Spinner,
  Heading,
  Button,
  HStack,
  Image,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useMutation, useQuery } from 'react-query'
import { getProduct, getUserBid } from '../../src/utils/queries'

import { FormControl, FormLabel } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export default function Overview() {
  const router = useRouter()
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
        <Box w="sm" pb="16" px="4">
          <Image src={product?.images[0]} rounded="md" />
        </Box>
        <Box ml={{ base: '0', md: '24' }} w="sm">
          <Box>
            <Heading pb="4" size="sm">
              {product?.name}
            </Heading>
            <Box>
              <HStack>
                <Box w="32">Base Price</Box> <Box>Rs. {product?.basePrice}</Box>
              </HStack>
              <HStack>
                <Box w="32">Quantity</Box>{' '}
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
    </>
  )
}

import { addBidMutation } from '../../src/utils/mutations'
import { useSession } from 'next-auth/client'
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

  const { data: userBid, isLoading: userBidLoading } = useQuery([productId, userId], getUserBid , {
    refetchOnWindowFocus: false,
  })

  console.log(userBid);
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
