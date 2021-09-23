var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator');

const db=require('monk')("localhost:27017/TutorialDB"); //เชื่อมต่อกับฐานข้อมูล

router.get('/', function(req, res,next){
    //res.send('Display All Product');
    res.render("blog");
    //console.log(res);
});

router.get('/add',function(req, res, next){
    res.render("addblog");//view data @file blog.ejs
});

router.post('/add',[
    //เช็คข้อมูลว่ามีการป้อนข้อมุลเข้ามาหรือไม่ ถ้าไม่มีการป้อนข้อมูลเข้ามาให้แสดง Please input your blog message
    check("name","กรุณาระบุชื่อเรื่องของบทความค๊าาา...!").not().isEmpty(),
    check("description","กรุณาระบุรายละเอียดของบทความค๊าาา...!").not().isEmpty(),
    check("author","กรุณาระบุชื่อผู้แต่งค๊าาาาา...!").not().isEmpty()
], function(req, res, next){
       const result=validationResult(req);
       var errors=result.errors;
            if (!result.isEmpty()){
              res.render('addblog',{errors:errors});
            }else{
            //insert to databasewsdsdddddxdxwsaqzXCVBN 
            var collection=db.get('blogs');
            collection.insert({
                name: req.body.name,
                description: req.body.description,
                author: req.body.author
            },function(err,blog){
                if(err){
                    throw res.send(err);
                }else{
                    req.flash("error", "บันทึกบทความเรียบร้อยแล้วค๊าาาา...!");
                    res.location('/blog/add');
                    res.redirect('/blog/add');
                }
            });

        }
/*
    //รับข้อมูลจาก form body
    let name=req.body.name;
    let description=req.body.description;
    let fname=req.body.author;

    console.log("=",name);
    console.log("=",description);
    console.log("=",author);
    res.render("addblog");
*/
});

module.exports=router;