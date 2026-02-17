const Transaction = require("../models/Transaction")

module.exports = {
    viewTansaction : async (req,res) => {
        try{
            
        const userId = req.session.userId

        if(!userId){
            return res.redirect('/')
        }

        const accountId = req.params.accountId

        const transaction = await Transaction.find({
            account: accountId
        }).sort('createdAt DESC')

        return res.view('pages/transaction',{accountId,transaction})

        } catch(e){
            console.log(e)
        }
    },

    addTransaction : async(req,res) => {
        try{
            const {amount, type, category, accountId} = req.body

        await Transaction.create({
            amount,
            type,
            category,
            account:accountId
        })

        return res.redirect('/transaction/' + accountId);
        }catch(e){
            console.log(e)
        }
    }
}