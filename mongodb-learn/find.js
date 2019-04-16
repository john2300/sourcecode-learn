var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/';
var dbName = 'shopdb';


console.time('start1');
MongoClient.connect(dbUrl,(err,client)=>{
	if(err){
		console.log(err);
		return;
	}

	//选择数据库名称
	var db = client.db(dbName);

	//查询数据
	var result = db.collection('order').find({});
	result.toArray((err,docs)=>{
		console.timeEnd('start1');
		console.log(docs);
	})
})

