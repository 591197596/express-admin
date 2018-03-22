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
//查询数据
exports.find=function(dbName,collectionName,json,cb){
    __connect(function (err,client) {
        const db = client.db(dbName);
        var result=db.collection(collectionName).find(json);
        if(err){
            console.log(err);
            return false;
        }
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