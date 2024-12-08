const { JoinClassService, GetClassesService } = require("./ClassroomService");

const JoinClass = async (req, res) => {
  try {
    const { name, id } = req.body;

    const joinClassResult = await JoinClassService(name, id);

    if (joinClassResult.joined) {
      return res.status(201).json({
        title: "Already join",
        message: "Something went wrong.",
        data: [],
      });
    }

    if (!joinClassResult.succesfull) {
      return res.status(400).json({
        title: "Join Class failed",
        message: "Something went wrong.",
        data: [],
      });
    }

    return res.status(200).json({
      title: "Join Class Success",
      message: `clasess get`,
      data: joinClassResult.data,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ title: "Internal Error", message: "Something went wrong!" });
  }
};

const GetClasses = async (req, res) => {
  const { student_id } = req.params;
  try {
    console.log(student_id);

    const getClassesResult = await GetClassesService(student_id);
    if (!getClassesResult.successful) {
      return res.status(200).json({
        title: "Get Classes failed",
        message: "Something went wrong.",
        data: [],
      });
    }

    return res.status(200).json({
      title: "Get Classes Success",
      message: `classes get`,
      data: getClassesResult.data,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ title: "Internal Error", message: "Something went wrong!" });
  }
};

module.exports = {
  JoinClass,
  GetClasses,
};
