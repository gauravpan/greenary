import dbConnect from '../../../../backend/utils/dbConnect'
import Product from '../../../../backend/models/Product'
import Bid from '../../../../backend/models/Bid'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const bids = await Bid.find({})
        res.status(200).json({ success: true, data: bids })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const bid = await Bid.create(
          req.body
        ) /* create a new model in the database */
        console.log(bid, 'bid')
        res.status(201).json({ success: true, data: bid })
      } catch (error) {
        res.status(400).json({ message: 'Error Creating Bid ', error })
      }
      break
    case 'PUT':
      try {
        const bid = await Bid.findOne({
          productId: req.body.productId,
        }) /* create a new model in the database */
        if (!bid) {
          res.status(400).json({ error: 'Bid Not found' })
        } else {
          bid = { ...bid, ...req.body.bid }
          await bid.save()
        }
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false, error })
      break
  }
}
