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
const { errorLog } = require("../util/util")
const db = require("../util/database")

const Custumer = db.custumer
const Product = db.product
const Order = db.order
const Specification = db.specification
const Brand = db.brand
const News = db.news
const Admin = db.admin
const { Op } = require("sequelize");

//* Set Variable
const route = express.Router()
route.get("/", (req, res) => {
  res.send("riceland API")
})

//* Useful function
//get all custumers
route.get('/custumers', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)

  let custumers = await Custumer.findAll({
    include: { 
      model: Order,
      include: {
        model: Product,
        attributes: ['pd_title_en']
      },
      attributes: ['size','mat_bag']
    }
  })
  console.log(JSON.stringify(custumers, null, 2));
  res.status(200).send(custumers)
})

//toggle status each custumer
route.post('/custumers/:id', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)

  let custumer
  let custumer_id = req.params.id
  let current = await Custumer.findAll({
    attributes: ['contacted'],
    where:{
        id: custumer_id
    }
  })
  console.log(JSON.stringify(current[0].contacted));
  if(current[0].contacted == false){
    custumer = await Custumer.update({
      contacted: true
    },
    {
      where:{
        id: custumer_id
      }
    })
  }
  else{
    custumer = await Custumer.update({
      contacted: false
    },
    {
      where:{
        id: custumer_id
      }
    })
  }
  let toggled = await Custumer.findAll({
    attributes: ['contacted'],
    where:{
        id: custumer_id
    }
  })
  res.status(200).send(toggled)
  
})

// delete each custumer
route.delete('/custumers/:id', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)

  let custumer_id = req.params.id
  let custumer = await Custumer.destroy({
      where:{
          id: custumer_id
      }
  })

  res.send({
      'status':true
  })
  
})
// get all product
route.get('/products', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)

  let products = await Product.findAll({
    where: {
      brand_id: null,
      is_related_product: null
    }
  })
  console.log(JSON.stringify(products, null, 2));
  res.status(200).send(products)
})

// get all related product
route.get('/relatedProducts', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)

  let products = await Product.findAll({
    where: {
      brand_id: null,
      is_related_product: true
    }
  })
  console.log(JSON.stringify(products, null, 2));
  res.status(200).send(products)
})

// get all brand products
route.get('/brandProducts', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)

  let products = await Product.findAll({
    include: {
      model: Brand,
    },
    where: {
      brand_id: {
        [Op.ne]: null
      },
      is_related_product: null
    }
  })
  console.log(JSON.stringify(products, null, 2));
  res.status(200).send(products)
})
// get brand
route.get('/brands', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)

  let brands = await Brand.findAll()
  console.log(JSON.stringify(brands, null, 2));
  res.status(200).send(brands)
})
//get news
route.get('/news', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)

  let news = await News.findAll()
  console.log(JSON.stringify(news, null, 2));
  res.status(200).send(news)
})

// create product
route.put('/products', async function (req, res) {
  console.log('query: ',req.query)
  console.log('params: ',req.params)
  console.log('body: ' ,req.body)
  let product
  product = await Product.create({
      pd_title_en: req.body.pd_title_en,
      pd_title_ch: req.body.pd_title_ch,
      pd_content_en: req.body.pd_content_en,
      pd_content_ch: req.body.pd_content_ch,
      pd_img_url: req.body.pd_img_url,

  })
  .then(async (pro) => {
    for (const sub in req.body.specification) {
      await Specification.create({
        product_id: pro.id,
        sp_name_en: req.body.specification[sub].sp_name_en,
        sp_name_ch: req.body.specification[sub].sp_name_ch,
        sp_detail_en: req.body.specification[sub].sp_detail_en,
        sp_detail_ch: req.body.specification[sub].sp_detail_ch,
      })
    }
    productAdd = await Product.findAll({
      include: { 
        model: Specification,
      },
      where:{
        id: pro.id
    }
    })
  })
  res.status(200).send(productAdd)
  
})

// create relate product

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
