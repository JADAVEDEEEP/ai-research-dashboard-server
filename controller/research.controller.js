const { saveReport } = require("../Services/report.service");

const { generateCompanyReport } = require("../Services/ai.service");

const CompanyStatus = require("../model/SearchHistory");

const saveSearchHistory = async ({ companyName, status, responseTime }) => {
  try {
    await CompanyStatus.create({
      companyName: companyName || "Unknown",
      status,
      responseTime,
    });
  } catch (error) {
    console.error("Failed to save search history:", error.message);
  }
};

// Create Research Report
const createResearch = async (req, res) => {
  const startTime = Date.now();
  const companyName = req.body.companyName.trim();

  try {
    // Generate AI Report
    const aiReport = await generateCompanyReport(companyName);

    if (!aiReport) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate report.",
      });
    }

    // Save Report
    const report = await saveReport({
      ...aiReport,
      companyName: aiReport.companyName || companyName,
    });

    // Response Time
    const responseTime = Date.now() - startTime;

    // Save Search History
    await saveSearchHistory({
      companyName,
      status: "Success",
      responseTime,
    });

    return res.status(201).json({
      success: true,
      message: "Research generated successfully.",
      report,
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    // Save Failed History
    await saveSearchHistory({
      companyName,
      status: "Failed",
      responseTime,
    });

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Search History
const getHistory = async (req, res) => {
  try {
    const history = await CompanyStatus
      .find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const historyItem = await CompanyStatus.findByIdAndDelete(req.params.id);

    if (!historyItem) {
      return res.status(404).json({
        success: false,
        message: "History item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "History item deleted successfully.",
      data: historyItem,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createResearch,
  getHistory,
  deleteHistory,
};
