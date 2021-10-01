
function logger(req, res, next) {
  console.log(req.method, req.originalURL, Date.now())
  next()
}
//eslint-disable-next-line
function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message
  })
}

module.exports = {
  logger,
  errorHandling
}
