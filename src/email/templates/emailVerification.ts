const verificationEmailTemplate = (LINK: string): string => `
<!DOCTYPE html>
<html>

<body style="margin:0;padding:0;background-color:#000000;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;">
        <tr>
            <td align="center" style="padding:40px 20px;">


                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#000000;">

                    <tr>
                        <td align="center" style="font-family:Arial,Helvetica,sans-serif;
                       color:#ffffff;
                       font-size:26px;
                       font-weight:bold;
                       padding-bottom:20px;">
                            Welcome to Twiinkle
                        </td>
                    </tr>

                    <!-- Main Text -->
                    <tr>
                        <td align="center" style="font-family:Arial,Helvetica,sans-serif;
                       color:#ffffff;
                       font-size:16px;
                       line-height:1.6;
                       padding:0 10px;">
                            Please verify your email address by clicking the button below.
                        </td>
                    </tr>

                    <!-- Button -->
                    <tr>
                        <td align="center" style="padding:30px 0;">
                            <a href="${LINK}" target="_blank" style="display:inline-block;
                        padding:14px 32px;
                        font-size:16px;
                        font-family:Arial,Helvetica,sans-serif;
                        border-radius:50px;
                        background-color:#ffb703;
                        color:#222;
                        text-decoration:none;
                        font-weight:bold;">
                                Verify
                            </a>
                        </td>
                    </tr>


                    <tr>
                        <td align="center" style="font-family:Arial,Helvetica,sans-serif;
                       color:#cccccc;
                       font-size:14px;
                       line-height:1.6;
                       padding:0 10px;">
                            We can’t wait to have you on board!
                        </td>
                    </tr>


                    <tr>
                        <td align="center" style="font-family:Arial,Helvetica,sans-serif;
                       color:#888888;
                       font-size:12px;
                       padding-top:30px;">
                            Don’t reply to this email. Facing any issues?
                            <a href="mailto:vijendravasre66@gmail.com" style="color:#888888;text-decoration:underline;">
                                Contact me
                            </a>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>

</html>`;
module.exports = verificationEmailTemplate;
