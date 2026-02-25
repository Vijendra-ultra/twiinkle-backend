require("dotenv").config();
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const EmailVerification = require("supertokens-node/recipe/emailverification");
// const sendEmail = require("../config/supertokensconfig");
const sesEmailSender = require("../middleware/sesEmailSender");
const passwordResetEmailTemplate = require("../email/templates/passwordReset");
const verificationEmailTemplate = require("../email/templates/emailVerification");
// type user = {
//   id: string;
//   email: string;
// };
// type sesEmailInput = {
//   email: string;
//   user: user;
//   type: "PASSWORD_RESET" | "EMAIL_VERIFICATION";
//   passwordResetLink?: string;
//   emailVerifyLink?: string;
// };
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
      emailDelivery: {
        //@ts-ignore
        override: (originalImplementation) => {
          return {
            ...originalImplementation,
            sendEmail: async (input: any) => {
              const { user, type } = input;
              if (type === "PASSWORD_RESET") {
                await sesEmailSender(
                  user.email,
                  "Reset your password",
                  passwordResetEmailTemplate(input.passwordResetLink),
                );
              }
            },
          };
        },
      },
    }),
    EmailVerification.init({
      mode: "REQUIRED",

      emailDelivery: {
        //@ts-ignore
        override: (originalImplementation) => {
          console.log("Override is being reached");
          return {
            ...originalImplementation,
            sendEmail: async (input: any) => {
              console.log("Verification sendEmail called", input.user.email);
              console.log(input.type);
              if (input.type === "EMAIL_VERIFICATION") {
                console.log("Email verification being reached");
                const res = await sesEmailSender(
                  input.user.email,
                  "Verify your mail",
                  verificationEmailTemplate(input.emailVerifyLink),
                );
                console.log("Ses res", res);
              }
            },
          };
        },
      },
    }),
    Session.init(),
  ],
};
module.exports = { supertokensConfig };
