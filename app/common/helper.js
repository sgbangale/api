const helper = {
    entityView: async (condition, entity) => {
        if (condition) {
            try {
                let count = await entity.where(condition.filters)
                .sort(condition.sortFields)
                .count();

                    let result = await entity.where(condition.filters).select(condition.removeColumns)
                    .sort(condition.sortFields)
                    .skip(condition.first).limit(condition.rows);
                    
                    return {
                        data: result,
                        count: count
                    }
            } catch (e) {
               
throw e;
            }
        }

    },
    requestParser: (req) => {
        return {
            request_type: req.query.request_type,
            request_intiator: req.LoggedInUser.user_name,
            request_data: req.body.request_data,
            request_api_url: req.originalUrl,
            request_created_date: Date.now(),
            request_status: 'CREATED',
            request_callback_url: req.originalUrl,
            request_comments: req.headers['request_comments']
        }
    },
    requestGetByIdParser: (req) => {
        return {
            request_type: req.query.request_type,
            request_intiator: req.LoggedInUser.user_name,
            request_data: {
                filters:{ _id: req.query.id},
                sortFields:'',
                first:0,
                rows:1
            } ,
            request_created_date: Date.now(),
            request_status: 'CREATED'
        }
    },
    respondMaker: (errorMessage,body,isSucess) => {
        return {
            message: errorMessage,
            body : body,
            isSucess :isSucess
        }
    }
}
module.exports = helper;