const Appointment = require("../models/Appointment");

exports.create = async (req, res) => {
  try {
    const { patient, doctor, disease, appointmentDate, appointmentStatus } =
      req.body;

    if (!(patient && doctor && disease && appointmentDate)) {
      return res.status(400).json({
        status: "fail",
        message: "All inputs are required",
      });
    }

    const convertedDate = await convertDate(appointmentDate);

    const existingAppointment = await Appointment.findOne({
      appointmentDate: convertedDate,
    });

    if (existingAppointment) {
      return res.status(409).json({
        status: "fail",
        message: "Appointment already existing",
      });
    }

    await Appointment.create({
      patient: patient,
      doctor: doctor,
      disease: disease,
      appointmentDate: convertedDate,
      appointmentStatus:
        appointmentStatus === "open" ? appointmentStatus : "pending",
    });

    return res.status(201).json({
      status: "success",
      message: "Appointment created",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id, patient, doctor, disease, appointmentDate } = req.body;

    if (!(id && patient && doctor && disease && appointmentDate)) {
      return res.status(400).json({
        status: "fail",
        message: "All inputs are required",
      });
    }

    const convertedDate = await convertDate(appointmentDate);

    const existingAppointment = await Appointment.findOne({ _id: id });

    if (!existingAppointment) {
      return res.status(409).json({
        status: "fail",
        message: "Appointment not found",
      });
    }

    const filter = { _id: id };
    const data = { patient, doctor, disease, appointmentDate: convertedDate };

    await Appointment.findOneAndUpdate(filter, data);

    return res.status(201).json({
      status: "success",
      message: "Update successfull",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    let filter = {};
    /*
    const { userId, userRole} = req.user;

    if(userRole=="patient"){
        filter.patient = {"_id":userId}
    }
    if(userRole=="doctor"){
        filter.DOCTOR = {"_id":userId}
    }
    */

    const appointments = await Appointment.find(filter)
      .populate("patient", "-department -password")
      .populate({
        path: "doctor",
        populate: {
          path: "department",
        },
        select: "-password",
      })
      .populate({
        path: "disease",
        populate: {
          path: "department",
        },
      });

    return res.status(200).json({
      status: "success",
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "All input is required",
      });
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(409).json({
        status: "fail",
        message: "appointment id wrong",
      });
    }

    const appointment = await Appointment.findById(id)
      .populate("patient", "-department -password")
      .populate({
        path: "doctor",
        populate: {
          path: "department",
        },
        select: "-password",
      })
      .populate({
        path: "disease",
        populate: {
          path: "department",
        },
      });

    return res.status(200).json({
      status: "success",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  if (!(id && status)) {
    return res.status(400).json({
      status: "fail",
      message: "All input is required",
    });
  }

  const conditionsArray = ["open", "rejected", "cancelled", "completed"];

  if (conditionsArray.indexOf(status) === -1) {
    return res.status(400).json({
      status: "fail",
      message: "Appointment status wrong",
    });
  }

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(409).json({
      status: "fail",
      message: "Appointment id wrong",
    });
  }

  const existingAppointment = await Appointment.findOne({ _id: id });

  if (!existingAppointment) {
    return res.status(409).json({
      status: "fail",
      message: "Appointment not found",
    });
  }

  const filter = { _id: id };
  const data = { appointmentStatus: status };

  await Appointment.findOneAndUpdate(filter, data);

  return res.status(201).json({
    status: "success",
    message: "Status update successfull",
  });
};

const convertDate = async (time) => {
  let appointmentDatex = new Date(Date.now());
  let appointmentHour = time.split(":")[0];
  let appointmentMinute = time.split(":")[1];

  appointmentDatex.setHours(appointmentHour);
  appointmentDatex.setMinutes(appointmentMinute);
  appointmentDatex.setSeconds("00");
  appointmentDatex.setMilliseconds("000");

  return appointmentDatex;
};
