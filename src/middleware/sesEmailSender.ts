import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_kEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY!,
  },
});
const sesEmailSender = async (to: string, subject: string, body: string) => {
  try {
    const command = new SendEmailCommand({
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
    const response = await sesClient.send(command);
    console.log("Email sent successfully", response.MessageId);
  } catch (err) {
    console.log("Ses email verified", err);
    throw err;
  }
};
export default sesEmailSender;
