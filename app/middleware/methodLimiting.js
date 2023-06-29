// Middleware for limiting HTTP methods
function methodLimiter(allowedMethods) {
  return (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
      res.status(405).json({ message: "Method Not Allowed" });
    } else {
      next();
    }
  };
}

export default methodLimiter
