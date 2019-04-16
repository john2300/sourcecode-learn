//DB库

var Config =  require('./config.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;

class Db {

	//单例模式解决多次实例，多次连接
	static getInstance() {
		if (!Db.instance) {
			Db.instance = new Db();
		}
		return Db.instance;
	}
	constructor() {
		//存放对象
		this.dbClient = '';
		this.connect();
	}
	connect() {
		var _that = this;
		//链接数据库
		return new Promise((resolve, reject) => {
			//判断是否已经连接了,在实例化的时候这个已经连接了一次
			if (!_that.dbClient) {
				MongoClient.connect(Config.dbUrl, (err, client) => {
					if (err) {
						reject(err);
					} else {
						_that.dbClient = client.db(Config.dbName);
						resolve(_that.dbClient);
					}
				})

			} else {
				//省去了多次连接的问题
				resolve(_that.dbClient);
			}

		})

	}

	find(collectionName, json) {

		//promise拿到的结果是异步，所以这里还要再加一个promise
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				var result = db.collection(collectionName).find(json);
				result.toArray((err, docs) => {
					if (err) {
						reject(err)
					}
					resolve(docs);
				})
			})
		})
	}

	update(collectionName, json1, json2) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).updateOne(json1, {
					$set: json2
				}, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				})
			})
		})
	}
	insert(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).insertOne(json, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				})
			})
		})
	}
	remove(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).removeOne(json, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				})
			})
		})
	}
	getObjectID(id){
		return new ObjectID(id);
	}
}
module.exports = Db.getInstance();



