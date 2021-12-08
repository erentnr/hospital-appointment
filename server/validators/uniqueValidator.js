exports.valid = (obj, model) => async (req, res, next) => {
    const elemnt = await model.findOne({ [obj]: req.body[obj] });
    if (elemnt) {
      res.status(409).json({
        status: "Failed",
        message: `Already existing ${elemnt[obj]}`,
      });
    } else {
      next();
    }
};