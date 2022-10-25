const initState = []

export default function updateLeftDataReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type, data} = action
	console.log(type, data)

	//根据type决定如何加工数据
	switch (type) {
		case 'left':
			return data
		default:
			return preState
	}
}