import {STATION, ROUTE, REGION} from "../constant";

export const update_station_select = data =>({type:STATION, data})
export const update_route_select = data =>({type:ROUTE, data})
export const update_region_select = data =>({type:REGION, data})

