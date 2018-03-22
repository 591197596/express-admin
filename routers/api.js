/**
 * Created by Administrator on 2018/3/8 0008.
 */
var express=require('express');
var router = express.Router();
var DB=require('../module/dbx.js');
router.get('/', function (req,res){
    DB.find('admin','news',{}, function (docs) {
        res.json({
            api:docs
        });
    });

});

/*分页查询api*/
router.get('/shop',function(req,res){
	var psgeSize=5;
	var page=req.query.page||1;
	DB.find('admin','news',{},{'name':1},page,psgeSize,function(docs){
		 res.jsonp({   /*支持ajax 和jsonp*/
            result:docs
        })
	})
})

module.exports=router;