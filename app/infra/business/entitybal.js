const entity = require("../models/entity"),
  entityAccess = require("../models/entityAccess"),
  fs = require("fs"),
  viewHelper = require("../../common/helper"),
  util = require("util");

const helper = {
  generate_entityAccessFile: async (entityAccessData) => {
    try {
      const fileContent = `
      const helper = require('../common/helper');
      const bal = {};
    
    ` +
        entityAccessData.entity_access_js +
        `
    module.exports = bal;
      `;

      let filePath = require("../../businessLogic").getPath() + "\\" + entityAccessData.entity_access_code + ".js";
      fs.writeFileSync(filePath, fileContent);

      const filePathIndex = require("../../businessLogic").getPath() + "\\index.js";
      let fileContentIndex = await util.promisify(fs.readFile)(filePathIndex, {
        encoding: "UTF-8"
      });
      let updatedFileContent = fileContentIndex
        .toString().replace(",}", `,...require('./${entityAccessData.entity_access_code}'),}`);
      fs.writeFileSync(filePathIndex, updatedFileContent);
    } catch (e) {
      throw e;
    }
  },

  generate_modelFile: entityData => {
    let schemaData = JSON.stringify(entityData.entity_schema)
      .replace(/"String"/g, "String")
      .replace(/"Date"/g, "Date")
      .replace(/"Number"/g, "Number")
      .replace(/"Boolean"/g, "Boolean")
      .replace(/"Mixed"/g, "mongoose.Schema.Types.Mixed")
      .replace(/""/g, " ");

    const fileContent =
      `
        const mongoose = require('mongoose');
        mongoose.model('` +
      entityData.entity_code +
      `', mongoose.Schema(` +
      schemaData +
      `));
        module.exports = mongoose.model('` +
      entityData.entity_code +
      `');`;
    let filePath =
      require("../../models").getPath() + "\\" + entityData.entity_code + ".js";
    fs.writeFileSync(filePath, fileContent);
  },
  code_delete: ecode => {
    let jscode = `  bal.${ecode}__delete = async (req)=>
        {
            const ${ecode} = require('../models/${ecode}');
            console.log('delete');
            return await ${ecode}.delete(req.request_data);
        };`;

    return {
      entity_code: ecode,
      entity_access_code: `${ecode}__delete`,
      entity_access_js: jscode,
      entity_access_active: false
    };
  },
  code_view: ecode => {
    let jscode = `  bal.${ecode}__view = async (req)=>
        {
            return await helper.entityView(req.request_data,require('../models/${ecode}'));
        };`;

    return {
      entity_code: ecode,
      entity_access_code: `${ecode}__view`,
      entity_access_js: jscode,
      entity_access_active: false
    };
  },
  code_create: ecode => {
    let jscode = `  bal.${ecode}__create = async (req)=>
        {
            const ${ecode} = require('../models/${ecode}');
            console.log('create');
            return await ${ecode}.create(req.request_data);
        };`;

    return {
      entity_code: ecode,
      entity_access_code: `${ecode}__create`,
      entity_access_js: jscode,
      entity_access_active: false
    };
  },
  generate_accessCode: (ecode) => {
    let result = [];
    console.log(ecode);
    result.push(helper.code_create(ecode));
    result.push(helper.code_delete(ecode));
    result.push(helper.code_view(ecode));
    return result;
  }
}

module.exports = {
  entityaccess__view: async req => {
    return await viewHelper.entityView(
      req,
      require("../models/entityAccess")
    );
  },
  entity__view: async req => {
    return await viewHelper.entityView(
      req,
      require("../models/entity")
    );
  },
  entityaccess__create: async req => {
    const entityAccess = require("../models/entityAccess");
    console.log("create");

    if (req.request_data._id) {
      return await entityAccess.update({
        _id: req.request_data._id
      }, req.request_data);
    } else {
      delete req.request_data._id;
      return await entityAccess.create(req.request_data);
    }
  },
  entity__create: async req => {
    let accessdata = helper.generate_accessCode(
      req.request_data.entity_code
    );
    if (accessdata) {
      let columns = Object.keys(req.request_data.entity_schema);
      accessdata.forEach(value => {
        value.entity_schema_access = columns;
      });
    }

    req.request_data.entity_build = false;
    if (req.request_data._id) {
      return await entity.update({
        _id: req.request_data._id
      }, req.request_data);
    } else {
      delete req.request_data._id;
      let [res1, res2] = await Promise.all([
        await entity.create(req.request_data),
        await entityAccess.create(accessdata)
      ]);
      return res1;
    }
  },
  entity__build: async req => {

    let res1 = await entity.findOneAndUpdate({
      _id: req.request_data.entityId
    }, {
      entity_build: true
    });
    if (res1) {
      helper.generate_modelFile(res1);
    }
  },
  entityaccess__build: async req => {
    let res1 = await entityAccess.findOneAndUpdate({
      _id: req.request_data.entityAccessId
    }, {
      entity_access_build: true
    });
    if (res1) {
      helper.generate_entityAccessFile(res1);
    }
  }
};