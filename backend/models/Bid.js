import mongoose from 'mongoose'

/* BidSchema will correspond to a collection in your MongoDB database. */
const BidSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this bid.'],
      maxlength: [100, 'Name cannot be more than 10 characters'],
    },
    description: {
      type: String,
      required: false,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    amount: {
      type: Number,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

export default mongoose.models.Bid || mongoose.model('Bid', BidSchema)
