const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    let currentPage = req.query.page || 1;
    let userPerPage = 10;

    const users = await User.find({})
      .select({ password: 0 })
      .skip(userPerPage * (currentPage - 1))
      .limit(userPerPage);
      
    res.status(200).json({
      status: "Success",
      message: "All users",
      data: {
        users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({
        status: "Success",
        message: "User Detail",
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          department: user.department,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.deleteOne();
      res.status(200).json({
        status: "Success",
        message: "User deleted",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.body);

    (user.first_name = req.body.first_name),
      (user.last_name = req.body.last_name),
      (user.email = req.body.email),
      (user.phone = req.body.phone),
      (user.password = req.body.password),
      user.save();
    res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};
