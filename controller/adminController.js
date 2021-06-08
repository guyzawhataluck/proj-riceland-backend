const { errorLog } = require("../util/util");
const db = require("../util/database");
const Articles = db.articles;
const Exhibitor = db.exhibitors;
const Poll = db.poll;
const PollChoice = db.poll_choice;

const ArticleColumn = require("./adminColumn/articleColumn");
const ExhibitorColumn = require("./adminColumn/exhibitorColumn");
const PollColum = require("./adminColumn/pollColumn");
const articleFetching = async (type) => {
  const data = await Articles.findAll({
    where: {
      category: type,
    },
  });

  return data.map((article) => ({
    id: article.id,
    title: article.title,
    detail: article.id,
    delete: article.id,
    publish: {
      name: article.publish ? "เผยแพร่" : "ไม่เผยแพร่",
      value: article.publish ? 1 : 0,
    },
    choice: [
      { name: "เผยแพร่", value: 1 },
      { name: "ไม่เผยแพร่", value: 0 },
    ],
  }));
};
const pollFetching = async () => {
  const data = await Poll.findAll();
  return data.map((poll) => ({
    id: poll.id,
    title: poll.name,
    detail: poll.id,
    delete: poll.id,
    publish: {
      name: poll.publish ? "เผยแพร่" : "ไม่เผยแพร่",
      value: poll.publish ? 1 : 0,
    },
    displaypoll: {
      id : poll.id,
      value: poll.displaypoll ? 1 : 0,
    },
    choice: [
      { name: "เผยแพร่", value: 1 },
      { name: "ไม่เผยแพร่", value: 0 },
    ],
  }));
};

const exhibitorFetching = async () => {
  const data = await Exhibitor.findAll();

  return data.map((exhibitor) => ({
    id: exhibitor.id,
    name: exhibitor.name,
    phone: exhibitor.phone,
    email: exhibitor.email,
    department: exhibitor.department,
    is_get_certificate: exhibitor.is_get_certificate ? "รับ" : "ไม่รับ",
    is_online: exhibitor.is_online ? "ออนไลน์" : "หน้างาน"
  }));
};

exports.getTable = async (req, res) => {
  const { path } = req.query;
  try {
    let response = {};
    switch (path) {
      case "home":
        response = {
          column: ExhibitorColumn,
          data: await exhibitorFetching(),
        };
        break;
      case "second":
        //! Articles Table
        response = {
          column: ArticleColumn,
          data: await articleFetching("article"),
        };
        break;
      case "third":
        //! News Table
        response = {
          column: ArticleColumn,
          data: await articleFetching("news"),
        };
        break;
      case "fourth":
        //! Videos Table
        response = {
          column: ArticleColumn,
          data: await articleFetching("video"),
        };
        break;
      case "sixth":
        //! Poll Table
        response = {
          column: PollColum,
          data: await pollFetching(),
        };
        break;
      default:
        null;
    }

    return res.status(200).send({
      status: "success",
      data: response,
    });
  } catch (error) {
    errorLog("Admin : Get Table -> ", error);
    return res.status(200).send({
      status: "error",
      message: error.message,
    });
  }
};

exports.getTabs = (req, res) => {
  try {
    switch (req.query.path) {
      case "home":
        break;
      case "second":
        break;
      case "third":
        break;
      case "fourth":
        break;
      default:
        break;
    }
    return res.status(200).send({
      status: "success",
      data: [],
    });
  } catch (error) {
    errorLog("Admin : Get tabs -> ", error);
    return res.status(200).send({
      status: "error",
      message: error.message,
    });
  }
};
