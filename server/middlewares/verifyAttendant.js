class verifyAttendant {
  static isAttendant(req, res, next) {
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
}

export default verifyAttendant;
