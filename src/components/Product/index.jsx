import React from 'react'
import {
  Box,
  Heading,
  Image,
  Flex,
  Badge,
  Avatar,
  Text,
  Button,
} from '@chakra-ui/react'
import { GiGearHammer } from 'react-icons/gi'
import Link from 'next/link'
const Product = () => {
  return (
    <Box borderRadius="10px" flexGrow="1">
      <Box
        height={['120px', '140px', '160px', '180px', '200px']}
        overflow="hidden"
        borderRadius="10px"
      >
        <Image
          verticalAlign="middle"
          objectFit="cover"
          h="100%"
          w="100%"
          src="https://www.asiafarming.com/wp-content/uploads/2016/02/Potato-Cultivation.jpg"
          alt="Product"
          transition="transform .2s linear"
          _hover={{
            filter: 'blur(0.5px) brightness(0.85)',
            transform: 'scale(1.03)',
          }}
        />
      </Box>
      <Box>
        <Link href="/product/adsfas">
          <a>
            <Heading
              title="No. 1 Potato 2500 (Local) KG"
              fontSize={['16px', '18px', '22px']}
              p="15px 0"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              transition="color .1s linear"
              _hover={{ color: 'green.500' }}
              as="h2"
            >
              No. 1 Potato 2500 (Local) KG
            </Heading>
          </a>
        </Link>
      </Box>
      <Flex mb="3">
        <Avatar src="https://bit.ly/niraj-pradhan" />
        <Box ml="3">
          <Text fontWeight="bold">
            John Doe
            <Badge ml="3" colorScheme="green">
              2h ago
            </Badge>
          </Text>
          <Text fontSize="sm">Rupandehi, Ward-25</Text>
        </Box>
      </Flex>
      <Button
        isLoading={false}
        w="100%"
        leftIcon={<GiGearHammer />}
        variant="outline"
        colorScheme="green"
      >
        BID ME
      </Button>
    </Box>
  )
}

export default Product
