//
//	用于保存并地图中的数据
//
import { STATION, ROUTE, REGION } from "../constant";

const initState = []

export default function updateDataReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type, data} = action
	console.log(data)

	//根据type决定如何加工数据
	switch (type) {
		case STATION: //如果是点数据
			return data
		case ROUTE: //若果是路线数据
			return data
        case REGION:
            return data
		case 'modaldata':
			return data
		default:
			return preState
	}
}