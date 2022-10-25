//
//  保存sankey图的数据
//
const initState = {
    region: [],
	data: [],
}

export default function update_sankeyReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type, data} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'update_sankey':
			return {region: data['region'], data: data['data']}
		default:
			return preState
	}
}