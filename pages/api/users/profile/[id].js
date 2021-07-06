import dbConnect from '../../../../backend/utils/dbConnect'
import User from '../../../../backend/models/User'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req
  const { email } = req.query

  await dbConnect()
  switch (method) {
    case 'GET':
      try {
        let user
        if (email) user = await User.findOne({ email })
        else
          user = await User.findById(id) /* find all the data in our database */
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User doesn't exist" })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
  }
}
