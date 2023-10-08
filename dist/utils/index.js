"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberCreditUse = exports.handleError = exports.makePaging = exports.getParamsPagination = exports.getFileExtension = exports.getFileName = exports.formatedResponse = void 0;
const common_1 = require("@nestjs/common");
const formatedResponse = (data) => {
    const id = data._id.toString() || data.id;
    const dataFormated = { ...data, id };
    delete dataFormated['_id'];
    delete dataFormated['__v'];
    return dataFormated;
};
exports.formatedResponse = formatedResponse;
const getFileName = (path) => {
    return path.replace(/\.[0-9a-z]+$/i, '');
};
exports.getFileName = getFileName;
const getFileExtension = (path) => {
    return path.match(/\.[0-9a-z]+$/i)[0];
};
exports.getFileExtension = getFileExtension;
const getParamsPagination = (args) => {
    const limit = args?.limit || 10;
    const page = args?.page || 1;
    const skip = (page - 1) * limit;
    return { skip, limit, page };
};
exports.getParamsPagination = getParamsPagination;
const makePaging = (items, totalItems, params) => {
    return {
        items,
        totalItems,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(totalItems / params.limit),
        paging: false,
    };
};
exports.makePaging = makePaging;
const handleError = (error) => {
    const { message, response } = error;
    const status = error?.status || response?.status || error?.statusCode;
    if (message && status) {
        throw new common_1.HttpException(message, status);
    }
    else
        throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
};
exports.handleError = handleError;
exports.numberCreditUse = {
    AI_ART: 5,
    ENHANCE: 4,
    REMOVE_BACKGROUND: 3,
    CROP: 2,
};
//# sourceMappingURL=index.js.map