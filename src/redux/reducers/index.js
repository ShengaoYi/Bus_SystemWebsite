/*
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux';
import updateDataReducer from './update_data';
import update_selectReducer from './update_select';
import search_stationnameReducer from "./search_stationname";
import search_routenameReducer from "./search_routename";
import updateDateReducer from "./update_date";
import {handleActions} from 'redux-actions';
import {routerReducer} from 'react-router-redux';
import keplerGlReducer from 'kepler.gl/reducers';
import updateRegionReducer from "./update_region";
import update_stationnameReducer from "./update_stationname";
import update_routenameReducer from "./update_routename";
import update_linedataReducer from "./update_linedata";
import update_bardataReducer from "./update_bardata";
import update_timeindexReducer from "./update_timeindex";
import update_regionnameReducer from "./update_regionname";
import update_sankeyReducer from "./update_sankey";
import update_filedataReducer from "./update_filedata";
import update_fileReducer from "./update_file";
import get_map_picReducer from "./get_map_pic";
import get_map_dataReducer from "./get_map_data";
import get_algorithms_picReducer from "./get_algorithms_pic";
import update_network_selectReducer from "./update_network_select";
import get_static_valueReducer from "./get_static_value";
// INITIAL_APP_STATE
const initialAppState = {
  appName: 'example',
  loaded: false
};

const customKeplerGlReducer = keplerGlReducer.initialState({
    uiState: {
      currentModal: null,
      activeSidePanel: null,
    }
  });

export default combineReducers({
  // mount keplerGl reducer
  keplerGl: customKeplerGlReducer,
  app: handleActions({
	//
  }, initialAppState),
  map_pic: get_map_picReducer,
  mapdata: get_map_dataReducer,
  selectdisplay: update_selectReducer,
  networkselect: update_network_selectReducer,
  stationname: search_stationnameReducer,
  routename: search_routenameReducer,
  cur_stationname: update_stationnameReducer,
  cur_routename: update_routenameReducer,
  cur_regionname: update_regionnameReducer,
  linedata: update_linedataReducer,
  bardata: update_bardataReducer,
  timeindex: update_timeindexReducer,
  sankey: update_sankeyReducer,
  date: updateDateReducer,
  type: updateRegionReducer,
  filedata: update_filedataReducer,
  file: update_fileReducer,
  algorithms_pic: get_algorithms_picReducer,
  staticvalue: get_static_valueReducer,
  routing: routerReducer
});



