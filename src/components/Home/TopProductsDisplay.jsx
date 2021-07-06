import { Box, Heading, Stack, Spinner, Text, Button } from '@chakra-ui/react'
import AddProduct from './AddProduct'
import { useRouter } from 'next/dist/client/router'
import { useQuery } from 'react-query'
import { getProducts } from '../../../src/utils/queries'
import Link from 'next/link'
import { GiGearHammer } from 'react-icons/gi'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const topFood = {
  name: 'Anjel',
  sales: 90,
}
const topFoods = Array(4).fill(topFood)

export default function TopProductsDisplay() {
  const router = useRouter()
  const { data: res, isLoading } = useQuery([], getProducts, {
    refetchOnWindowFocus: false,
  })
  console.log(res)
  if (isLoading || !res)
    return (
      <Box mx="auto" py="12">
        <Spinner />
      </Box>
    )

  console.log(res.data)

  const topProducts = res?.data?.data

  console.log(topProducts, 'TopProducts')
  return (
    <>
      <AddProduct />
      <Heading size="sm" pt="6">
        Top Products
      </Heading>
      <Stack spacing="6" pt="5" color="gray.600">
        {topProducts.map(
          ({
            name,
            description,
            basePrice,
            unit,
            quantity,
            readyDate,
            expiryDate,
            _id,
          }) => {
            readyDate = readyDate && readyDate.substring(0, 10)
            expiryDate =expiryDate && expiryDate.substring(0, 10)

            return (
              <Link key={_id} href={`/p/${_id}`}>
                <Box bg="white" p="4" shadow="lg" rounded="lg">
                  <Heading size="md" pb="3" color="black">
                    {name}
                  </Heading>

                  <Box>
                    <Box>{description}</Box>
                    <Box display={'flex'} justifyContent="space-between" my={3}>
                      <Box display={'flex'} flexDirection={'column'}>
                        <Text fontSize="14px">Ready Date</Text>
                        <Text>{readyDate}</Text>
                      </Box>
                      <Box display={'flex'} flexDirection={'column'}>
                        <Text fontSize="14px">Expiry Date</Text>
                        <Text>{expiryDate}</Text>
                      </Box>
                    </Box>

                    <Box display={'flex'} justifyContent="space-between">
                      <Box fontWeight={600} fontSize={'18px'}>
                        {basePrice} {unit}
                      </Box>
                      <Box fontWeight={600} fontSize={'18px'}>
                        Rs {quantity}
                      </Box>
                    </Box>

                    <Box
                      display={'flex'}
                      alignItems="center"
                      justifyContent="space-between"
                      pt={2}
                    >
                      <Button
                        isLoading={false}
                        w="100%"
                        leftIcon={<AiOutlineHeart color="green" />}
                        variant="outline"
                        colorScheme="green"
                        mr={1}
                      >
                        WhishList 
                      </Button>
                      <Button
                        isLoading={false}
                        w="100%"
                        leftIcon={<GiGearHammer />}
                        variant="outline"
                        colorScheme="green"
                        ml={1}
                      >
                        BID ME
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Link>
            )
          }
        )}
      </Stack>
    </>
  )
}
