/**
 * Created by Administrator on 2018/3/7 0007.
 */
var express=require('express');
var router = express.Router();
var DB=require('../../module/db.js');
var multiparty = require('multiparty');

router.get('/', function (req,res) {
    res.render('admin/login');
});
router.post('/doLogin', function (req,res) {

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var name = fields.username[0];
        var password = fields.password[0];
        DB.find('admin','login',{name,password}, function (docs) {
            if(docs.length>0){
                req.session.username=name;
                res.redirect('/admin/user');
            }else{
                res.send('<a href="/admin/login">点击返回</a>');
            }
        });
    });

});
router.get('/loginOut', function (req,res) {
    req.session.username='';
    res.redirect('/admin/login');
})







module.exports=router;