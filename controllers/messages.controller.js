function getMessages(req, res) {
    res.send('<ul><li>hello.... </li></ul>');
}

function postMessages(req, res) {
    res.send('<ul><li>updating messages.... </li></ul>');
}

module.exports = {
    getMessages,
    postMessages,
}