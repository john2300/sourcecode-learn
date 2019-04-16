var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/';
var dbName = 'shopdb';


console.time('start');
MongoClient.connect(dbUrl,(err,client)=>{
	if(err){
		console.log(err);
		return;
	}

	//选择数据库名称
	var db = client.db(dbName);

	//增加数据
	db.collection('order').insertOne({'username':'张三s三','age':'18','sex':'男','status':'1'},function(err,result){
		if(!err){
			console.log("增加数据成功");
			console.timeEnd('start');
			client.close();
		}
	});
})

