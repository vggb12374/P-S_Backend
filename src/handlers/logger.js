import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "./response.js";
import { resolve } from "path";


const writeLogData = (data) => {
    console.log(data);
    fs.appendFileSync(resolve("src/logs"), data + "\n");
}

const writeErrorData = (data) => {
    console.error(data);
    fs.appendFileSync(resolve("src/logs"), data);
}

/**
 * 
 * @param {*} target any
 * @param {*} propertyKey string
 * @param {*} descriptor PropertyDescriptor
 * @returns 
 */
export const logger = (originalMethod) => {
    return async function (req, res, next) {
        try {
            const before = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
            writeLogData(before);

            const result = await originalMethod(req, res, next);

            const after = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode}`;
            writeLogData(after);
            return result;
        } catch (error) {
            const errorMsg = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${error.message}`;
            writeErrorData(errorMsg);

            return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    };
}