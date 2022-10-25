const initState = []

export default function get_static_valueReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'get_static_value':
			return data
		default:
			return preState
	}
}