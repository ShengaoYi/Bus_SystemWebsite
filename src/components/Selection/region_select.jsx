import React, {Component} from 'react';
import { Select, Radio, Tooltip } from 'antd';
import {connect} from "react-redux";

import {update_region_select} from "../../redux/actions/update_select";

import axios from "axios";
import Processors from "kepler.gl/processors";

import dataStore from "../../redux/dataStore";
import {update_region_data} from "../../redux/actions/update_data";
import {update_region_type} from "../../redux/actions/update_region";

const { Option } = Select;

class RegionSelect extends Component {
    typeChange = (value)=>{

        value = value.target.value

        console.log(this.props.date.date)
        this.props.update_region_type(value)
        if(value === 'region')
        {
            axios.post(`/regiondata`,{
                  date: this.props.date.date,
              }).then(response => {
                  const RegionData = {
                      data: Processors.processGeojson(response.data),
                      info: {
                          label: 'Region',
                          id: 'region'
                      }
                  };
                  console.log(RegionData)
                  dataStore.dispatch(update_region_data(RegionData))
              },
                  error => {
                    console.log('失败了',error);
                    alert('当前日期没有数据，请更换')
                }
              )
        }
        else{
            axios.post(`/tazdata`,{
                  date: this.props.date.date,
              }).then(response => {
                  const TazData = {
                      data: Processors.processGeojson(response.data),
                      info: {
                          label: 'Taz',
                          id: 'region'
                      }
                  };
                  console.log(TazData)
                  dataStore.dispatch(update_region_data(TazData))
              },
                  error => {
                    console.log('失败了',error);
                    alert('当前日期没有数据，请更换')
                }
              )
        }
    }

    render() {
        return (
            <div style={{position:"absolute", right: 225, top:17, color:"black", display:this.props.selectdisplay.regionselect}}>
                {/*<Select*/}
                {/*    showSearch*/}
                {/*    style={{ width: 100 }}*/}
                {/*    defaultValue="region"*/}
                {/*    optionFilterProp="children"*/}
                {/*    onChange={this.typeChange}*/}
                {/*    // onSearch={this.onSearch}*/}
                {/*    filterOption={(input, option) =>*/}
                {/*      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                {/*    }*/}
                {/*>*/}
                {/*    <Option value="region">region</Option>*/}
                {/*    <Option value="taz">taz</Option>*/}
                {/*</Select>*/}

                <Radio.Group onChange={this.typeChange} defaultValue="region" buttonStyle="solid">
                  <Radio.Button value="region">region</Radio.Button>
                  <Radio.Button value="taz">taz</Radio.Button>
                </Radio.Group>

            </div>
        );
    }
}
export default connect(
    state =>({
        selectdisplay: state.selectdisplay,
        date: state.date,
    }),
    {update_region_select, update_region_type}
)(RegionSelect)