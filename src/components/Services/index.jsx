import React from 'react'
import { Box, Heading, Text, Image, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
const Services = () => {
  const services = [
    {
      title: 'As a farmer, Sell your product.',
      descripton: 'You can buy directly sell your products',
      image:
        'https://5.imimg.com/data5/RF/JR/GLADMIN-34696552/plants-agriculture-500x500.jpg',
    },
    {
      title: 'Buy direct from the farmers',
      descripton:
        'You can buy directly from farmers through contacting with them.',
      image:
        'https://5.imimg.com/data5/RF/JR/GLADMIN-34696552/plants-agriculture-500x500.jpg',
    },
  ]
  return (
    <Box
      maxW="1600px"
      m="0 auto"
      p={['0 30px', '0 60px', '0 80px']}
      mt="50px"
      d="flex"
      flexDir="column"
      gridGap="120px"
    >
      {services.map((service, index) => (
        <Box
          key={index}
          d="flex"
          flexDirection={[
            'column',
            ,
            'column',
            index % 2 === 0 ? 'row-reverse' : 'row',
          ]}
          gridGap="30px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box overflow="hidden" borderRadius="10px">
            <Image objectFit="cover" src={service.image} />
          </Box>
          <Box>
            <Heading as="h3">{service.title}</Heading>
            <Text mt="10px" mb="20px">
              {service.descripton}
            </Text>
            <Link color="green.500" href="/about" isExternal>
              View More <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Services
