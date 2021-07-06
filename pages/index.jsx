import { Box, Flex } from '@chakra-ui/react'
import Notofications from '../src/components/Home/Notifications'
import Stats from '../src/components/Home/Stats'
import TopProductsDisplay from '../src/components/Home/TopProductsDisplay'

Overview.title = 'Home | Agro'
export default function Overview() {
  return (
    <>
      <Stats />

      <Flex d={{ base: 'block', md: 'flex' }} py="8">
        <Box flexGrow="1" pr={{ md: '12' }}>
          <TopProductsDisplay />
        </Box>

        <Box w={{ base: 'full', md: 'sm' }} pt={{ base: '8', md: '0' }}>
          <Notofications />
        </Box>
      </Flex>
    </>
  )
}
