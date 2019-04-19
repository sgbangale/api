const _ = require("lodash");
const helper = {
  entityView: async (req, db) => {
    if (req.request_data) {
      try {
        let count = await db
          .where(req.request_data.filters)
          .sort(req.request_data.sortFields)
          .count();

        let result = await db
          .where(req.request_data.filters)
          .select(req.request_data.removeColumns)
          .sort(req.request_data.sortFields)
          .skip(req.request_data.first)
          .limit(req.request_data.rows == 0 ? count : req.request_data.rows);

        return {
          data: await result,
          count: await count
        };
      } catch (e) {
        throw e;
      }
    }
  },
  requestParser: req => {
    return {
      request_type: req.query.request_type,
      request_intiator: req.LoggedInUser.user_name,
      request_initiator_role_code: req.LoggedInUser.role_code,
      entity_access_code: req.all_access,
      request_data: req.body.request_data,
      request_api_url: req.originalUrl,
      request_created_date: Date.now(),
      request_status: "CREATED",
      request_callback_url: req.originalUrl,
      request_comments: req.headers["request_comments"]
    };
  },
  requestGetByIdParser: req => {
    return {
      request_type: req.query.request_type,
      request_intiator: req.LoggedInUser.user_name,
      request_initiator_role_code: req.LoggedInUser.role_code,
      entity_access_code: req.all_access,
      request_data: {
        filters: {
          _id: req.query.id
        },
        sortFields: "",
        first: 0,
        rows: 1
      },
      request_created_date: Date.now(),
      request_status: "CREATED"
    };
  },
  respondMaker: (errorMessage, body, isSucess) => {
    return {
      message: errorMessage,
      body: body,
      isSucess: isSucess
    };
  }
};
module.exports = helper;
