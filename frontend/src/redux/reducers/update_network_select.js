//
//	用于控制各线网模块中的组件显示与否
//

const initState = {
	propertiesselect: 'none',
    loadselect: 'none',
	sdselect: 'none',

	propertiesselect_compare: 'none',
    loadselect_compare: 'none',
	sdselect_compare: 'none',
}

export default function update_network_selectReducer(preState=initState,action){

	//从action对象中获取：type、data
	const {type} = action

	//根据type决定如何加工数据
	switch (type) {
		case 'update_properties': //静态指标
			return {propertiesselect: 'block', loadselect: 'none', sdselect: 'none'}
		case 'update_load': //负荷水平
			return {propertiesselect: 'none', loadselect: 'block', sdselect: 'none'}
        case 'update_SD': //供需分析
            return {propertiesselect: 'none', loadselect: 'none', sdselect: 'block'}


        default:
			return preState
	}
}