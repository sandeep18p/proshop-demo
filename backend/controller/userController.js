import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: '30d',
    // });

    // // Set JWT as HTTP-Only cookie
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development',
    //   sameSite: 'strict',
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // });

    //ye sab gaya utils me generate token me 
    //yaha par use karte hua generateToken ko

    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401); // 401 means unauthorized
    // custom error handler
    throw new Error('Invalid email or password');
  }
  // This line should not be reached after sending the response
});

// @desc Register user
// @route GET /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
 const {name,email,password}=req.body;
 const userExists = await User.findOne({email});
if(userExists){
res.status(400); //client error
throw new Error('User already exists');
}

const user = await User.create({
    name,
    email,
    password
    //password encryption user model me hi ho ra h 
});

if(user){
    generateToken(res, user._id);
    res.status(201).json({
        //ye data response me ja ra h
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
}else{
    res.status(400); //client error
throw new Error('Invalid user data');
}

});

// @desc Get by ID user
// @route GET /api/users/:id
// @access Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Logout user clear the cookie
// @route POST /api/users/logout
// @access Private
//logoutUser function looks correct for clearing the JWT cookie and logging out the user. The res.cookie method is used to set the JWT cookie with an expiration date of new Date(0), which essentially makes the cookie expire immediately. The httpOnly flag is set to true, which is a good security practice to prevent client-side access to the cookie through JavaScript.
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt','',{
    httpOnly:true,
    expires: new Date(0)
  });
  res.status(200).json({message: 'Logged out succesfully'})
// Clear the JWT cookie
          //OR
// res.clearCookie('jwt', { httpOnly: true, path: '/' });

// // Send a response indicating successful logout
// res.status(200).json({ message: 'Logged out successfully' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
//  const user =  await User.findById(req.user._id);
 const user = await User.findById({ _id: req.user._id });

 if(user){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
 }else{
    res.status(404);
    throw new Error('User not found');
 }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
// here we are not passing ID because we will use the token
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById({ _id: req.user._id });

    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if(req.body.password){
    user.password = req.body.password;
      }
     
      const updatedUser =  await user.save(); //yaha par hoga password encypt

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    }else{
        res.status(404);
        throw new Error('User not found');
    }

});

// admin
// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// admin
// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// admin
// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
