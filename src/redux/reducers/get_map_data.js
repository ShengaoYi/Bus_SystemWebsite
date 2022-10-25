//
//	用于保存地图数据
//
const initState = {
	'input':[],
	'others': [],
}

export default function get_map_dataReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'get_map_data':
			return data
		default:
			return preState
	}
}