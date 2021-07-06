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
          .sort({ amount: 1 })
          .exec((error, bids) => {
            if (error) return res.send({ error })
            res.status(200).json({ success: true, data: bids })
          })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        Bid.create(req.body, (error, bid) => {
          if (error) return res.send({ error })
          res.status(201).json({ success: true, data: bid })
        })
      } catch (error) {
        res.status(400).json({ message: 'Error Creating Bid ', error })
      }
      break
    case 'PUT':
      try {
        Bid.findOne(
          {
            productId: req.body.productId,
          },
          async (error, bid) => {
            if (error) return res.send({ error })
            if (!bid) {
              res.status(400).json({ error: 'Bid Not found' })
            } else {
              bid = { ...bid, ...req.body.bid }
              await bid.save()
            }
          }
        ) /* create a new model in the database */
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false, error })
      break
  }
}
