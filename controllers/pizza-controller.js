const { Pizza } = require('../models');

const pizzaController = {
    async getAllPizza(req,res) {
        try {
            const pizzaData = await Pizza.find({})
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
    async updatePizza({ params:{id},body }, res) {
        try {
            const pizzaData = await Pizza.findOneAndUpdate({_id:id},body,{new:true})
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