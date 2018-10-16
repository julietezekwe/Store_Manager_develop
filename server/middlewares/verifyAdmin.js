class verifyAdmin {
  static isAdmin(req, res, next) {
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
}

export default verifyAdmin;
