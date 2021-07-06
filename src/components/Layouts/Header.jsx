import {
  Container,
  Box,
  Image,
  HStack,
  Avatar,
  Heading,
  Button,
  Spacer,
} from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/client'
import useProductModal from '../../store/add-product-modal-store'

export default function Header() {
  const [session] = useSession()
  const { setModalOpen } = useProductModal()

  return (
    <Box>
      <Box bg="white">
        <Container maxW="container.lg">
          <HStack py="2" justifyContent="space-between">
            {/* <Image boxSize="12" src="/logo.jpg" /> */}
            <Heading size="lg" letterSpacing="wider" color="green.500">
              Greenary
            </Heading>
            <Spacer />
            <Button
              colorScheme="green"
              variant="outline"
              size="sm"
              onClick={setModalOpen}
            >
              Add Product
            </Button>
            <Box ml="2">
              <Menu placement="bottom-end">
                <MenuButton>
                  {/* <Image boxSize="8" rounded="full" bg="gray.300" />
                   */}
                  <Avatar
                    name={session?.user?.name}
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
                  <MenuGroup>
                    <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
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
