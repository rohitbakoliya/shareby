import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { languages } from '../utils';

// eslint-disable-next-line no-unused-vars
const UserAccessSchema = new mongoose.Schema(
  {
    _userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    access: {
      type: String,
      enum: ['edit', 'view'],
      required: true,
    },
  },
  { _id: false }
);

const PasteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 50,
      trim: true,
      default: 'Untitled',
    },
    body: {
      type: String,
      minLength: 4,
      maxLength: 6000,
      trim: true,
      required: true,
    },
    language: {
      type: String,
      enum: languages,
      required: true,
    },
    url: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true, // TODO: go thr again this
      trim: true,
      required: true,
    },
    access: {
      type: String,
      enum: ['public', 'protected', 'private'],
      default: 'public',
    },
    password: {
      type: String,
      minLength: 4,
      maxLength: 100, // since hased password can be longer than our 20 length limit
    },
    expireAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

PasteSchema.pre('save', function (next) {
  if (!this.access !== 'protected') next();
  // to only hash password when new paste is being created
  if (this.isModified('password') || this.isNew) {
    try {
      // Hash Password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

PasteSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret.password;
    delete ret.__v;
  },
});

// to validate password - in case of protected paste
PasteSchema.methods.isValidPassword = async function (password) {
  try {
    // Check/Compares password
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// https://docs.mongodb.com/manual/tutorial/expire-data/#expire-documents-at-a-specific-clock-time
PasteSchema.index(
  { expireAt: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { expireAt: { $exists: true } } }
);

const Paste = mongoose.model('Paste', PasteSchema);
export default Paste;
