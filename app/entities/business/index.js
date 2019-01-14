const entity = require('../models/entity'),
    fs = require('fs');

const helper = {
    generate_model: (entityData) => {
        var schemaData = JSON.stringify(entityData.entity_schema)
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
        let filePath =require('../../models').getPath() +'\\'+ entityData.entity_code + '.js';        
        fs.writeFileSync(filePath, fileContent)
    },

}

module.exports = {
    entity__create: async (req) => {
        let dbResult = await entity.create(req.request_data)
        console.log(dbResult);
        helper.generate_model(dbResult);
    }




};