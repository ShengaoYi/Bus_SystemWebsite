//
//	用于保存地图图片
//
const initState = []

export default function get_map_picReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'get_map_pic':
			return data
		default:
			return preState
	}
}