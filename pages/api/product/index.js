import Product from '../../../backend/models/Product'
import dbConnect from '../../../backend/utils/dbConnect'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let { limit, skip } = req.query
        Product.find({})
          .sort({ createdAt: -1 })
          .skip(parseInt(skip) || 0)
          .limit(parseInt(limit) || 10)
          .exec((error, products) => {
            if (error) return res.send({ error })
            res.status(200).json({ success: true, data: products })
          }) /* find all the data in our database */
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        let newProduct = new Product(req.body)
        newProduct.save((error, bid) => {
          if (error) return res.send({ error })
          return res
            .status(201)
            .json({ success: true, data: newProduct, message: 'product created' })
        })
      } catch (error) {
        res.status(400).json({ message: 'Error creating product', error })
      }
      break
    default:
      res.status(400).json({ success: false, error })
      break
  }
}
