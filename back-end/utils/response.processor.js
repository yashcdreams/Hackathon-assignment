const sendResponse = (req, res, statusCode, message, data) => {
  res.status(statusCode);
  res.send({ message, data });
};

export default sendResponse;
