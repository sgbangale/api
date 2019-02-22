const request = require('../models/request')
const common = require('../../common/index')
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

        //return result;
        return  common.helper.respondMaker( result.request_status === 'FAILED' ? 'Error Ocurred while processing request.':''  ,result.request_output_data,result.request_status === 'FINISHED' ) ;
    },
    viewRequest: async (requestData) => {
        let result = { ...requestData
        };
        try {
            if (requestData.request_type.indexOf('__view') != -1) {
                result.request_output_data = await require('../../businessLogic')[requestData.request_type](requestData);
            }
            result.request_status = 'FINISHED';
        } catch (e) {
            console.log(e);
            result.request_status = 'FAILED';
            result.request_output_data = e;
        }

        return  common.helper.respondMaker( result.request_status === 'FAILED' ? 'Error Ocurred while processing request.':''  ,result.request_output_data,result.request_status === 'FINISHED' ) ;
    },
    deleteEntity: (requestData) => {

    }
}


module.exports = requestBAL;