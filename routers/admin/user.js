/**
 * Created by Administrator on 2018/3/7 0007.
 */
    //查询数据
//DB.find('my',{}, function (docs) {
//    console.log(docs);
//});
//修改数据
//DB.updateOne('my',{"name":"zhangsan"},{"name":"shazi"}, function (err) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//});
//增加数据
//DB.insertOne('my',{"name":"王麻子","age":"13"}, function (err) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//});
//删除数据
//DB.removeOne('my',{"name":"王麻子","age":"13"}, function (err) {
//    if(err){
//        console.log(err);
//        return false;
//    }
//});
var DB=require('../../module/dbx.js');
var express=require('express');
var router = express.Router();
var multiparty = require('multiparty');
const ObjectId = require('mongodb').ObjectId;
var async=require('async');
//学员列表
router.get('/', function (req,res){
    var page=req.query.page||1;
    var pageSize=3;
    async.parallel({
        count: function (callback) {
            DB.countAll('admin','my',{}, function (docs) {
                callback(null,docs);
            });
        },
        list: function (callback) {
            DB.find('admin','my',{},page,pageSize, function (docs) {
                callback(null,docs);
            });
        }
    }, function (err,data) {
        if(err){
            console.log(err);
            return false;
        }
        res.render('admin/user/index',{
            list:data.list,
            count:data.count,
            page:page,
            pageSize:pageSize
        });
    })


});
//学员增加
router.get('/add', function (req,res) {
    res.render('admin/user/edit');
});
//增加post列表
router.post('/doAdd', function (req,res){
    var form = new multiparty.Form();
    form.uploadDir='static/upload'; //上传图片的路径，路径(目录)必须存在并且要配置成功 ***注意
    form.parse(req, function(err, fields, files) {
        //var id=fields.id[0];
        console.log(files);
        var imgSrc = files.pic[0].path;
        var username = fields.username[0];
        var age = fields.age[0];
        var sex = fields.sex[0];

        var description = fields.description[0];
        DB.insertOne("admin",'my',{imgSrc,username,age,sex,description}, function (err) {
            if(err){
                console.log(err);
                return false;
            }
            res.redirect('/admin/user');
        });
    });
});
//学员修改页面
router.get('/revise', function (req,res) {
    DB.find("admin",'my',{"_id":new ObjectId(req.query.id)}, function (docs) {
        res.render('admin/user/revise',{
            list:docs
        })
    });
});
//修改后提交
router.post('/dodo', function (req,res) {
    var form = new multiparty.Form();
    form.uploadDir='static/upload'; //上传图片的路径，路径(目录)必须存在并且要配置成功 ***注意
    form.parse(req, function(err, fields, files) {
        var id=fields.id[0];
        var imgSrc = files.pic[0].path;
        var username = fields.username[0];
        var age = fields.age[0];
        var sex = fields.sex[0];
        var description = fields.description[0];
        if(files.pic[0].originalFilename){
            var json={imgSrc,username,age,sex,description};
        }else{
            var json={username,age,sex,description};
        }
        DB.updateOne("admin",'my',{"_id":new ObjectId(id)},json, function (err) {
            if(err){
                console.log(err);
                return false;
            }
            res.redirect('/admin/user');
        });
    });
});
//删除学员信息
router.get('/remove', function(req,res) {
    DB.removeOne("admin",'my',{"_id":new ObjectId(req.query.id)}, function (err) {
        if(err){
            console.log(err);
            return false;
        }
        res.redirect('/admin/user');
    });
});



module.exports=router;