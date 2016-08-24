var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  if(req.method === "GET"){
    return next()
  }
  if(!req.isAuthenticated()){
    return res.redirect('/#login');
  }
  return next();
})

//  Some implementation....
router.route('/posts')
  //returns all posts
  .get(function(req, res){
    //temporary solution
    res.send({message: 'TODO return all posts'})
  })

  .post(function(req, res){
    //temporary solution
    res.send({message: 'TODO Create a new post'})
  });

router.route('/posts/:id')
  //returns a particular post
  .get(function(req,res){
    res.send({message: 'TODO return post with ID ' . req.params.id})
  })

  .put(function(req, res){
    res.send({message: 'TODO modify post with ID ' + req.params.id})
  })

  .delete(function(req, res){
    res.send({message: 'TODO delete post with ID ' + req.params.id})
  })

module.exports = router;
