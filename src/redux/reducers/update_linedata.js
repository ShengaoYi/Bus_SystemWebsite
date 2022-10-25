//
//  保存折线图的数据
//
import {LINEDATA} from "../constant";

const initState = {
    linedata: [{'time': '0.0', 'num': 0, 'type': 'up'}, {'time': '0.0', 'num': 0, 'type': 'down'}, {'time': '1.0', 'num': 0, 'type': 'up'}, {'time': '1.0', 'num': 0, 'type': 'down'}, {'time': '2.0', 'num': 0, 'type': 'up'}, {'time': '2.0', 'num': 0, 'type': 'down'}, {'time': '3.0', 'num': 0, 'type': 'up'}, {'time': '3.0', 'num': 0, 'type': 'down'}, {'time': '4.0', 'num': 0, 'type': 'up'}, {'time': '4.0', 'num': 0, 'type': 'down'}, {'time': '5.0', 'num': 2, 'type': 'up'}, {'time': '5.0', 'num': 0, 'type': 'down'}, {'time': '6.0', 'num': 523, 'type': 'up'}, {'time': '6.0', 'num': 80, 'type': 'down'}, {'time': '7.0', 'num': 1034, 'type': 'up'}, {'time': '7.0', 'num': 374, 'type': 'down'}, {'time': '8.0', 'num': 885, 'type': 'up'}, {'time': '8.0', 'num': 597, 'type': 'down'}, {'time': '9.0', 'num': 276, 'type': 'up'}, {'time': '9.0', 'num': 336, 'type': 'down'}, {'time': '10.0', 'num': 155, 'type': 'up'}, {'time': '10.0', 'num': 174, 'type': 'down'}, {'time': '11.0', 'num': 161, 'type': 'up'}, {'time': '11.0', 'num': 150, 'type': 'down'}, {'time': '12.0', 'num': 174, 'type': 'up'}, {'time': '12.0', 'num': 101, 'type': 'down'}, {'time': '13.0', 'num': 244, 'type': 'up'}, {'time': '13.0', 'num': 69, 'type': 'down'}, {'time': '14.0', 'num': 329, 'type': 'up'}, {'time': '14.0', 'num': 148, 'type': 'down'}, {'time': '15.0', 'num': 186, 'type': 'up'}, {'time': '15.0', 'num': 77, 'type': 'down'}, {'time': '16.0', 'num': 396, 'type': 'up'}, {'time': '16.0', 'num': 85, 'type': 'down'}, {'time': '17.0', 'num': 330, 'type': 'up'}, {'time': '17.0', 'num': 69, 'type': 'down'}, {'time': '18.0', 'num': 869, 'type': 'up'}, {'time': '18.0', 'num': 191, 'type': 'down'}, {'time': '19.0', 'num': 401, 'type': 'up'}, {'time': '19.0', 'num': 328, 'type': 'down'}, {'time': '20.0', 'num': 449, 'type': 'up'}, {'time': '20.0', 'num': 246, 'type': 'down'}, {'time': '21.0', 'num': 435, 'type': 'up'}, {'time': '21.0', 'num': 133, 'type': 'down'}, {'time': '22.0', 'num': 255, 'type': 'up'}, {'time': '22.0', 'num': 102, 'type': 'down'}, {'time': '23.0', 'num': 182, 'type': 'up'}, {'time': '23.0', 'num': 28, 'type': 'down'}, {'time': '24.0', 'num': 0, 'type': 'up'}, {'time': '24.0', 'num': 1, 'type': 'down'}]
}

export default function update_linedataReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case LINEDATA:
			return {linedata: data}
		default:
			return preState
	}
}