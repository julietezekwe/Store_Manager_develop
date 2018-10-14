class verifyAttendant {
  static isAttendant(req, res, next) {
    if (req.authData) {
      const { role } = req.authData;

      if (role !== 'attendant') {
        return (
          res.status(401).json({
            message: 'You are not an Attendant',
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

export default verifyAttendant;
