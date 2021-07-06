import Product from '../../../backend/models/Product'
import dbConnect from '../../../backend/utils/dbConnect'

export default async function handler(req, res) {
  const { method } = req
  const { productId } = req.query

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const products = await Product.findById(
          productId
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        res.status(400).json({ success: 'false', error: error.message })
      }
      break
    case 'POST':
      try {
        const product = await Product.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ message: 'Error creating product', error })
      }
      break
    default:
      res.status(400).json({ success: false, error })
      break
  }
}
