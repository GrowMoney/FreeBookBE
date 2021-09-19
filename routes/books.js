var express = require('express');
var router = express.Router();

var db = require('../auth/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAllBook', function(req, res, next) {
  var resData = {status : '' ,result : ''}
  try { 
    const action = async()=>{  
      const snap=await db.collection('books').get();
      var data=  []
      snap.forEach((doc)=>{
        data.push({...doc.data(),'id' : doc.id})
      })
      resData['status'] = 'Y'
      resData['result'] = data
      res.send(resData); 
    }
    action()
  } catch (error) {
    resData['status'] = 'N'
    res.send(resData); 
  }
});

router.get('/getBook', function(req, res, next) {
  var resData = {status : '' ,result : ''}
  var body = req.body['requestParam']
  try { 
    const action = async()=>{  
      if(body.length < 1) throw "Missing Body"
      var refBooks = db.collection('books')
      var snap = null;
      for(var i = 0 ; i < body.length ; i++){
        var obj = body[i]
        var condition = obj['condition']
        var field = obj['field']
        var value = obj['value']
        snap= await refBooks.where(field,condition,value).get();
      }
      var data=  []
      snap.forEach((doc)=>{
        data.push({...doc.data(),'id' : doc.id})
      })
      resData['status'] = 'Y'
      resData['result'] = data
      res.send(resData); 
    }
    action()
  } catch (error) {
    resData['status'] = 'N'
    res.send(resData); 
  }
});

router.post('/insertSingleBook', function(req, res, next) {
  var resData = {status : '' ,result : ''}
  try {
    const action = async()=>{
      const refBooks=await db.collection('books').add(req.body['requestParam'])  
      resData['status'] = 'Y'
      resData['result'] = 'Success add data'
      res.send(resData); 
    }
    action()
  } catch (error) {
    resData['status'] = 'N'
    res.send(resData); 
  }
});

router.post('/insertBatchBooks', function(req, res, next) {
  var resData = {status : '' ,result : ''}
  try {
    const action = async()=>{
      var body =req.body['requestParam']
      if(body.length < 1 ) throw "Body is missing"
      for(var i = 0 ; i < body.length ;i++){
        var obj = body[i]
        const refBooks=await db.collection('books').add(obj)  
      }
      resData['status'] = 'Y'
      resData['result'] = 'Success add data'
      res.send(resData); 
    }
    action()
  } catch (error) {
    resData['status'] = 'N'
    resData['result'] = error?error : ''
    res.send(resData); 
  }
});

router.delete('/deleteBook', function(req, res, next) {
  var resData = {status : '' ,result : ''}
  try {
    const action = async()=>{
      var body =req.body['requestParam']
      if(body['id']){
        const refBooks=await db.collection('books').doc(body['id']).delete();
        resData['status'] = 'Y'
        resData['result'] = 'Success delete data'
        res.send(resData); 
      }
      else{
        resData['status'] = 'N'
        resData['result'] = 'Missing Parameter'
        res.send(resData); 
      }
    }
    action()
  } catch (error) {
    resData['status'] = 'N'
    res.send(resData); 
  }
});

router.delete('/deleteBatchBooks', function(req, res, next) {
  var resData = {status : '' ,result : ''}
  try {
    const action = async()=>{
      var body =req.body['requestParam']
      if(body.length > 0){
        var obj = body
        for(var i = 0 ; i < obj.length ;i++){
          var data = obj[i]['id']
          console.log(data)
          const refBooks=await db.collection('books').doc(data).delete();
        }
        resData['status'] = 'Y'
        resData['result'] = 'Success delete data'
        res.send(resData); 
      }
      else{
        resData['status'] = 'N'
        resData['result'] = 'Missing Parameter'
        res.send(resData); 
      }
    }
    action()
  } catch (error) {
    resData['status'] = 'N'
    res.send(resData); 
  }
});

module.exports = router;
