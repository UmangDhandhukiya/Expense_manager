module.exports = {

  getAccount: async function(req, res){

    try{
      const userId = req.session.userId;
      if(!userId){
        return res.redirect("/")
      }
      const accounts = await Account.find({
        owner: userId
      });

      return res.view(
        'pages/homepage',
        { accounts }
      );
    }
    catch(err){
    //   console.log(err);
      return res.redirect('/dashboard');
    }
  },

  createNewAccount: async (req,res) => {
    try{
        // console.log(req.body)
        const {name} = req.body
        const userId = req.session.userId;

        await Account.create({
            name,
            owner: userId
        })

        return res.redirect('/dashboard')
    }catch(err){ 
        return res.redirect('/dashboard')
    }
  },

  deleteAccount: async(req,res) => {
    try{
        // console.log(req.params)
        const accountId = req.params.id
        const userId = req.session.userId

        // console.log(accountId)
        await Account.destroyOne({
            id: accountId,
            owner: userId
        })

        return res.redirect('/dashboard')

    }catch(err){
        console.log(err);
    }
  },

  editAccount: async(req,res) => {
    try{

    const userId = req.session.userId

    if(!userId){
      return res.redirect('/');
    }

    const {id} = req.params
    const { name } = req.body;

    await Account.updateOne({
      id: id,
      owner: userId
    }).set({
      name : name
    });
    return res.redirect('/dashboard');
  }
  catch(err){
    console.log(err);
    return res.redirect('/dashboard');

  }
  }
};
