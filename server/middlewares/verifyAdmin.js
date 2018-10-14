class verifyAdmin {
  static isAdmin(req, res, next) {
    if (req.authData) {
      const { role } = req.authData;

      if (role !== 'admin') {
        return (
          res.status(401).json({
            message: 'You are not an Admin',
            error: true,
          })
        );
      }
      return next();
    }
    return (
      res.status(401).json({
        message: 'Something went wrong',
        error: true,
      })
    );
  }
}

export default verifyAdmin;
