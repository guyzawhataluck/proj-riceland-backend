const { errorLog } = require("../util/util")
const db = require("../util/database")
const Exhibitor = db.exhibitors

const emailController = require('./emailController')

exports.getDepartments = (req, res) => {
  const department = [
    "นักวิชาการ",
    "หน่วยงานของรัฐ",
    "ภาคีเครือข่าย สสส.",
    "สื่อมวลชล",
    "สถาบันศึกษา",
    "อื่น ๆ",
  ]
  return res.status(200).send(department)
}

exports.register = async (req, res) => {
  const data = req.body
  try {
    const exhibitor_response = await Exhibitor.create({
      name: data.name,
      phone: data.phone,
      email: data.email,
      department: data.department,
      is_online: data.is_online,
      is_get_certificate: data.is_get_certificate,
    })
    await emailController.registerAlert("register", exhibitor_response.id)
    return res.status(200).send({ status: "success", data: exhibitor_response })
  } catch (error) {
    errorLog("Exhibitor Register", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.getExhibitors = async (req, res) => {
  try {
    const data = req.query.id
      ? await Exhibitor.findOne({ where: { id: req.query.id } })
      : await Exhibitor.findAll()
    return res.status(200).send({
      status: "success",
      data: data,
    })
  } catch (error) {
    errorLog("Get Exhibitors", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.emailupcoming = async (req, res) => {
  try {
    let data = await Exhibitor.findAll()
    for(const index in data){
      await emailController.emailUpcoming("upcoming",data[index].email)
      console.log("Send Email >",data[index].email)
    }
    return res.status(200).send({ status: "success"})
  } catch (error) {
    errorLog("Email Upcoming", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.emailCertificate = async (req, res) => {
  try {
    let data = await Exhibitor.findAll()
    for(const index in data){
      await emailController.emailCertificate("certificate",data[index].email)
      console.log("Send Email >",data[index].email)
    }
    return res.status(200).send({ status: "success"})
  } catch (error) {
    errorLog("Email Certificate", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.contactus = async (req, res) => {
  let body = req.body
  try {
    await emailController.emailContact("contact",body)
    return res.status(200).send({ status: "success"})
  } catch (error) {
    errorLog("Email Certificate", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}