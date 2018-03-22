/**
 * Created by Administrator on 2018/3/7 0007.
 */
var DB=require('../../module/db.js');
var express=require('express');
var router = express.Router();
var multiparty = require('multiparty');
const ObjectId = require('mongodb').ObjectId;
var async=require('async');
//轮播图
router.get('/', function (req,res) {
    DB.find('admin','banner',{}, function (docs) {
        res.render('admin/focus/index',{
            list:docs
        });
    });

});
//轮播图增加
router.get('/bdd', function (req,res) {
    DB.find('admin','banner',{}, function (docs) {
        res.render('admin/focus/edit',{
            list:docs
        });
    });

});
//增加轮播图列表
router.post('/doAdd', function (req,res){
    var form = new multiparty.Form();
    form.uploadDir='static/upload'; //上传图片的路径，路径(目录)必须存在并且要配置成功 ***注意
    form.parse(req, function(err, fields, files){
        console.log(fields);
        console.log(files);
        var title = fields.title[0];
        var url = files.url[0].path;
        var content = fields.content[0];
        DB.insertOne("admin",'banner',{title,url,content}, function (err) {
            if(err){
                console.log(err);
                return false;
            }
            res.redirect('/admin/focus');
        });
    });
});
//轮播图修改页面
router.get('/revise', function (req,res) {
        DB.find("admin",'banner',{"_id":new ObjectId(req.query.id)}, function (docs) {
            res.render('admin/focus/revise',{
                list:docs
            })
        });

});
//修改后提交
router.post('/dodo', function (req,res) {
    var form = new multiparty.Form();
    form.uploadDir='static/upload'; //上传图片的路径，路径(目录)必须存在并且要配置成功 ***注意
    form.parse(req, function(err, fields, files) {
        console.log(files);
        var id=fields.id[0];
        var title=fields.title[0];
        var url = files.url[0].path;
        var content = fields.content[0];

        if(files.url[0].originalFilename){
            var json={title,url,content};
        }else{
            var json={title,content};
        }
        DB.updateOne("admin",'banner',{"_id":new ObjectId(id)},json, function (err) {
           if(err){
               console.log(err);
               return false;
           }
           res.redirect('/admin/focus');
        });
    });
});
////////删除轮播图信息
router.get('/remove', function(req,res) {
   DB.removeOne("admin",'banner',{"_id":new ObjectId(req.query.id)}, function (err) {
       if(err){
           console.log(err);
           return false;
       }
       res.redirect('/admin/focus');
   });
});
////上传的图片
router.post('/upload',function(req,res){
    var form = new multiparty.Form();
    form.uploadDir='static/upload'  /*设置图片上传的路径必须存在*/

    form.parse(req, function(err, fields, files) {

        var path=files.filedata[0].path;
        console.log(path);
        res.json({"err":"","msg":'/'+path});  /*给编辑器返回地址信息*/
    });
})


module.exports=router;