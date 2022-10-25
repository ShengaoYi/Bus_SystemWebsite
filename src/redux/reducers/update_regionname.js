//
//	用于保存当前选择的行政区名称
//
const initState = {
    cur_regionname: 'Baoan'
}

export default function update_regionnameReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'update_regionname':
			return {cur_regionname: data}
		default:
			return preState
	}
}