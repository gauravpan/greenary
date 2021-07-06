import {
  Box,
  SimpleGrid,
  Input,
  Button,
  HStack,
  Textarea,
  Image,
  useToast,
} from '@chakra-ui/react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import ChipInput from 'material-ui-chip-input'

import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import { addProductMutation } from '../../utils/mutations'

export default function AddProductForm({ closeModal }) {
  const { register, handleSubmit } = useForm()
  const [tags, setTags] = useState([])
  const [images, setImages] = useState([])

  const { mutate, isLoading, isError, data } = useMutation(addProductMutation)
  const toast = useToast()
  console.log(data)
  if (isError) {
    toast({
      title: 'Unable to create product.',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }

  if (data?.data?.success) {
    toast({
      title: 'Product created successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })

    if (closeModal) closeModal()
  }

  const submitHandler = async (data) => {
    let allData = { ...data, tag: tags, images }
    console.log('data', allData)
    mutate(allData)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <SimpleGrid
        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gridColumnGap="4"
        gridRowGap="3"
      >
        <FormControl id="name" gridColumn="1 / 3">
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="eg. Potato"
            {...register('name', { required: true })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl id="quantity">
          <FormLabel>Quantity</FormLabel>
          <Input
            placeholder="eg. 12"
            type="number"
            {...register('quantity', { required: true })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl id="unit">
          <FormLabel>Unit</FormLabel>
          <Input
            placeholder="eg. ropani, kg,"
            {...register('unit', { required: true })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl id="basePrice">
          <FormLabel>Base Price</FormLabel>
          <Input
            placeholder="Rs."
            {...register('basePrice', { required: true })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl id="readyDate">
          <FormLabel>Product Ready Date</FormLabel>
          <Input type="date" {...register('readyDate', { required: true })} />
          <FormHelperText></FormHelperText>
        </FormControl>{' '}
        <FormControl id="expiryDate">
          <FormLabel>Valid Till</FormLabel>
          <Input type="date" {...register('expiryDate', { required: true })} />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl id="description" gridColumn="1 / 3">
          <FormLabel>Description</FormLabel>
          <Textarea
            rows="5"
            placeholder="About your product"
            {...register('description', { required: true })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl gridColumn="1 / 3">
          <FormLabel>Tags</FormLabel>
          <ChipInput defaultValue={tags} onChange={(chips) => setTags(chips)} />
          <FormHelperText>Press enter to enter multiple tags.</FormHelperText>
        </FormControl>
        <FormControl id="images" gridColumn="1 / 3">
          <FormLabel>Image</FormLabel>
          <App setImages={setImages} />
          <FormHelperText></FormHelperText>
        </FormControl>
      </SimpleGrid>
      <HStack justifyContent="flex-end" pt="6" pb="2">
        <Button
          type="submit"
          minW="32"
          colorScheme="green"
          size="md"
          disabled={!images[0]}
          isLoading={isLoading}
        >
          Create new Product
        </Button>
      </HStack>
    </form>
  )
}

const App = ({ setImages }) => {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('Select an image')

  const uploadImage = (e) => {
    let image = e.target.files[0]
    setStatus('Uploading image.')

    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'greenary')
    data.append('cloud_name', 'sexy-person')
    axios({
      url: 'https://api.cloudinary.com/v1_1/sexy-person/image/upload',
      data: data,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(data)
        setUrl(res.data.url)
        setImages([res.data.url])
        setStatus('')
      })
      .catch((err) => {
        console.log(err)
        setStatus('Upload failed.')
      })
  }

  return (
    <div>
      <Input
        type="file"
        multiple={true}
        accept=".jpg, .png"
        onChange={uploadImage}
      />

      <div>
        {!url ? (
          <h1>{status}</h1>
        ) : (
          <Image boxSize="32" objectFit="contain" src={url} />
        )}
      </div>
    </div>
  )
}
