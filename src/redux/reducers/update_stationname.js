//
//	用于保存当前选择的站点名称
//
const initState = {
    cur_stationname: '金荣达工业园'
}

export default function update_stationnameReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action


	//根据type决定如何加工数据
	switch (type) {
		case 'update_stationname':
			return {cur_stationname: data}
		default:
			return preState
	}
}