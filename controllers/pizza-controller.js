const { Pizza } = require('../models');

const pizzaController = {
    async getAllPizza(req,res) {
        try {
            const pizzaData = await Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            res.json(pizzaData)
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    },
    async getPizzaById({ params }, res) {
        try {
            const pizzaData = await Pizza.findOne({_id:params.id})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            if (!pizzaData) {
                    res.status(404).json({message: 'No pizza found with this id!'})
                    return
                }
                res.json(pizzaData)
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    },
    async createPizza({ body }, res) {
        try {
            const pizzaData = await Pizza.create(body)
            res.json(pizzaData)
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    },
    async updatePizza({ params:{id}, body }, res) {
        try {
            const pizzaData = await Pizza.findOneAndUpdate({_id:id},body,{new:true, runValidators: true})
            if (!pizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(pizzaData)
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    },
    async deletePizza({ params:{id} }, res) {
        try {
            const pizzaData = await Pizza.findOneAndDelete({_id:id})
            if (!pizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(pizzaData)

        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    }
};

module.exports = pizzaController;