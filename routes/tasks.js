var express = require('express');
var router = express.Router();

const tasks = [
    {id:1, text:'task 1',date:'Jan 3 2:00pm', reminder:false},
    {id:2, text:'task 2',date:'Jan 3 2:00pm', reminder:false},
    {id:3, text:'task 3',date:'Jan 3 2:00pm', reminder:false},
    {id:4, text:'task 44',date:'Jan 3 2:00pm', reminder:false},]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(tasks);
});

module.exports = router;