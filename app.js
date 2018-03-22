/**
 * Created by Administrator on 2018/3/6 0006.
 后台管理：   admin
 用户管理     admin/user          admin/user/add
 轮播图管理   admin/focus          admin/focus/add
 新闻分类管理  admin/news          admin/news/add
 新闻管理

 前台：  /
 首页   /
 关于我们  /about
 新闻   /news
 案例  /case

 api大模块：
 轮播图接口    api/focus
 新闻接口   api/new
 用户接口
 */
var express=require('express');
var app=express();
var admin=require('./routers/admin.js');
var index=require('./routers/index.js');
var api=require('./routers/api.js');

//配置session
var session = require("express-session");
app.use(session({ secret: 'keyboard cat'}));

//配置静态文件
app.use(express.static('static'));
app.use('/static',express.static('static'));
//配置ejs
app.set('view engine',"ejs");
//路由
app.use('/admin',admin);
app.use('/index',index);
app.use('/api',api);

app.listen(3008);
//,'10.36.139.6'