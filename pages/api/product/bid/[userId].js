import dbConnect from '../../../../backend/utils/dbConnect'
import Product from '../../../../backend/models/Product'
import Bid from '../../../../backend/models/Bid'
import { ObjectID, ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      console.log(req.query, 'Query for create ')
      try {
        Bid.findOne({
          user: ObjectId(req.query.user),
          product: ObjectId(req.query.product),
        }).exec(async (error, bid) => {
          console.log(error, bid)
          if (error) return res.send({ error })
          if (bid) {
            return res
              .status(201)
              .json({ error: 'User have created bid already', bid: bid })
          }
          return res.status(200).json({ success: true, data: bid })
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        Bid.findOne(
          {
            id: req.body.id,
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
