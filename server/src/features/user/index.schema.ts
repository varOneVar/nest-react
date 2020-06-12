import { Schema } from 'mongoose'

export const UserSchema = new Schema({
  username: { type: String, trim: true },
  pwd: { type: String, minlength: 6, },
  avator: { type: String, trim: true },
  age: Number,
  idCard: { type: String, trim: true },
  createTime: { type: Date, default: Date.now }
})