/**
 * Created by Administrator on 2018/3/7 0007.
 */
var express=require('express');
var router = express.Router();

//登录匹配路由
 router.use(function (req,res,next) {
    if(req.session.username){
        next();
    }else{
        if(req.url=='/login'||req.url=='/login/doLogin'){
            next();
        }else{
            res.redirect('/admin/login');
        }
    }
 });
//admin后台路由
var user=require('./admin/user.js');
var news=require('./admin/news.js');
var focus=require('./admin/focus.js');
var login=require('./admin/login.js');
var newscate=require('./admin/newscate.js');

router.use('/user',user);
router.use('/news',news);
router.use('/focus',focus);
router.use('/login',login);
router.use('/newscate',newscate);
module.exports=router;