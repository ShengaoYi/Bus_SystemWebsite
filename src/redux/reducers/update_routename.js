//
//	用于保存当前选择的路线名称
//
const initState = {
    cur_routename: '1号线'
}

export default function update_routenameReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'update_routename':
			return {cur_routename: data}
		default:
			return preState
	}
}