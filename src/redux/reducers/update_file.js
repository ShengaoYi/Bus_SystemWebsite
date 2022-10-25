//
//	用于保存当前文件
//

const initState = {
    file:{}
}

export default function update_fileReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'update_file': //如果是点数据
			return {file: data}
		default:
			return preState
	}
}