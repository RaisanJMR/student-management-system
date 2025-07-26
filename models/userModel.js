const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  contact: { type: String, unique: true },
  role: { type: String, enum: ['super_admin', 'staff'], default: 'staff' },
  permissions: [{ type: String, enum: ['create', 'view', 'edit', 'delete'] }]
}, { timestamps: true });


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}


UserSchema.pre('save', async function (next) { 
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


module.exports = mongoose.model('User', UserSchema);
