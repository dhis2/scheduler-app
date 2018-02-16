const getErrorMessage = result => {
    if (result.response && result.response.errorReports && result.response.errorReports.length > 0) {
        return result.response.errorReports[0].message;
    }

    if (result && result.errorReports && result.errorReports.length > 0) {
        return result.errorReports[0].message;
    }

    return result.message;
};

export default getErrorMessage;
