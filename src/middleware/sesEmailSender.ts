import distTypes = require("@aws-sdk/client-ses");

const sesClient = new distTypes.SESClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_kEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY!,
  },
});
const sendEmail = async (to: string, subject: string, body: string) => {
  const command = new distTypes.SendEmailCommand({
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.SES_FROM_EMAIL!, // must be verified in SES
  });
  await sesClient.send(command);
};
module.exports = sendEmail;
