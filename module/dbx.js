/**
 * Created by Administrator on 2018/3/6 0006.
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
function __connect(callback){
    MongoClient.connect(url,function(err, client){
        if(err){
            console.log(err);
            return false;
        }
            callback(err,client);
    });
};
//查询数据 pageSize每页几条数据  PageCount总共几条数据 page第几页
exports.find=function(dbName,collectionName,json,json2,json3,json4,cb){
    //console.log(arguments.length);
    if(arguments.length==4){
        var cb=json2;
        var page=0;
        var pageSize=0;
    }else if(arguments.length==5){
        var cb=json3;
        var keywords=json2;
        var pageSize=0;
        var page=0;
    }else if(arguments.length==6){
        var cb=json4;
        var keywords={};
        var pageSize=json3;
        var page=json2;//页数
    }else if(arguments.length==7){
        var keywords=json2;
        var pageSize=json4;
        var page=json3;//页数
    }
    __connect(function (err,client) {
        if(err){
            console.log(err);
            return false;
        }
        const db = client.db(dbName);
        var PageCount=(page-1)*pageSize;
        var result=db.collection(collectionName).find(json,{fields:keywords}).skip(PageCount).limit(pageSize);
        result.toArray(function(err, docs) {
            if(err){
                console.log(err);
                return false;
            }
            cb(docs);
        });
    });

};
//修改数据
exports.updateOne=function(dbName,collectionName,json1,json2,cb){
    __connect(function (err,client) {
        const db = client.db(dbName);
        var result=db.collection(collectionName);
        if(err){
            console.log(err);
            return false;
        }
        result.update(json1,{$set:json2},function(err) {
            cb(err);
        });
    });
};
//增加数据
exports.insertOne=function(dbName,collectionName,json,cb){
    __connect(function (err,client) {

        const db = client.db(dbName);
        var result=db.collection(collectionName);
        if(err){
            console.log(err);
            return false;
        }
        result.insertOne(json,function(err) {
            cb(err);
        });
    });
};
//删除数据
exports.removeOne=function(dbName,collectionName,json,cb){
    __connect(function (err,client) {
        const db = client.db(dbName);
        var result=db.collection(collectionName);
        if(err){
            console.log(err);
            return false;
        }
        result.removeOne(json,function(err) {
            cb(err);
        });
    });
};
//总数据量
exports.countAll=function(dbName,collectionName,json,cb){
    __connect(function (err,client) {
        if(err){
            console.log(err);
            return false;

        }
        const db = client.db(dbName);
        var result=db.collection(collectionName).count(json);

        result.then(function(docs) {
            cb(docs);
        });
    });
};
//exports.countAll=function(dbName,collectionName,json,cb){
//    __connect(function (err,client) {
//        const db = client.db(dbName);
//        var result=db.collection(collectionName).find(json).count(function (docs) {
//            cb(docs);
//        });
//    });
//};
