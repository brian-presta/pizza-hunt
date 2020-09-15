const moment = require('moment');
const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    writtenBy: {type:String},
    commentBody: {type:String},
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
});

const Comment = model('Comment',CommentSchema)

module.exports = Comment