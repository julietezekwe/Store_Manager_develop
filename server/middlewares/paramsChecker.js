class paramsChecker {
  static idChecker(req, res, next) {
    const { userId } = req.params;
    const validId = /^[0-9]+$/;
    // check if id is valid
    const checkParam = (param) => {
      if (!param.match(validId)) {
        return res.status(400).json({
          message: 'ID can only be a number',
          error: true,
        });
      }
      return true;
    };
    if (userId) checkParam(userId);
    return next();
  }
}

export default paramsChecker;
