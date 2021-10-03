const userSearchAuth = (req, res, next) => {
    const { query, page } = req.body;

    if(typeof(query) !== 'string') {
        return res.json({status: 'error', msg: 'Search query must be string type'});
    }
    if(typeof(page) !== 'number' || page % 1 !== 0 || page < 0) {
        return res.json({status: 'error', msg: 'Invalid page number'});
    }

    const queryArray = query.split(' ');
    const filteredQuery = queryArray.filter(elem => elem !== ' ' && elem !== '');

    const regexString = filteredQuery.join(' ');
    const regex = new RegExp(regexString, 'i');

    res.locals = { regex, page };
    next();
}

module.exports = userSearchAuth;