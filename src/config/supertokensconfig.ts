// import sendEmail = require("supertokens-node/recipe/emailverification");

require("dotenv").config();
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const EmailVerification = require("supertokens-node/recipe/emailverification");
// const sendEmail = require("../config/supertokensconfig");
const sesEmailSender = require("../middleware/sesEmailSender");
const passwordResetEmailTemplate = require("../email/templates/passwordReset");
const verificationEmailTemplate = require("../email/templates/emailVerification");
type user = {
  email: string;
};
type sesEmailInput = {
  email: string;
  user: user;
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
        apis: (originalImplementation) => ({
          ...originalImplementation,
          signUpPOST: async (input: sesEmailInput) => {
            const response = await originalImplementation.signUpPOST!(input);
            if (response.status === "OK") {
              console.log("Signup success, triggering verification email...");

              await EmailVerification.sendEmailVerificationEmail(
                "public",
                response.user.id,
                response.user.emails,
              );
            }
            return response;
          },
        }),
      },
      emailDelivery: {
        //@ts-ignore
        override: (originalImplementation) => {
          return {
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
            sendEmail: async (input: sesEmailInput) => {
              console.log("Verification sendEmail called", input.user.email);
              console.log(input.type);
              if (input.type === "EMAIL_VERIFICATION") {
                await sesEmailSender(
                  input.user.email,
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
  ],
};
module.exports = { supertokensConfig };
