require("dotenv").config();
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

const supertokensConfig = {
  framework: "express",
  supertokens: { connectionURI: process.env.SUPERTOKENS_CORE_URI },
  appInfo: {
    appName: "Twiinkle",
    apiDomain: process.env.API_DOMAIN,
    websiteDomain: process.env.WEBSITE_DOMAIN,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
};
module.exports = { supertokensConfig };
