/**
 * Created by Administrator on 2018/3/7 0007.
 */
var DB=require('../../module/db.js');
var express=require('express');
var router = express.Router();
var multiparty = require('multiparty');
const ObjectId = require('mongodb').ObjectId;
//新闻分类列表
router.get('/', function (req,res) {
    DB.find('admin','newscate',{}, function (docs) {
        res.render('admin/newscate/index',{
            list:docs
        });
    });

});
////新闻分类增加
router.get('/cdd', function (req,res) {
    res.render('admin/newscate/edit');
});
////增加post列表
router.post('/doAdd', function (req,res){
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var name = fields.username[0];
        var description = fields.description[0];
        DB.insertOne("admin",'newscate',{name,description}, function (err) {
            if(err){
                console.log(err);
                return false;
            }
            res.redirect('/admin/newscate');
        });
    });
});
////新闻分类修改页面
router.get('/revise', function (req,res) {
    DB.find("admin",'newscate',{"_id":new ObjectId(req.query.id)}, function (docs) {
        res.render('admin/newscate/revise',{
            list:docs
        })
    });
});
////新闻分类修改后提交
router.post('/dodo', function (req,res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var id=fields.id[0];
        var name = fields.username[0];
        var description = fields.description[0];
            var json={name,description};
        DB.updateOne("admin",'newscate',{"_id":new ObjectId(id)},json, function (err) {
            if(err){
                console.log(err);
                return false;
            }
            res.redirect('/admin/newscate');
        });
    });
});
////删除新闻分类
router.get('/remove', function(req,res) {
    DB.removeOne("admin",'newscate',{"_id":new ObjectId(req.query.id)}, function (err) {
        if(err){
            console.log(err);
            return false;
        }
        res.redirect('/admin/newscate');
    });
});



module.exports=router;