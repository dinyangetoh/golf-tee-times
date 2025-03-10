export function sendSuccessApiResponse(res, data, code = 200) {
    return res.status(code).send({
        status: 'success',
        data: data || null,
    });
}
export function sendFailApiResponse(res, message, errors, code = 400) {
    let errorParams = null;
    if (errors?.length) {
        if (typeof errors[0] === 'string') {
            errorParams = errors;
        }
        else {
            errorParams = ['Unknown Error'];
        }
    }
    return res.status(code).send({
        status: 'fail',
        message,
        errors: errorParams,
    });
}
export function sendErrorApiResponse(res, message, code = 400) {
    return res.status(code).send({
        status: 'error',
        message,
    });
}
//# sourceMappingURL=apiResponse.js.map