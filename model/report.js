const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    overview: {
      summary: {
        type: String,
        default: "",
      },
      industry: {
        type: String,
        default: "",
      },
      scale: {
        type: String,
        default: "",
      },
      geographicPresence: [
        {
          type: String,
        },
      ],
    },

    businessInformation: {
      majorOfferings: [
        {
          type: String,
        },
      ],
      recentDevelopments: [
        {
          type: String,
        },
      ],
      expansionPlans: [
        {
          type: String,
        },
      ],
      importantPublicInformation: [
        {
          type: String,
        },
      ],
    },

    businessChallenges: [
      new mongoose.Schema(
        {
          title: String,
          description: String,
          reasoning: String,
        },
        { _id: false }
      ),
    ],

    aiOpportunities: [
      new mongoose.Schema(
        {
          department: String,
          problem: String,
          solution: String,
          expectedImpact: String,
        },
        { _id: false }
      ),
    ],

    ceoPitch: {
      subject: {
        type: String,
        default: "",
      },
      introduction: {
        type: String,
        default: "",
      },
      opportunities: {
        type: String,
        default: "",
      },
      recommendations: {
        type: String,
        default: "",
      },
      conclusion: {
        type: String,
        default: "",
      },
    },

    sources: [
      new mongoose.Schema(
        {
          title: String,
          url: String,
        },
        { _id: false }
      ),
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Report", reportSchema);