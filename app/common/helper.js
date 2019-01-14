const helper ={

    requestParser: (req)=> {
        return   {
            request_type: req.query.request_type,
            //request_intiator: req.decoded.User.EmailAddress,
            request_data: req.body.request_data,
            request_api_url: req.originalUrl,
            request_created_date: Date.now(),
            request_status: 'CREATED',
            request_callback_url: req.originalUrl,
            request_comments: req.headers['request_comments']
        }
    }
}
module.exports = helper;