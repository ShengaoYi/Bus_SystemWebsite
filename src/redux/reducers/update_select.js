//
//	用于控制各地图页面中的组件显示与否
//
import { STATION, ROUTE, REGION } from "../constant";

const initState = {
	stationselect: 'none',
    routeselect: 'none',
	regionselect: 'none',
}

export default function update_selectReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type} = action

	//根据type决定如何加工数据
	switch (type) {
		case STATION: //如果是点数据
			return {stationselect: 'block', routeselect: 'none', regionselect: 'none'}
		case ROUTE: //路线数据
			return {stationselect: 'none', routeselect: 'block', regionselect: 'none'}
        case REGION:
            return {stationselect: 'none', routeselect: 'none', regionselect: 'block'}
		default:
			return preState
	}
}