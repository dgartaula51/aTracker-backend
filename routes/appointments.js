const router = require("express").Router();
let Appointment = require("../models/appointment.model");

router.route("/").get((req, res) => {
  Appointment.find()
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const time = req.body.time;

  const newAppointment = new Appointment({ username, description, date, time });

  newAppointment
    .save()
    .then(() => res.json("Appointment added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  Appointment.findById(req.params.id)
    .then((appointment) => res.json(appointment))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").delete((req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Appointment deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post((req, res) => {
  Appointment.findById(req.params.id)
    .then((appointment) => {
      appointment.username = req.body.username;
      appointment.description = req.body.description;
      appointment.date = Date.parse(req.body.date);
      appointment.time = req.body.time;

      appointment
        .save()
        .then(() => res.json("Appointment Updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});
module.exports = router;
