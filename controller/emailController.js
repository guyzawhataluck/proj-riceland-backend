// const axios = require("axios")
const FormData = require("form-data")
const fs = require("fs")
const Hogan = require("hogan.js")
const request = require("request")
const path = require("path")
const moment = require("moment")

const { errorLog } = require("../util/util")
const db = require("../util/database")
const Exhibitors = db.exhibitors
const Articles = db.articles

const DataPreparation = async () => {
  const banner = await Articles.findOne({ where: { category: "banner" } })

  return {
    live_link: banner.video_url,
  }
}

exports.testEmail = async (req, res) => {
  try {
    const template = fs.readFileSync(
      path.resolve(__dirname, "./emailTemplate/registration.hjs"),
      "utf-8"
    )
    const compileTem = Hogan.compile(template)

    var options = {
      method: "POST",
      url: "https://dev.houseofdev.tech/hod-mailer/namebox_mailer.php",
      headers: {
        Cookie: "__cfduid=d4f5d1d2eef93e5513f5fc3ca75bd4ad51604307937",
      },
    }
    let action = "register"
    switch (action) {
      case "register":
        options.formData = {
          subject: "Registration",
          body: compileTem.render({
            info: await DataPreparation(1),
          }),
          sender_email: "no-reply@namebox.me",
          sender_name: "Thai Health Watch",
          recipient_email: "vikade1737@5y5u.com",
          //! add file
          // attachment: {
          //   value: fs.createReadStream("/Users/mark/Desktop/Untitled.pdf"),
          //   options: {
          //     filename: "Untitled.pdf",
          //     contentType: null,
          //   },
          // },
        }
        break
      case "upcoming":
        break
      case "certificate":
        break
      default:
        return false
    }
    request(options, function (error, response) {
      if (error) throw new Error(error)
      console.log(response.body)
    })
    return res.send(compileTem.render({ info: await DataPreparation(1) }))
  } catch (error) {
    errorLog("Test Email", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

//todo Separate each action
exports.registerAlert = async (action, exhibitor_id) => {
  try {
    const exhibitor = await Exhibitors.findOne({ where: { id: exhibitor_id } })
    // const template = fs.readFileSync(
    //   path.resolve(__dirname, "./emailTemplate/registration.hjs"),
    //   "utf-8"
    // )
    const template = fs.readFileSync(
      path.resolve(__dirname, "./emailTemplate/registerafter24th.hjs"),
      "utf-8"
    )
    const compileTem = Hogan.compile(template)
    var options = {
      method: "POST",
      url: "https://dev.houseofdev.tech/hod-mailer/main_mailer.php",
      headers: {
        Cookie: "__cfduid=d4f5d1d2eef93e5513f5fc3ca75bd4ad51604307937",
      },
    }

    switch (action) {
      case "register":
        options.formData = {
          subject: "ขอบคุณสำหรับการติดตาม ThaiHealth Watch",
          body: compileTem.render({
            info: await DataPreparation(exhibitor_id),
          }),
          sender_email: "thwatch@thaihealth.or.th",
          sender_name: "ThaiHealth Watch",
          recipient_email: exhibitor.email,
          //! add file
          // attachment: {
          //   value: fs.createReadStream("/Users/mark/Desktop/Untitled.pdf"),
          //   options: {
          //     filename: "Untitled.pdf",
          //     contentType: null,
          //   },
          // },
        }
        break
      case "upcoming":
        break
      case "certificate":
        break
      default:
        return false
    }

    request(options, function (error, response) {
      if (error) throw new Error(error)
      console.log(response.body)
    })
  } catch (error) {
    throw error
  }
}

exports.emailUpcoming = async (action, email) => {
  try {
    const template = fs.readFileSync(
      path.resolve(__dirname, "./emailTemplate/upcoming.hjs"),
      "utf-8"
    )
    const compileTem = Hogan.compile(template)
    var options = {
      method: "POST",
      url: "https://dev.houseofdev.tech/hod-mailer/main_mailer.php",
      headers: {
        Cookie: "__cfduid=d4f5d1d2eef93e5513f5fc3ca75bd4ad51604307937",
      },
    }

    switch (action) {
      case "upcoming":
        options.formData = {
          subject: "พรุ่งนี้!! เตรียมพบกับกิจกรรม ThaiHealth Watch",
          body: compileTem.render(),
          sender_email: "thwatch@thaihealth.or.th",
          sender_name: "ThaiHealth Watch",
          recipient_email: email,
        }
        break
      default:
        return false
    }

    request(options, function (error, response) {
      if (error) throw new Error(error)
      console.log(response.body)
    })
  } catch (error) {
    throw error
  }
}

exports.emailCertificate = async (action, email) => {
  try {
    const template = fs.readFileSync(
      path.resolve(__dirname, "./emailTemplate/certificate.hjs"),
      "utf-8"
    )
    const compileTem = Hogan.compile(template)
    var options = {
      method: "POST",
      url: "https://dev.houseofdev.tech/hod-mailer/main_mailer.php",
      headers: {
        Cookie: "__cfduid=d4f5d1d2eef93e5513f5fc3ca75bd4ad51604307937",
      },
    }

    switch (action) {
      case "certificate":
        options.formData = {
          subject: "ขอบคุณสำหรับการติดตาม ThaiHealth Watch 2021",
          body: compileTem.render(),
          sender_email: "thwatch@thaihealth.or.th",
          sender_name: "ThaiHealth Watch",
          recipient_email: email,
        }
        break
      default:
        return false
    }

    request(options, function (error, response) {
      if (error) throw new Error(error)
      console.log(response.body)
    })
  } catch (error) {
    throw error
  }
}

exports.emailContact = async (action, body) => {
  try {
    const template = fs.readFileSync(
      path.resolve(__dirname, "./emailTemplate/contact.hjs"),
      "utf-8"
    )
    const compileTem = Hogan.compile(template)
    var options = {
      method: "POST",
      url: "https://dev.houseofdev.tech/hod-mailer/main_mailer.php",
      headers: {
        Cookie: "__cfduid=d4f5d1d2eef93e5513f5fc3ca75bd4ad51604307937",
      },
    }

    switch (action) {
      case "contact":
        options.formData = {
          subject: body.subject,
          body: compileTem.render({
            info: body,
          }),
          sender_email: "thwatch@thaihealth.or.th",
          sender_name: "ThaiHealth Watch",
          recipient_email: "thwatch@thaihealth.or.th",
        }
        break
      default:
        return false
    }

    request(options, function (error, response) {
      if (error) throw new Error(error)
      console.log(response.body)
    })
  } catch (error) {
    throw error
  }
}

