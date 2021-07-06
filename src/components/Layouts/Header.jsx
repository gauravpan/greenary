import {
  Container,
  Box,
  Image,
  HStack,
  Avatar,
  Heading,
} from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'

export default function Header() {
  const [session] = useSession()
  return (
    <Box>
      <Box bg="white">
        <Container maxW="container.lg">
          <HStack py="2" justifyContent="space-between">
            {/* <Image boxSize="12" src="/logo.jpg" /> */}
            <Heading size="lg" letterSpacing="wider" color="green.500">
              Greenary
            </Heading>
            <Box ml="auto">
              <Menu placement="bottom-end">
                <MenuButton>
                  {/* <Image boxSize="8" rounded="full" bg="gray.300" />
                   */}
                  <Avatar
                    name="Dan Abrahmov"
                    boxSize="8"
                    src={session?.user?.image}
                  />
                </MenuButton>
                <MenuList shadow="lg">
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}
