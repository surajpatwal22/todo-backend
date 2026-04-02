import User from "../models/userModel.js";

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
