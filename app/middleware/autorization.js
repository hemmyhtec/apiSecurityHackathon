// Middleware for authorizing requests based on user roles or permissions
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
}

export default authorize