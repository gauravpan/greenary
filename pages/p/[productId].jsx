import { Box, Spinner, Heading, Button, HStack, Image } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useQuery } from 'react-query'
import { getProduct } from '../../src/utils/queries'

export default function Overview() {
  const router = useRouter()
  const { data: res, isLoading } = useQuery(
    [router.query?.productId],
    getProduct,
    {
      refetchOnWindowFocus: false,
    }
  )
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
        <Box w="sm" pb="16" p="4">
          <Image src={product?.images[0]} rounded="md" />
        </Box>
        <Box>
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
                  {' '}
                  {product?.quantity} {product?.unit}
                </Box>
              </HStack>
            </Box>
            <HStack d="flex" py="6">
              {/* <Input /> */}
              <Button colorScheme="green" minW="24" my="2">
                Bid
              </Button>
            </HStack>
          </Box>
        </Box>
      </Box>
      <Box py="12">
        <Heading size="sm">Details</Heading>
        <Box> {product?.description}</Box>
      </Box>
    </>
  )
}
