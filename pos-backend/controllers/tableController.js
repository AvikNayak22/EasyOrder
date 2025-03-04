const createHttpError = require("http-errors");
const Table = require("../models/tableModel");
const mongoose = require("mongoose");

const addTable = async (req, res, next) => {
  try {
    const { tableNo } = req.body;
    if (!tableNo) {
      const err = createHttpError(400, "Please provide table number");
      return next(err);
    }

    const isTablePresent = await Table.findOne({ tableNo });
    if (isTablePresent) {
      const err = createHttpError(400, "Table already exists!");
      return next(err);
    }

    const newTable = new Table({ tableNo });
    await newTable.save();

    res.status(201).json({
      success: true,
      message: "Table created successfully!",
      data: newTable,
    });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find();
    res.status(200).json({
      success: true,
      data: tables,
    });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = createHttpError(400, "Invalid table id!");
      return next(err);
    }

    const table = await Table.findByIdAndUpdate(
      id,
      {
        status,
        currentOrder: orderId,
      },
      { new: true }
    );

    if (!table) {
      const err = createHttpError(400, "Table not found!");
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "Table updated successfully!",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };
