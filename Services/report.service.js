const Report = require("../model/report");

const saveReport = async (reportData) => {
  try {
    return await Report.create(reportData);
  } catch (error) {
    throw {
      status: 500,
      message: "Failed to save report.",
      error: error.message,
    };
  }
};

module.exports = {
  saveReport,
};
