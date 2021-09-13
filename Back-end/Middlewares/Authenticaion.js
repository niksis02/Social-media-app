function authentication(req, res, next){
    const {name, surname, email, password, birth, gender} = req.body;
    const year = birth.match(/(?<=-)\d+$/);

    const age = year? new Date().getFullYear() - year: null;

    if(!name || !surname || !email || !password || !age || !gender) {
        return res.json({ status: 'error', msg: 'Enter all the required fields'});
    }
    if(password.length < 6) {
        return res.json( { status: 'error', msg: 'The length of the password should be greater than 6'});
    }
    if(age < 16 || age > 120) {
        return res.json({status: 'error', msg: 'Invalid age'});
    }
    next();
}

module.exports = authentication;