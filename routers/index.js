/**
 * Created by Administrator on 2018/3/8 0008.
 */
var express=require('express');
var router = express.Router();
var multiparty = require('multiparty');
var DB=require('../module/db.js');
var async=require('async');

const ObjectId = require('mongodb').ObjectId;
router.get('/', function (req,res) {
    async.parallel({
        banner: function (callback) {
            DB.find('admin','banner',{}, function (docs) {
                    callback(null,docs);
            });
        },
        newscate: function (callback) {
            DB.find('admin','newscate',{}, function (docs) {
                    callback(null,docs);
            });
        },
        news: function (callback) {
            DB.find('admin','news',{}, function (docs) {
                callback(null,docs);
            });
        }
    }, function (err,data) {
        res.render('index/index',{
            banner: data.banner,
            news: data.news,
            newscate: data.newscate
        });
    })

});
router.get('/about', function (req,res) {
    res.render('index/about');
});
router.get('/successful', function (req,res) {
    res.render('index/successful');
});
router.get('/service', function (req,res) {
    res.render('index/service');
});
router.get('/common', function (req,res){
    DB.find('admin','news',{}, function (docs) {
        res.render('index/common',{
            list:docs
        });
    });

});
router.get('/newscontent', function (req,res){
    DB.find('admin','news',{"_id":new ObjectId(req.query.id)}, function (docs) {
        res.render('index/newscontent',{
            list:docs
        });
    });

});
/*求总数据*/
router.get('/xxx', function (req,res){
    DB.countAll('admin','news',{}, function (docs) {
       console.log(docs)
    });

});
module.exports=router;

