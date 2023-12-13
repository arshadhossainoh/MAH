const User = require('../models/user.model')
const authUtil = require('../util/authentication')

function getSignup(req, res) {
  res.render('customer/auth/signup');
}
// express cant catch error happens inside asynchoros function
async function signup(req, res, next){
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
    );
    try{
      await user.signup();
    }catch(error){
      // by next(error), the default errorhandler will be active, in our case 500 template
       next(error);
       return;
    }
    

    res.redirect('/login');
}

function getLogin(req, res) {
  res.render('customer/auth/login')
}

async function login(req, res, next){
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  // now the problem is existingUser is restricted to only try block
  // we need to use existinguser down the road 
  // in order to make it available outer block declare variable outside like let existinguser
  try{
    existingUser = await user.getUserwithSameEmail();
  }catch(error){
    next(error);
    return;
  }
  

  if (!existingUser){
    res.redirect('/login');
    return;
  }
  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

  if(!passwordIsCorrect){
    res.redirect('/login');
    return;
  }
  authUtil.createUserSession(req, existingUser, function(){
    res.redirect('/');
  });


}

function logout(req, res){
  authUtil.destroyUserAuthSession(req);
  res.redirect('/login')
}
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout
};
