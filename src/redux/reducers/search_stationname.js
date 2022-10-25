//
//	用于保存查找到的站点名称
//
import { STATIONNAME } from "../constant";

const initState = []

export default function search_stationnameReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case STATIONNAME: //站点名称
			return data
		default:
			return preState
	}
}