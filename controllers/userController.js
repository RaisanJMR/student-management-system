const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/userModel');


// @desc   Auth user & get token
// @route  POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc   Register a new User
// @route  POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  //   res.send({ email, password })
  const userExists = await User.findOne({ email: email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc   Get all users
// @route  GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: 'super_admin' } });
  res.json(users);
});


// @desc   Update a user
// @route  PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, permissions } = req.body
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    user.role = role || user.role
    user.permissions = permissions || user.permissions

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      permissions: updatedUser.permissions,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc   Delete a user
// @route  DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
   const { id } = req.params;
     const user = await User.findByIdAndDelete(id);
     if (!user) {
         throw new Error("User not found");
     }
     res.status(200).json({ message: "User deleted successfully" });
})

// @desc   Create a new user by Admin
// @route  POST /api/users/create
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, permissions } = req.body

  const userExists = await User.findOne({ email: email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    permissions,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})


const updatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { permissions } = req.body;

  if (!Array.isArray(permissions)) {
    res.status(400);
    throw new Error('Permissions must be an array');
  }

  const user = await User.findById(id);
  console.log(user);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.role !== 'staff') {
    res.status(400);
    throw new Error('Only staff user permissions can be updated');
  }

  user.permissions = permissions;
  await user.save();

  res.json({
    message: 'Permissions updated successfully',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    },
  });
});


module.exports = {
  registerUser,
  authUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
  updatePermission
}