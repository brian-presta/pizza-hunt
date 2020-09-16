const moment = require('moment');
const { Schema, model, Types } = require('mongoose');

const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        replyBody: {type:String},
        writtenBy: {type: String},
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
          }
    },
    {
        toJSON: {getters: true}
    }
)
const CommentSchema = new Schema(
    {
        writtenBy: {type:String},
        commentBody: {type:String},
        replies: [ReplySchema],
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length
})

const Comment = model('Comment',CommentSchema)

module.exports = Comment