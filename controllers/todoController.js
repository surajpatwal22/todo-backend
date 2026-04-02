// controllers/todoController.js

import Todo from "../models/todoModel.js";

// Create Todo
export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("userId");
    res.status(200).json({
      message: "Todos retrieved successfully",
      success: true,
      data: todos,
      status: 200,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve todos",
      success: false,
      error: err.message,
    });
  }
};

// Update
export const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(todo);
};

// Delete
export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// Get Single Todo
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).populate("userId");
    res.status(200).json({
      message: "Todo retrieved successfully",
      success: true,
      data: todo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get all todos of all users
export const getAllTodosOfAllUsers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    const todos = await Todo.find().populate("userId");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
