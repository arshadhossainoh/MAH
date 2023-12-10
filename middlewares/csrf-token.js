function addCsrfToken(req, res, next){
    res.locals.csrfToken = req.csrfToken();
    // next means move to next middeleware or route handler in line 
    next();
}

module.exports = addCsrfToken;
