const { errorLog } = require("../util/util");
const db = require("../util/database");
const Poll = db.poll;
const PollChoice = db.poll_choice;

//todo: create poll need parameter for finish poll
exports.createPoll = async (req, res) => {
  try {
    const poll = await Poll.create({
      name: req.body.name,
      publish: req.body.publish,
      question: req.body.question,
      sub_name: req.body.sub_name,
      type: req.body.type,
      chart: req.body.chart,
      image_url: req.body.image_url,
    });
    //? Create poll's questions
    for (const choice in req.body.choice) {
      await PollChoice.create({
        id_poll: poll.id,
        choice: req.body.choice[choice].choice,
      });
    }

    return res.status(200).send({
      status: "success",
      data: await Poll.findOne({
        where: { id: poll.id },
        include: [
          {
            model: PollChoice,
          },
        ],
      }),
    });
  } catch (error) {
    errorLog("Creat Poll", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

exports.editPoll = async (req, res) => {
  try {
    await Poll.update(
      {
        name: req.body.name,
        publish: req.body.publish,
        question: req.body.question,
        sub_name: req.body.sub_name,
        type: req.body.type,
        chart: req.body.chart,
        image_url: req.body.image_url,
      },
      { where: { id: req.body.id } }
    );

    for (const index in req.body.choice) {
      req.body.choice[index].id
        ? await PollChoice.update(
            {
              choice: req.body.choice[index].choice,
            },
            { where: { id: req.body.choice[index].id } }
          )
        : await PollChoice.create({
            id_poll: req.body.id,
            choice: req.body.choice[index].choice,
          });
    }
    const res_poll = await Poll.findOne({
      where: { id: req.body.id },
      include: [
        {
          model: PollChoice,
          attributes: {
            exclude: ["createdAt", "updatedAt", "total_answer"],
          },
        },
      ],
    });

    return res.status(200).send({
      status: "success",
      data: res_poll,
    });
  } catch (error) {
    errorLog("Edit Poll", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

exports.publishPoll = async (req, res) => {
  try {
    await Poll.update(
      {
        publish: req.query.publish,
      },
      { where: { id: req.query.id } }
    );
    return res.status(200).send({
      status: "success",
      data: await Poll.findOne({ where: { id: req.query.id } }),
    });
  } catch (error) {
    errorLog("Publish Poll", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

exports.answerPoll = async (req, res) => {
  try {
    for (const index in req.body.answers) {
      await PollChoice.increment(
        { total_answer: 1 },
        { where: { id: req.body.answers[index] } }
      );
    }
    return res.status(200).send({
      status: "success",
      message: "Thank for submit answers",
    });
  } catch (error) {
    errorLog("Answer Poll", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

exports.answerPollscore = async (req, res) => {
  try {
    for (const index in req.body.answers) {
      await PollChoice.increment(
        { total_answer: req.body.answers[index].score, total_score: 5 },
        { where: { id: req.body.answers[index].id } }
      );
    }
    return res.status(200).send({
      status: "success",
      message: "Thank for submit answers",
    });
  } catch (error) {
    errorLog("Answer Poll Score", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

//? request with id = get 1 poll with question
//? request without id = get all poll header
exports.getPoll = async (req, res) => {
  try {
    const poll_res = req.query.id
      ? await Poll.findOne({
          where: { id: req.query.id },
          include: [
            {
              model: PollChoice,
              attributes: {
                exclude: ["createdAt", "updatedAt", "total_answer"],
              },
            },
          ],
        })
      : await Poll.findAll();
    return res.status(200).send({ status: "success", data: poll_res });
  } catch (error) {
    errorLog("Get Poll", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

//todo : get answer with total answer summary ✔︎
exports.getPollResult = async (req, res) => {
  try {
    const poll_res = await Poll.findOne({
      where: { id: req.query.id },
      include: [
        {
          model: PollChoice,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    return res.status(200).send({ status: "success", data: poll_res });
  } catch (error) {
    errorLog("Get Poll Result", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    const delete_res = await Poll.destroy({ where: { id: req.query.id } });
    return res.status(200).send({
      status: "success",
      message: delete_res
        ? "poll has been deleted"
        : "unable to delete, please try again",
    });
  } catch (error) {
    errorLog("Delete Poll", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

exports.deleteChoice = async (req, res) => {
  try {
    const delete_res = await PollChoice.destroy({
      where: { id: req.query.id },
    });
    return res.status(200).send({
      status: "success",
      message: delete_res
        ? "choice has been deleted"
        : "unable to delete, please try again",
    });
  } catch (error) {
    errorLog("Delete Poll's Choice", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

exports.displayPoll = async (req, res) => {
  try {
    let data = await Poll.findAll();
    for (const index in data) {
      let id_poll = data[index].id
      await Poll.update(
        {
          displaypoll: false,
        },
        { where: { id: id_poll } }
      );
    }
    await Poll.update(
      {
        displaypoll: true,
      },
      { where: { id: req.query.id } }
    );
    return res.status(200).send({
      status: "success",
    });
  } catch (error) {
    errorLog("Display Poll", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};

exports.getPollHomepage = async (req, res) => {
  try {
    const poll_homepage = await Poll.findOne({
      where: { displaypoll: true },
      include: [
        {
          model: PollChoice,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    return res.status(200).send({ status: "success", data: poll_homepage });
  } catch (error) {
    errorLog("Get Poll Homepage", error);
    return res.status(200).send({ status: "error", message: error.message });
  }
};