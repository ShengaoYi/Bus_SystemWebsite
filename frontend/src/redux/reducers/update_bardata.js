//
//  保存柱状图的数据
//
import {BARDATA} from "../constant";

const initState = {
    station: ['会展中心站', '罗湖站', '岗厦站', '华强路站', '大剧院站', '科学馆站', '深圳大学', '宝安中心', '坪洲', '西乡', '华侨城站', '高新园', '后瑞', '国贸站', '购物公园站', '世界之窗站', '机场东', '车公庙站', '大新', '宝体', '竹子林站', '侨城东站', '固戍', '白石洲', '桃园', '香蜜湖站', '新安', '鲤鱼门', '前海湾'],
	up: [9, 109, 148, 72, 76, 33, 26, 55, 177, 131, 22, 37, 219, 38, 26, 197, 191, 7, 284, 59, 51, 23, 321, 210, 110, 1, 47, 166, 6],
	down: [106, 358, 54, 20, 94, 53, 35, 44, 17, 26, 11, 49, 45, 28, 46, 83, 65, 22, 115, 31, 32, 18, 32, 58, 70, 6, 44, 32, 4],
}

export default function update_bardataReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action
	//根据type决定如何加工数据
	switch (type) {
		case BARDATA:
			return {station: data['station'], up: data['up'], down: data['down']}
		default:
			return preState
	}
}