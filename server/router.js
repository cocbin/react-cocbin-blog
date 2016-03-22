'use strict';

var express = require('express');
var router = express.Router();

var models = require('./models');
var ArticleModel = models.ArticleModel;
var CategoryModel = models.CategoryModel;
var TagsModel = models.TagsModel;
var getNewIds = models.getNewID;
var addArticleCountOfCate = models.addArticleCountOfCate;
var addArticleCountOfTags = models.addArticleCountOfTags;
var pass = require('./pass').hash;
var config = require('./config');

function checkLogin(req,res,next) {
    if(req.session.user) {
        next();
    } else {
        res.send({status:-700});
    }
}

router.post('/put/category',checkLogin,(req,res) => {
    getNewIds('category',(err,doc)=>{
        req.body.id = doc.id;
        new CategoryModel(req.body).save((err,doc)=>{
            if(err) {
                if(err.code==11000) {
                    res.send({status:-100,message:"该类被已存在,请勿重复添加"});
                } else {
                    res.send({status:-100,message:"未知异常,请与管理员联系"});
                }
            } else {
                res.send({status:100,message:"成功添加类别",data:doc});
            }
        });
    });
});

router.post('/remove/category',checkLogin,(req,res) => {
    CategoryModel.remove({_id:req.body.id},(err) => {
        if(err) {
            res.send({status:-100,message:'未知异常,请与管理员联系'});
        } else {
            res.send({status:100,message:'成功删除类别'});
        }
    })
});

router.post('/update/category',checkLogin,(req,res) => {
    CategoryModel.update({_id:req.body.id},{$set:req.body.set},(err) => {
        if(err) {
            res.send({status:-100,message:'修改类别失败,未知异常'});
        }else {
            res.send({status:100,message:"修改类别成功"})
        }
    });
});


router.get('/get/category',(req,res) => {
    CategoryModel.find((err,docs)=>{
        if(err) {
            res.send({status:-100,message:"未知异常,请与管理员联系"});
        } else {
            res.send({status:100,dataList:docs});
        }
    });
});

router.post('/put/tags',checkLogin,(req,res) => {
    getNewIds('tags',(err,doc)=> {
        req.body.id = doc.id;
        new TagsModel(req.body).save((err, doc)=> {
            if (err) {
                if (err.code == 11000) {
                    res.send({status: -100, message: "该标签被已存在,请勿重复添加"});
                } else {
                    res.send({status: -100, message: "未知异常,请与管理员联系"});
                }
            } else {
                res.send({status: 100, message: "成功添加标签", data: doc});
            }
        });
    });
});


router.post('/remove/tags',checkLogin,(req,res) => {
    TagsModel.remove({_id:req.body.id},(err) => {
        if(err) {
            res.send({status:-100,message:'删除标签失败,Err:'+err});
        } else {
            res.send({status:100,message:'成功删除标签'});
        }
    })
});


router.post('/update/tags',checkLogin,(req,res) => {
    TagsModel.update({_id:req.body.id},{$set:req.body.set},(err) => {
        if(err) {
            res.send({status:-100,message:'修改标签失败,Err:'+err});
        }else {
            res.send({status:100,message:"修改类别成功"})
        }
    });
});


router.get('/get/tags',(req,res) => {
    TagsModel.find((err,docs)=>{
        if(err) {
            res.send({status:-100,message:"未知异常,请与管理员联系"});
        } else {
            res.send({status:100,dataList:docs});
        }
    });
});

router.post("/put/article",checkLogin,(req,res)=> {

    addArticleCountOfCate(req.body.category);
    addArticleCountOfTags(req.body.tags);

    req.body.date = new Date();

    getNewIds('article', (err, doc)=> {
        req.body.id = doc.id;
        new ArticleModel(req.body).save((err, doc)=> {
            if (err) {
                res.send({status: -100, message: "未知异常,请与管理员联系"});
            } else {
                res.send({status: 100, data: doc});
            }
        })
    });
});


router.post('/update/article',checkLogin,(req,res) => {
    ArticleModel.update({_id:req.body.id},{$set:req.body.set},(err) => {
        if(err) {
            res.send({status:-100,message:'修改文章失败,Err:'+err});
        } else {
            res.send({status:100,message:"修改文章成功"})
        }
    });
});

router.get("/get/articleList",(req,res)=>{

    var query = {};

    if(req.query.cateid) {
        query['category'] = req.query.cateid;
    }

    if(req.query.tagsid) {
        query['tags'] = req.query.tagsid;
    }

    ArticleModel
        .find(query,'-content')
        .sort({'_id':-1})
        .skip(req.query.pagesize*(req.query.page-1))
        .limit(parseInt(req.query.pagesize))
        .populate('tags category')
        .exec((err,docs)=>{
            if(err) {
                res.send({status:-100,message:"异常:"+err});
            }else {
                res.send({status: 100, dataList: docs});
            }
        });
});

router.get("/get/article",(req,res)=>{
    ArticleModel.findOneAndUpdate({id:req.query.id}, {$inc:{'look':1}})
        .populate('tags category')
        .exec((err,doc)=>{
        if(err) {
            res.send({status:-100,message:"未知异常,请与管理员联系"})
        } else {
            res.send({status:100,data:doc})
        }
    });
});

router.post("/like/article",(req,res)=>{
    var value = 1;
    if(req.body.like == false) {
       value = -1;
    }
    ArticleModel.findOneAndUpdate({_id:req.body.id},{$inc:{like:value}},(err) => {
        if(err) {
            res.send({status:-100,message:err})
        } else {
            res.send({status:100})
        }
    });
});

router.post('/remove/article',checkLogin,(req,res) => {
    ArticleModel.remove({_id:req.body.id},(err) => {
        if(err) {
            res.send({status:-100,message:'未知异常,请与管理员联系'});
        } else {
            res.send({status:100,message:'成功删除文章'});
        }
    })
});

router.post('/checkLogin',checkLogin,(req,res)=>{
    res.send({status:100})
});

router.post('/admin/login',(req,res)=>{
    var userName = req.body.userName;
    var password = req.body.password;

    if(userName == config.userName) {
        pass(password,config.salt,(err,hash)=>{
            if(err) {
                res.send({status:-100,message:'验证密码是发生了错误'});
            } else {
                req.session.user = config.userName;
                if(hash.toString() === config.hash.toString()) {
                    res.send({status:100,message:'登录成功'});
                } else {
                    res.send({status:-100,message:'密码错误'});
                }
            }
        })
    } else {
        res.send({status:-100,message:'用户名不存在'});
    }
});

router.post('/admin/logout',(req,res) => {
    req.session.user = undefined;
    res.send({status:100});
});


module .exports = router;