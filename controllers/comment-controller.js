const { Comment, Pizza } = require('../models');

const commentController = {
    async addComment({params:{pizzaId},body},res) {
        try {
            console.log(body)
            const newComment = await Comment.create(body)
            const commentId = newComment._id
            console.log(commentId )
            const pizza = await Pizza.findOneAndUpdate(
                {_id:pizzaId},
                {$push: {comments: commentId}},
                { new: true}
            )
            if (!pizza) {
                res.status(404).json({message: 'No pizza found with this id!'})
                return
            }
            res.json(pizza)
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    },
    async addReply( {body, params:{commentId} },res){
        try {
            const comment = await Comment.findOneAndUpdate(
                {_id:commentId},
                { $push: {replies:body}},
                {new:true}
            )
            if (!comment) {
                res.status(404).json({message: "ID not found!"})
                return 
            }
            res.json(comment)
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    },
    async removeReply( {params},res) {
        try {
            const comment = await Comment.findOneAndUpdate(
                {_id: params.commentId},
                { $pull: {replies: {replyId: params.replyId}}},
                {new:true}
            )
            if (!comment) {
                res.status(404).json({message: 'No comment found with this id!'})
                return
            }
            res.json(comment)
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    },
    async removeComment({ params: {commentId,pizzaId}}, res) {
        try {
            const comment = await Comment.findOneAndDelete({_id:commentId})
            if (!comment) {
                res.status(404).json({message: 'No comment found with this id!'})
                return
            }
            const pizza = await Pizza.findOneAndUpdate(
                {_id: pizzaId},
                {$pull: { comments: commentId}},
                { new: true}
            )
            if (!pizza) {
                res.status(404).json({message: 'No pizza found with this id!'})
                return
            }
            res.json(pizza)
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    }
};

module.exports = commentController