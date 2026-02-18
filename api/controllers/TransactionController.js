module.exports = {
  viewTansaction: async (req, res) => {
    try {
      const userId = req.session.userId;

      if (!userId) {
        return res.redirect("/");
      }
      // console.log(req.params)

      const { accountId } = req.params;
      // console.log(accountId)

      const transaction = await Transaction.find({
        account: accountId,
      })
        .populate("account")
        .sort("createdAt DESC");

      return res.view("pages/transaction", { accountId, transaction });
    } catch (e) {
      console.log(e);
    }
  },

  addTransaction: async (req, res) => {
    try {
      // console.log(req.body)
      const { amount, type, category } = req.body;
      const accountId = req.params.accountId;

      await Transaction.create({
        amount,
        type,
        category,
        account: accountId,
      });

      return res.redirect("/transaction/" + accountId);
    } catch (e) {
      console.log(e);
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.redirect("/");
      }

      const transactionId = req.params.tId;
      // console.log(transactionId)

      const transaction = await Transaction.findOne({
        id: transactionId,
      });
      // console.log(transaction)
      await Transaction.destroyOne({
        id: transactionId,
      });

      return res.redirect("/transaction/" + transaction.account);
    } catch (e) {
      console.log(e);
    }
  },

  editTransacton: async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.redirect("/");
      }

      const { tId } = req.params;
      const { amount, type, category } = req.body;

      const transaction = await Transaction.updateOne({
        id: tId,
      }).set({
        amount,
        type,
        category,
      });

      return res.redirect("/transaction/" + transaction.account);
    } catch (e) {
      console.log(e);
    }
  },
};
