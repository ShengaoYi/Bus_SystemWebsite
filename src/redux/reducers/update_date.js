//
//	用于保存当前日期框的日期
//

const initState = {
    date: '2017-09-18'
}

export default function updateDateReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'none': //如果是点数据
			return {date: data}
		default:
			return preState
	}
}