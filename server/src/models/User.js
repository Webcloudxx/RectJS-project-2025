import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 3
  }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);