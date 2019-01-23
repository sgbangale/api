const helper = {
    entityView: async (condition, entity) => {
        if (condition) {
            try {
                let count = await entity.where(condition.filters)
                .sort(condition.sortFields)
                .count();

                    let result = await entity.where(condition.filters)
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
    respondMaker: (errorMessage) => {
        return {
            message: errorMessage
        }
    }
}
module.exports = helper;