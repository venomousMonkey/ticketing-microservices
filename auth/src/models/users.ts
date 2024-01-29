import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties that are required to create a new User

interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      //not best approach, typically this should be responsibility of some view controller - transforming the response format
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// This is middleware for mongo to catch password in flight and hash if there was any change - creation is considered a change
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// Defined build functio just to allow typescript for typechecking on properties used for new record, otherwise when creating record
// directly using this user model there was no type checking
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Building user
//
// User.build({
//   email: 'batman@joker.com',
//   password: '12345',
// });

// Instead of directly creaeting a new user we are using function so that the function checks types in the user model
// added same above to the statics so no longer needed
//
// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

export { User };
