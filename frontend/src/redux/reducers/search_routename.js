//
//	用于保存查找到的路线名称
//

import { ROUTENAME } from "../constant";

const initState = []

export default function search_routenameReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case ROUTENAME: //路线名称
			return data
		default:
			return preState
	}
}