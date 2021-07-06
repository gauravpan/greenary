import { Spacer, HStack, Heading, Button } from '@chakra-ui/react'

import useProductModal from '../../store/add-product-modal-store'

export default function AddProduct() {
  const { setModalOpen } = useProductModal()

  return (
    <HStack bg="white" p="4" shadow="sm" rounded="lg">
      <Heading size="md" pb="3" color="black">
        Add Product
      </Heading>
      <Spacer />
      <Button variant="outline" colorScheme="green" onClick={setModalOpen}>
        Add New
      </Button>
    </HStack>
  )
}
