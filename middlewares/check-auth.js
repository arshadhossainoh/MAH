function checkAuthStatus(req, res, next){
  const uid = req.session.uid;

  if(!uid){
    // return next() means if no uid then code below should not be executed
    return next();
  }
  res.locals.uid = uid;
  res.locals.isAuth = true;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuthStatus;