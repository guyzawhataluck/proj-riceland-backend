//!import lib
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const multer = require("multer")

const configJson = require("./util/config")

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development"
const config = configJson[env]

//! setting variable
const app = express()
const routes = require("./route/routes")

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

app.use(multerMid.single("file"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requestd-With, Content-Type, Accept"
    ),
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"),
    next()
})
// app.use("/api/uploadimg", express.static(path.join(__dirname, "/uploads")))
app.use("/api", routes)

//? Set Multer Storage

app.get("/api/test", (req, res) => {
  res.send("Thai Health Watch API 1")
})

app.listen(config.port, () => {
  console.log(`Server start on port ${config.port}`)
})
