const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    emailAddress: {
      type: String,
      required: [true, 'Please add a valid email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    firstName: {
      type: String,
      required: [true, 'Please add your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add your last name'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [8, 'Password must be between 8 and 12 characters'],
      maxlength: [12, 'Password must be between 8 and 12 characters'],
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual('scores', {
  ref: 'Score',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

// Encrypt passwords
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('User', UserSchema);
