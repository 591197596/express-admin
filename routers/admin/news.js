/**
 * Created by Administrator on 2018/3/7 0007.
 */
var DB=require('../../module/dbx.js');
var express=require('express');
var router = express.Router();
var multiparty = require('multiparty');
const ObjectId = require('mongodb').ObjectId;
var async=require('async');
//新闻列表
router.get('/', function (req,res) {
    var page=req.query.page||1;

    async.parallel({
        list: function (callback) {

            DB.find('admin','news',{},page,5, function (docs) {
                callback(null,docs)
            });
        },
        count: function (callback) {
            DB.countAll('admin','news',{}, function (docs) {
                callback(null,docs)
            });
        }
    }, function (err,data) {
        res.render('admin/news/index',{
            list:data.list,
            count:data.count,
            page:page
        });
    })

});
//新闻增加
router.get('/edd', function (req,res) {
    DB.find('admin','newscate',{}, function (docs) {
        res.render('admin/news/edit',{
            list:docs
        });
    });

});
////增加post列表
router.post('/doAdd', function (req,res){
    var form = new multiparty.Form();
    form.uploadDir='static/upload'; //上传图片的路径，路径(目录)必须存在并且要配置成功 ***注意
    form.parse(req, function(err, fields, files){
        var cid = fields.cid[0];
        var name = fields.username[0];
        var author = fields.author[0];
        var pic=files.pic[0].path;
        var classname = fields.classname[0];
        var description = fields.description[0];
        var content = fields.content[0];
        DB.insertOne("admin",'news',{cid,name,pic,author,classname,description,content}, function (err) {
            if(err){
                console.log(err);
                return false;
            }
            res.redirect('/admin/news');
        });
    });
});
//新闻修改页面
router.get('/revise', function (req,res) {

    async.parallel({
        news: function(callback){
            DB.find("admin",'news',{"_id":new ObjectId(req.query.id)}, function (docs) {
                callback(null,docs)
            });
        },
        newscate: function(callback){
            DB.find("admin",'newscate',{}, function (docs) {
                callback(null,docs)
            });
        }
    }, function (err, data){

        res.render('admin/news/revise',{
            news:data.news[0],
            newscate:data.newscate
        })
    })
});
////修改后提交
router.post('/dodo', function (req,res) {
    var form = new multiparty.Form();
    form.uploadDir='static/upload'; //上传图片的路径，路径(目录)必须存在并且要配置成功 ***注意
    form.parse(req, function(err, fields, files) {

        var id=fields.id[0];
        var cid=fields.cid[0];
        var name = fields.username[0];
        var pic=files.pic[0].path;
        var author = fields.author[0];
        var classname = fields.classname[0];
        var description = fields.description[0];
        var content = fields.content[0];
        if(files.pic[0].originalFilename){
            var json={cid,name,pic,author,classname,description,content}
        }else{
            var json={cid,name,author,classname,description,content};
        }

        DB.updateOne("admin",'news',{"_id":new ObjectId(id)},json, function (err) {
            if(err){
                console.log(err);
                return false;
            }
            res.redirect('/admin/news');
        });
    });
});
////删除新闻信息
router.get('/remove', function(req,res) {
    DB.removeOne("admin",'news',{"_id":new ObjectId(req.query.id)}, function (err) {
        if(err){
            console.log(err);
            return false;
        }
        res.redirect('/admin/news');
    });
});
// //上传的图片
router.post('/upload',function(req,res){
    var form = new multiparty.Form();
    form.uploadDir='static/upload'  /*设置图片上传的路径必须存在*/

    form.parse(req, function(err, fields, files) {
        var path=files.filedata[0].path;
        res.json({"err":"","msg":'/'+path});  /*给编辑器返回地址信息*/
    });
});


module.exports=router;