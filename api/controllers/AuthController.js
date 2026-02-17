const bcrypt = require("bcrypt");

const loginHandle = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect("/register");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.redirect("/");
    }

    req.session.userId = user.id;

    // redirect to dashboard
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);

    return res.redirect("/");
  }
};

const registerHandle = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.redirect("/register");
    }

    const alreadyExist = await User.findOne({ email });

    if (alreadyExist) {
      return res.redirect("/register");
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    }).fetch();

    await Account.create({
      name: "Default Account",
      owner: newUser.id,
    });

    return res.redirect("/");
  } catch (error) {
    // console.log(error);
    return res.redirect("/register");
  }
}

const logout = async (req,res) => {

 req.session.destroy((e) => {
  if(e){
    console.log(e);
    return res.redirect('/dashboard')
  }
 });

 return res.redirect('/');

}


module.exports = {
  loginHandle,
  registerHandle,
  logout
};
