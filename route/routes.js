//! import lib
const express = require("express")
const multer = require("multer")
const exhibitorController = require("../controller/exhibitorsController")
const articleController = require("../controller/articleController")
const adminController = require("../controller/adminController")
const emailController = require("../controller/emailController")
const pollController = require("../controller/pollController")
const bannerController = require("../controller/bannerController")
const { Router } = require("express")
//const poll = require("../model/poll")

//* Set Variable
const route = express.Router()
route.get("/", (req, res) => {
  res.send("Thai Health Watch API")
})

//* Useful function

//? ----------   Util    -------------
//! API 00 : Get Departments
// route.get("/departments", exhibitorController.getDepartments)
// route.get("/testemail", emailController.testEmail)
// route.get("/emailupcoming",exhibitorController.emailupcoming)
// route.get("/emailcert",exhibitorController.emailCertificate)
// route.post("/contact", exhibitorController.contactus)

// //? ---------- Exhibitor -------------
// //! API 01 : Register
// route.post("/exhibitor/register", exhibitorController.register)
// //! API 02 : Get Exhibitors
// route.get("/exhibitor", exhibitorController.getExhibitors)

// //? ---------- Article -------------
// //! API 11 : Create Article
// route.post("/article/create", articleController.createArticle)
// //! API 12 : Get Articles
// route.get("/article", articleController.getArticles)
// //! API 13 : Update Articles
// route.post("/article/update", articleController.updateArticle)
// //! API 14 : Delete Articles
// route.delete("/article/:id", articleController.deleteArticle)
// //! API 15 : Delete Sub Articles
// route.delete("/subarticle/:id", articleController.deleteSubArticle)
// //! API 16 : Publish / Unpublish Article
// route.put("/article", articleController.publishArticle)

// //? ---------- Admin -------------
// //! API 21 : Get Table
// route.get("/admin/getTable", adminController.getTable)
// //! API 21 : Get Tab
// route.get("/admin/getTab", adminController.getTabs)

// //? ---------- Poll -------------
// //! API 31 : Create Poll & Choice
// route.post("/poll/create", pollController.createPoll)
// //! API 32 : Get Poll -> with id = get one + choice, without id = get all
// route.get("/poll", pollController.getPoll)
// //! API 33 : Edit Poll
// route.post("/poll", pollController.editPoll)
// //! API 34 : Edit Poll
// route.put("/poll", pollController.publishPoll)
// //! API 35 : Delete Poll
// route.delete("/poll", pollController.deletePoll)
// //! API 36 : Get poll result
// route.get("/poll/answer", pollController.getPollResult)
// //! API 37 : Answer poll
// route.post("/poll/answer", pollController.answerPoll)
// //! API 38 : Delete choice
// route.delete("/poll/answer", pollController.deleteChoice)
// //! API 39 : Publish Display poll
// route.put("/poll/displaypoll", pollController.displayPoll)
// //! API 40 : Get Poll homapapge
// route.get("/poll/homepage", pollController.getPollHomepage)
// //! API 41 : Answer poll (score)
// route.post("/poll/answerscore", pollController.answerPollscore)

// //? ---------- Banner -------------
// //! API 51 : Create Banner
// route.post("/banner/create", bannerController.createBanner)
// //! API 52 : Update Banner
// route.post("/banner/update", bannerController.updateBanner)
// //! API 53 : Get Banner
// route.get("/banner/get", bannerController.getbanner)

module.exports = route
