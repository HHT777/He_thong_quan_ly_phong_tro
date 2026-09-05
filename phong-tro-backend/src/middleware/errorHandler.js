// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Joi validation error
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: "Lỗi validation",
      details: err.details?.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      })),
    });
  }

  // Sequelize error
  if (err.name === "SequelizeError") {
    return res.status(400).json({
      success: false,
      message: "Lỗi cơ sở dữ liệu",
      details: err.message,
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Lỗi máy chủ nội bộ",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
