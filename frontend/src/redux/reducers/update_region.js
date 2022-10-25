const initState = {
    type: 'region'
}

export default function updateRegionReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'taz':
			return {type: data}
		default:
			return preState
	}
}