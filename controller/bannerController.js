const { errorLog } = require("../util/util")
const db = require("../util/database")
const { includes } = require("./adminColumn/exhibitorColumn")
const Banner = db.banner


exports.createBanner = async (req, res) => {
  const body = req.body
  try {
    Banner.create({
      title: body.title,
      image_url: body.image_url,
      facebook_url: body.facebook_url,
      youtube_url: body.youtube_url,
      content: body.content,
      publish: body.publish,
      banner_url: body.banner_url,
    })
      .then(() => {
        return res
          .status(200)
          .send({ status: "success", message: "Banner created" })
      })
  } catch (error) {
    errorLog("Create Article", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.updateBanner = async (req, res) => {
  const body = req.body
  try {
    Banner.update(
      {
        title: body.title,
        image_url: body.image_url,
        facebook_url: body.facebook_url,
        youtube_url: body.youtube_url,
        content: body.content,
        publish: body.publish,
        banner_url: body.banner_url,
      },
      { where: { id: body.id } }
    )
      .then(() => {
        return res
          .status(200)
          .send({ status: "success", message: "Banner updated" })
      })
  } catch (error) {
    errorLog("Update Articles", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.getbanner = async (req, res) => {
  try {
    const Banner_res = await Banner.findOne()
    return res.status(200).send({ status: "success", data: Banner_res })
  } catch (error) {
    errorLog("Get Articles", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}