const request = require('../models/request')

const requestBAL = {
    createRequest: async (req) => {
        let result = { ...req
        };
        try {
            if (req.request_type === 'request__view') {
                result.request_output_data = await request.find(req.request_data);
            } else {
                result.request_output_data = await require('../../businessLogic')[req.request_type](req);
            }
            result.request_status = 'FINISHED';
        } catch (e) {
            console.log(e);
            result.request_status = 'FAILED';
            result.request_output_data = e;
        }

        return result;
    },
    viewRequest: async (requestData) => {
        try {
            return await request.find(requestData)
        } catch {
            return null;
        }
    },
    deleteEntity: (requestData) => {

    }
}


module.exports = requestBAL;