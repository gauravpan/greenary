import dbConnect from '../../../../backend/utils/dbConnect'
import Product from '../../../../backend/models/Product'
import Bid from '../../../../backend/models/Bid'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        Bid.find({})
          .populate('user')
          .populate('product')
          .sort({ amount: 1 })
          .exec((error, bids) => {
            if (error) return res.send({ error })
            res.status(200).json({ success: true, data: bids })
          })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false, error })
      break
  }
}
