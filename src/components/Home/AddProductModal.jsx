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
import useProductModal from '../../store/add-product-modal-store'

export default function AddProductModal() {
  const { isModalOpen, setModalClose } = useProductModal()
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={setModalClose}
        size="xl"
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddProductForm closeModal={setModalClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
