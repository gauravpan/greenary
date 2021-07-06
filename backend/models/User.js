import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: { type: String },
    email_verified: { type: Boolean },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
