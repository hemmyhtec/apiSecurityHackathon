// Middleware for authorizing requests based on user roles or permissions
export function authorize(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
}

// Middleware for authorizing requests based on userId or permissions
export function authorization() {
  return (req, res, next) => {
    const user = req.user.userId
    if(user){ 
      next()
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  }
}

// export default authorize;
