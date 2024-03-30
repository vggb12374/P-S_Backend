import { getReasonPhrase } from "http-status-codes";


/**
 * 
 * @param {*} res 
 * @param {*} status 
 * @param {*} message 
 * @param {*} data 
 * @returns 
 */
export const sendResponse = (
  res,
  status,
  message = "",
  data = null
) => {
  return res.status(status).json({
    message: message || getReasonPhrase(status),
    data,
  });
};

export const sendStatusResponse = (
  res,
  status,
  message = "",
  dataStatus
) => {
  return sendResponse(res, status, message, { status: dataStatus });
}