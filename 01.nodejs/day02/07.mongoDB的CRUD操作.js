
db.students.find({})

/*
	增删改查  CRUD
		- create 
			db.collection.insert({文档对象})  向当前数据库中指定的集合内插入一条文档数据
			db.collection.insert([{文档对象}, {文档对象}])  向当前数据库中指定的集合内插入多条文档数据
			db.collection.insertOne({文档对象}) 向当前数据库中指定的集合内插入一条文档数据
			db.collection.insertMany([{文档对象}, {文档对象}])  向当前数据库中指定的集合内插入多条文档数据
			
		- read
			db.collection.find(查询条件[, 投影]) 向当前数据库中指定的集合内根据查询条件来查找所有匹配的文档数据
			db.collection.findOne(查询条件[, 投影])  向当前数据库中指定的集合内根据查询条件来查找匹配的第一个的文档数据
			
			- 操作符
				1. < <= > >= != $lt $lte $gt $gte $ne
				2. 或 非    $in $or  $nin
				3. 正则表达式
				4. $where
				
			- 投影 过滤掉不想要保留的数据
		
		- update
			db.collection.update(查询条件, 要更新的内容[, 配置对象])  默认更新时会将更新内容全部徐替换掉原来的内容（_id字段例外）
												                                    默认只更新查询到的第一个文档对象  {multi: true}
			db.collection.updateOne(查询条件, 要更新的内容[, 配置对象])
			db.collection.updateMany(查询条件, 要更新的内容[, 配置对象])
			
			$set 只会修改传入的字段，其他字段就不影响
			$inc 会将增加传入字段的值
		
		- delete
			
			db.collection.remove(查询条件)
	
*/

db.students.insert([{name: 'Tom', age: 19}, {name: 'Jerry', age: 20}])

db.students.find({age: 19, name: 'Tom'})

db.students.find({age: {$gte: 19}})

db.students.find({name: {$in: ['Tom', 'Jack']}})
db.students.find({$or: [{name: 'Tom'}, {name: 'Jack'}]})

db.students.find({name: /^T/})

db.students.find({
    $where: function () {
		return this.age > 18 && this.age < 20;
	}
})

db.students.find({}, {name: 1, _id: 0})
db.students.find({}, {age: 0, _id: 0})

db.students.update({name: 'Jack'}, {$inc: {age: 1}})

db.students.update({name: 'Tom'}, {age: 25, name: 'Tom'})  //会出问题
db.students.update({name: 'Tom'}, {$set: {age: 18}})

db.students.update({age: {$lt: 20}}, {$set: {age: 20}}, {multi: true})  //可以更新多条文档对象


db.students.find({})

db.students.remove({})