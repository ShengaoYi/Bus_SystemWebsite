/*
	该文件专门为更新数据组件生成action对象
*/
import { STATION, ROUTE, REGION } from '../constant'

export const update_station_data = data =>({type:STATION, data})
export const update_route_data = data =>({type:ROUTE, data})
export const update_region_data = data =>({type:REGION, data})
export const update_modal_data = data =>({type:'modaldata', data})
export const update_left_data = data =>({type:'left', data})
export const update_right_data = data =>({type:'right', data})
