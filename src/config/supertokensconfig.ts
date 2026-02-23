require("dotenv").config();
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const EmailVerification = require("supertokens-node/recipe/emailverification");
// const sendEmail = require("../config/supertokensconfig");
const sesEmailSender = require("../middleware/sesEmailSender");
const passwordResetEmailTemplate = require("../email/templates/passwordReset");
const verificationEmailTemplate = require("../email/templates/emailVerification");

type sesEmailInput = {
  email: string;
  user: string;
  type: "PASSWORD_RESET" | "EMAIL_VERIFICATION";
  passwordResetLink?: string;
  emailVerifyLink?: string;
};
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
  recipeList: [
    EmailPassword.init({
      override: {
        //@ts-ignore
        emailDelivery: (originalImplementation) => {
          return {
            //@ts-ignore
            ...originalImplementation,
            sendEmail: async (input: sesEmailInput) => {
              const { email, type } = input;
              if (type === "PASSWORD_RESET") {
                await sesEmailSender(
                  email,
                  "Reset your password",
                  passwordResetEmailTemplate(input.passwordResetLink),
                );
              }
              if (type === "EMAIL_VERIFICATION") {
                await sesEmailSender(
                  email,
                  "Verify your mail",
                  verificationEmailTemplate(input.emailVerifyLink),
                );
              }
            },
          };
        },
      },
    }),
    Session.init(),
    EmailVerification.init({ mode: "REQUIRED" }),
  ],
};
module.exports = { supertokensConfig };
