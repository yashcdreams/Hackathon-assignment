import nodemailer from "nodemailer";
import sendResponse from "./response.processor";
import logger from "./logger";
import { FORBIDDEN, OK } from "./launchpad.constants";

export const sendMail = async (
  req,
  res,
  receiverMailId,
  mailSubject,
  mailHtml
) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject) {
      return sendResponse(req, res, FORBIDDEN, "To and Subject are required");
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ivory.barton67@ethereal.email",
        pass: "1qPeKX1rCRr1FDB41b",
      },
    });

    const mail = await transporter.sendMail({
      from: '"Testing" <chauhanyash2412@gmail.com>',
      to: receiverMailId,
      subject: mailSubject,
      html: mailHtml,
    });

    console.log("Message sent: %s", mail.messageId);
    logger.info("send mail...");
    sendResponse(req, res, OK, "email sent successfully", mail);
  } catch (error) {
    logger.error(error);
    sendResponse(req, res, FORBIDDEN, "not a valid email");
  }
};
