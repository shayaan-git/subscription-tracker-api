import User from '../models/user.model.js'

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Your deletion logic here
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ 
      message: 'User deleted successfully',
      deletedUserId: userId 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete user',
      message: error.message 
    });
  }
};