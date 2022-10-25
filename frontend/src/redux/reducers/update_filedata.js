//
//	用于保存当前文件的数据
//

const initState = {
    filedata:{}
}

export default function update_filedataReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action


	//根据type决定如何加工数据
	switch (type) {
		case 'update_filedata': //如果是点数据
			return {filedata: data}
		default:
			return preState
	}
}