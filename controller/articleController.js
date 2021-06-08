const { errorLog } = require("../util/util")
const db = require("../util/database")
const { includes } = require("./adminColumn/exhibitorColumn")
const Articles = db.articles
const SubArticle = db.sub_article

exports.createArticle = async (req, res) => {
  const body = req.body
  try {
    Articles.create({
      title: body.title,
      image_url: body.image_url,
      video_url: body.video_url,
      content: body.content,
      category: body.category,
      publish: body.publish,
    })
      .then(async (art) => {
        for (const sub in body.sub_content) {
          await SubArticle.create({
            id_article: art.id,
            image_url: body.sub_content[sub].image_url,
            content: body.sub_content[sub].content,
          })
        }
      })
      .then(() => {
        return res
          .status(200)
          .send({ status: "success", message: "An article has been created" })
      })
  } catch (error) {
    errorLog("Create Article", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.updateArticle = async (req, res) => {
  const body = req.body
  try {
    Articles.update(
      {
        title: body.title,
        image_url: body.image_url,
        video_url: body.video_url,
        content: body.content,
        category: body.category,
        publish: body.publish,
      },
      { where: { id: body.id } }
    )
      .then(async (art) => {
        for (const sub in body.sub_content) {
          body.sub_content[sub].id
            ? await SubArticle.update(
                {
                  image_url: body.sub_content[sub].image_url,
                  content: body.sub_content[sub].content,
                },
                { where: { id: body.sub_content[sub].id } }
              )
            : await SubArticle.create({
                id_article: body.id,
                image_url: body.sub_content[sub].image_url,
                content: body.sub_content[sub].content,
              })
        }
      })
      .then(() => {
        return res
          .status(200)
          .send({ status: "success", message: "An article has been updated" })
      })
  } catch (error) {
    errorLog("Update Articles", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.getArticles = async (req, res) => {
  const params = req.query
  try {
    const article_response =
      params.category === "banner"
        ? await Articles.findOne({
            include: [
              {
                model: SubArticle,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
            where: { category: "banner" },
          })
        : params.id
        ? await Articles.findOne({
            include: [
              {
                model: SubArticle,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
            where: { id: params.id },
          })
        : params.category
        ? await Articles.findAndCountAll({
            where: { category: params.category, publish: true },
            offset: (Number(params.page) - 1) * params.limit,
            limit: Number(params.limit),
            order: [["id", "DESC"]],
          })
        : await Articles.findAndCountAll({ order: [["id", "DESC"]] })
    return res.status(200).send({ status: "success", data: article_response })
  } catch (error) {
    errorLog("Get Articles", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.deleteArticle = async (req, res) => {
  try {
    const delete_response = await Articles.destroy({
      where: { id: req.params.id },
    })
    return delete_response
      ? res
          .status(200)
          .send({ status: "success", message: "An article has been deleted" })
      : res.status(200).send({
          status: "error",
          message: "Unable to delete this article, please try again",
        })
  } catch (error) {
    errorLog("Delete Article", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.deleteSubArticle = async (req, res) => {
  try {
    const delete_response = await SubArticle.destroy({
      where: { id: req.params.id },
    })
    return delete_response
      ? res.status(200).send({
          status: "success",
          message: "An sub article has been deleted",
        })
      : res.status(200).send({
          status: "error",
          message: "Unable to delete this sub article, please try again",
        })
  } catch (error) {
    errorLog("Delete Article", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}

exports.publishArticle = async (req, res) => {
  try {
    await Articles.update(
      {
        publish: req.query.publish,
      },
      {
        where: {
          id: req.query.id,
        },
      }
    )
    return res.status(200).send({
      status: "success",
      data: await await Articles.findOne({
        include: [
          {
            model: SubArticle,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        where: { id: req.query.id },
      }),
    })
  } catch (error) {
    errorLog("Publish Article", error)
    return res.status(200).send({ status: "error", message: error.message })
  }
}
