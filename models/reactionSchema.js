const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const reactionSchema = {

    reactionid: {

        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: () => moment().format(MM / DD / YYYY)

    },

}
module.exports = reactionSchema;