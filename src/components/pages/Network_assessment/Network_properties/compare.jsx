import React, { Component } from 'react'
import {Button, Select, Row, Col, Divider, Table} from 'antd'
import LeftMap from "../../../Map/left_map";
import RightMap from "../../../Map/right_map";
import {Link} from "react-router-dom";
import axios from "axios";
import rightdataStore from "../../../../redux/rightdataStore";
import {update_left_data, update_right_data} from "../../../../redux/actions/update_data";
import {connect} from "react-redux";
import Processors from "kepler.gl/processors";
import leftdataStore from "../../../../redux/leftdataStore";

const { Option } = Select;

class Network_properties_compare extends Component {
    state = {
        columns: [{
            title: '指标',
            dataIndex: 'static',
            align: 'center',
          },
          {
            title: '值',
            dataIndex: 'value',
            align: 'center',
          }],
        data: [],
    }

    loadMap = () => {
        axios.post(`/regiondata`,{
          date: '2017-09-18',
          }).then(response => {
              const RegionData = {
                  data: Processors.processGeojson(response.data),
                  info: {
                      label: 'Region',
                      // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
                      // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
                      id: 'region'
                  }
              };
              console.log(RegionData)
              leftdataStore.dispatch(update_left_data(RegionData))

          },
              error => {
                console.log('失败了',error);
                alert('当前日期没有数据，请更换')
            }
          )

        axios.post(`/stationdata`,{date: '2017-09-18',}).then(
            response => {
                const BusPointData = {
                    data: response.data,
                    info: {
                        label: 'Bus Stops',
                        // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
                        // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
                        id: 'stop_heatmap'
                    }
                };
                rightdataStore.dispatch(update_right_data(BusPointData))
            },
            error => {
                console.log('失败了',error);
                alert('当前日期没有数据，请更换')
            }
        )
    }

    render() {
        return (
            <div className="site-drawer-render-in-current-wrapper">
                {/*<Select defaultValue="路段负荷度" style={{position: "absolute", top: 17, left:150, zIndex: 999}}>*/}
                {/*    <Option value="路段负荷度">路段负荷度</Option>*/}
                {/*    <Option value="lucy">线路负荷度</Option>*/}
                {/*    <Option value="Yiminghe">线网负荷度</Option>*/}
                {/*    <Option value="Yiminghe">线网均衡度</Option>*/}
                {/*    <Option value="Yiminghe">整体负荷水平</Option>*/}
                {/*</Select>*/}
                <Button  style={{position: "absolute", top: 17, left:280, zIndex: 999}} type="primary" >
                    <Link onClick={()=>{this.loadMap()}} to="/Network_properties_compare">对比分析</Link>
                </Button>
                <div className="map-left">
                    <LeftMap/>
                </div>
                <div className="map-right">
                    <RightMap/>
                </div>
                <div className="static-left">
                    <Table columns={this.state.columns} dataSource={this.props.static_value} size="small" pagination={false} bordered title={() => '线网静态指标'}/>
                </div>
                <div className="static-right">
                    <Table columns={this.state.columns} dataSource={this.props.static_value} size="small" pagination={false} bordered title={() => '线网静态指标'}/>
                </div>

            </div>
        )
    }
}
export default connect(
    state => ({
        static_value: state.staticvalue
    }),
    {update_left_data, update_right_data}
)(Network_properties_compare)