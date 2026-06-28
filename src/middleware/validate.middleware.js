import AppError from "../../utils/AppError.js";

export const validate = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    req.body = parsed.body;
    return next();

  } catch (error) {
    let finalMessage = "Validation Failed";


    if (error.message?.trim().startsWith("[")) {
      try {
        finalMessage = JSON.parse(error.message)[0]?.message || finalMessage;
      } catch (e) { }
    }

    else if (error.errors?.[0]?.message) {
      finalMessage = error.errors[0].message;
    }

    else if (error.message) {
      finalMessage = error.message;
    }

    return next(new AppError(finalMessage, 400));
  }
};