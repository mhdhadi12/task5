"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponse = (success, message, data) => {
    return {
        success,
        message,
        data: data !== null && data !== void 0 ? data : null,
    };
};
exports.default = apiResponse;
