const errorMiddleware = (err, req, res, next) => {
  console.log("================= ERROR DETECTED =================");
  console.log(err.stack || err);
  console.log("========================================================");
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message
  })
}

export default errorMiddleware