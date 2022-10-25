//
//	用于保存当前线网中的Time的时间
//

const initState = {
    timeindex: '7:00'
}

export default function update_timeindexReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'update_timeindex': //如果是点数据
			return {timeindex: data}
		default:
			return preState
	}
}