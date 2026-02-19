const express = require("express");
const cors = require("cors");
const supertokens = require("supertokens-node");
const { supertokensConfig } = require("./config/supertokensconfig");
const customErrorHandler = require("./middleware/errorHandler");
const {
  middleware,
  errorHandler,
} = require("supertokens-node/framework/express");

supertokens.init(supertokensConfig);

const app = express();
app.use(cors({ origin: process.env.WEBSITE_DOMAIN, credentials: true }));
app.use(express.json());
app.use(middleware());

app.use(errorHandler());
app.use(customErrorHandler);
module.exports = app;
