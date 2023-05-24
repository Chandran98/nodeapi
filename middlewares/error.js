const { constant } = require("../constants");

const errorhandler = (err, req, res, next) => {
  const statuscode = res.statuscode ? res.statuscode : 500;

  switch (statuscode) {
    case constant.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
      case constant.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });

      break;case constant.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });

      break;case constant.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stackTrace: err.stack,
      });

      break;case constant.VALIDATION_ERROR:
      res.json({
        title: "VALIDATION_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });

      break;

    default:
        console.log("All clear");
      break;
  }
};

module.exports = errorhandler;
