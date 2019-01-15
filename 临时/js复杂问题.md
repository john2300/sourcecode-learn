数组

    有时候我们会把数组元素写成键值和属性的形式,但是数组是通过数字进行索引的,数组内置的方法也是需要借助数字索引实现,如果数组元素的键值不是数字(或者字符串数字)的话,内置方法是无法操作到该数组元素.例如length和forEach方法,代码如下:

        let arr = [1,2];
		arr.str = 'string';
		arr[2] = '3';
		arr['3'] = 4;
		console.log(arr);//(4) [1, 2, "3", 4, str: "string"]		
		console.log(arr.length);//4
		arr.forEach((item,index)=>{
			console.log('index:' + index + ',' + 'item:' + item);
			//index:0,item:1;index:1,item:2;index:2,item:3;index:3,item:4
		});

	可以看到,数组长度是不包括str:"string"这个数组元素的,另外forEach也遍历不到该元素.

    