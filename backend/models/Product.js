import mongoose from 'mongoose'

/* ProductSchema will correspond to a collection in your MongoDB database. */
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      maxlength: [30, 'Name cannot be more than 30 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide the product description'],
      maxlength: [100, "Description cannot be more than 60 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readyDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    basePrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
    },
    images: {
      type: [String],
    },
    tag: {
      type: [String],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
