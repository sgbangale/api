const entity = require('../models/entity'),
    entityAccess = require('../models/entityAccess'),
    fs = require('fs'),
    viewHelper = require('../../common/helper'),
    util = require('util');

const helper = {
    generate_modelFile: (entityData) => {
        let schemaData = JSON.stringify(entityData.entity_schema)
            .replace(/"String"/g, 'String')
            .replace(/"Date"/g, 'Date')
            .replace(/"Number"/g, 'Number')
            .replace(/"Boolean"/g, 'Boolean')
            .replace(/"Boolean"/g, 'Boolean')
            .replace(/"Mixed"/g, 'mongoose.Schema.Types.Mixed')
            .replace(/""/g, ' ');

        const fileContent =
            `
        const mongoose = require('mongoose');
        mongoose.model('` + entityData.entity_code + `', mongoose.Schema(` + schemaData + `));
        module.exports = mongoose.model('` + entityData.entity_code + `');`;
        let filePath = require('../../models').getPath() + '\\' + entityData.entity_code + '.js';
        fs.writeFileSync(filePath, fileContent)
    },
    generate_accessCodeFile: (accessCodes) => {
        let result = '';
        accessCodes.forEach(element => {
            result = result + element.entity_access_js;
        });
        return result;
    },
    code_delete: (ecode) => {
        let jscode = `  bal.${ecode}__delete = async (req)=>
        {
            const ${ecode} = require('../models/${ecode}');
            console.log('delete');
            return await ${ecode}.delete(req.request_data);
        };`

        return {
            entity_code: ecode,
            entity_access_code: `${ecode}__delete`,
            entity_access_js: jscode,
            entity_access_active: false
        };
    },
    code_view: (ecode) => {
        let jscode = `  bal.${ecode}__view = async (req)=>
        {
            return await helper.entityView(req.request_data,require('../models/${ecode}'));
        };`

        return {
            entity_code: ecode,
            entity_access_code: `${ecode}__view`,
            entity_access_js: jscode,
            entity_access_active: false
        };
    },
    code_create: (ecode) => {
        let jscode = `  bal.${ecode}__create = async (req)=>
        {
            const ${ecode} = require('../models/${ecode}');
            console.log('create');
            return await ${ecode}.create(req.request_data);
        };`

        return {
            entity_code: ecode,
            entity_access_code: `${ecode}__create`,
            entity_access_js: jscode,
            entity_access_active: false
        };
    },
    generate_accessCode: (accessCodes, ecode) => {
        let result = [];
        console.log(ecode);
        result.push(helper.code_create(ecode));
        result.push(helper.code_delete(ecode));
        result.push(helper.code_view(ecode));

        accessCodes.forEach(element => {
            let jscode = `  bal.${element} = async (req)=>
            {
                console.log('${element}');
                return await req;
            };`

            let entityaccess = {
                entity_code: ecode,
                entity_access_code: element,
                entity_access_js: jscode,
                entity_access_active: false
            };
            result.push(entityaccess);
        });
        return result;
    },

    generate_accessFile: async (entity, entity_access) => {
        const filePath = require('../../businessLogic').getPath() + '\\bal.js';
        try {
            let fileContent = await (util.promisify(fs.readFile))(filePath, {
                encoding: 'UTF-8'
            });
            let accessCode = `
        ${await helper.generate_accessCodeFile(entity_access,entity.entity_code)}
        module.exports = bal;
        `;
            let updatedFileContent = fileContent.toString().replace('module.exports = bal;', accessCode);
            fs.writeFileSync(filePath, updatedFileContent);
        } catch (e) {
            throw e;
        }
    }

}




module.exports = {
    entityaccess__view : async (req)=>
        {  
            return await viewHelper.entityView(req.request_data,require('../models/entityAccess'));
        },
    entity__create: async (req) => {
        console.log(req.request_data);
        let accessdata = helper.generate_accessCode(req.request_data.entity_access, req.request_data.entity_code);
        let [res1, res2] = await Promise.all([await entity.create(req.request_data), await entityAccess.create(accessdata)]);
        return res1;
    },
    entity__build: async (req) => {
        let [res1, res2] = await Promise.all([
            await entity.findById(req.request_data.entityId),
            await entityAccess.find({
                entity_code: req.request_data.entity_code
            })
        ]);

        if (res1) {
            helper.generate_modelFile(res1);
            if (res2) {
                helper.generate_accessFile(res1, res2)
            }
        }
    }
};