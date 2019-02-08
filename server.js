const express = require('express');

const port=3000;

var bodyParser = require('body-parser');

var path = require('path');

var fs=require('fs');

var data=fs.readFileSync('data.json');

var words=JSON.parse(data);

const { check, validationResult } = require('express-validator/check');

var app=express();


var errors=null;
var amount=0;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'images')));

app.get('/',function(req,res){
res.render('index',{
    words: words,
    data:' ',
    errors:' '
});
});

app.post('/result',[

    check('name').isLength({ min: 3 }),

    check('email').isEmail()

],(req,res)=>{
    const errors = validationResult(req);
    
    
    if (!errors.isEmpty()) 
      {
           res.render('index',{
            words: words,
            data:' ',
            errors:"Enter valid name and email address"
        });
    }
      
      else
      {
    console.log('form submitted');
    const otherData = req.body;
    
    Object.keys(otherData).forEach(function(key){
        if (key != "name" && key!="email")
        {
            console.log("You Ordered: " + key + " ,Price: " + (words.find(item=>item.name===key)).price);
            var fare=(words.find(item=>item.name===key)["price"]);
            amount+=fare;
       
        }
       });

       name=req.body.name;
       email=req.body.email;

       res.render('index',{
       words:words,
       data: name+" your total bill is $"+amount,
       errors: '' 
  
});

        amount=0;
      }
});

    app.listen(port,function(){
    console.log('Server started on port ...');
});

