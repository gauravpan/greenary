import {
  Spacer,
  HStack,
  Heading,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

export default function AddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <HStack bg="white" p="4" shadow="lg" rounded="lg">
      <Heading size="md" pb="3" color="black">
        Add Product
      </Heading>
      <Spacer />
      <Button variant="outline" colorScheme="green" onClick={onOpen}>
        Add New{' '}
      </Button>
      <AddProductModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  )
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import AddProductForm from '../Forms/AddProduct'

function AddProductModal({ isOpen, onClose }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddProductForm closeModal={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
