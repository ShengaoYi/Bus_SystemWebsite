import React, {Component} from 'react';
import { Select, Space, Button, Tooltip, Checkbox, Row, Col } from 'antd';
import {connect} from "react-redux";
import mapConfigJson from "../pages/Passenger_flow_analysis/geodata/config-all.json";
import {update_route_select} from "../../redux/actions/update_select";
import {serach_route_name} from "../../redux/actions/search_routename"
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import Processors from "kepler.gl/processors";
import dataStore from "../../redux/dataStore";
import {update_route_data} from "../../redux/actions/update_data";
import {update_routename} from "../../redux/actions/update_routename";
import {update_linedata} from "../../redux/actions/update_linedata";
import {update_bardata} from "../../redux/actions/update_bardata";

const { Option } = Select;

class RouteSelect extends Component {
    state = {
        type:'metro',
        search:'none'
    }
    typeChange = (value)=>{
        this.setState({type:value})
    }
    nameChange = (value)=>{
        const {type} = this.state

        //
        //若名称变更，更新折线图
        //

        const form_line = {
            date: this.props.date.date,
            name: value,
        }
        axios.post(`/routeline`,{
            form_line
        }).then(response => {
            console.log(this.props.date.date)
            this.props.update_linedata(response.data.slice(0, response.data.length - 1))
        }, error => {
            console.log('失败了',error);
            // alert('当前日期没有数据，请更换')
        })

        //
        //若名称变更，更新柱状图
        //

        const form_bar = {
            date: this.props.date.date,
            time: this.props.timeindex.timeindex,
            name: value,
        }

        axios.post(`/routebar`,{
            form_bar
        }).then(response => {
            this.props.update_bardata(response.data)
            var echarts = require('echarts')
            var barChart = echarts.init(document.getElementById('barchart'));
            barChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['下车人数', '上车人数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        data: this.props.bardata.station
                    }
                ],
                series: [
                    {
                        name: '下车人数',
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.props.bardata.down
                    },
                    {
                        name: '上车人数',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'left'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.props.bardata.up
                    }
                ]
            })
        }, error => {
            console.log('失败了',error);
            // alert('当前日期没有数据，请更换')
        })

        this.props.update_routename(value)

        const form = {
            type,
            name: value,
        }
        axios.post(`/routedata`,{
            date: '2017-09-18',form
        }).then(response => {
            console.log(response.data)
            const RouteData = {
                data: Processors.processGeojson(response.data['route']),
                info: {
                    label: 'Routes',
                    // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
                    // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
                    id: 'bk4x78l5m'
                }
            };
            if (form['type'] === 'metro')
            {
                const PointData = {
                    data: Processors.processGeojson(response.data['metro_station']),
                    info: {
                        label: 'Stops',
                        id: 'metro_stop'
                    }
                };
                dataStore.dispatch(update_route_data([RouteData, PointData]))
            }
            else
                {
                const PointData = {
                    data: Processors.processGeojson(response.data['bus_station']),
                    info: {
                        label: 'Stops',
                        id: 'bus_stop'
                    }
                };
                dataStore.dispatch(update_route_data([RouteData, PointData]))
            }}, error => {
                console.log('失败了',error);
                    // alert('当前日期没有数据，请更换')
            })
    }

    onSearch =(val)=> {
        this.setState({search:val});
        const {type} = this.state
        const form = {type,search:val}
        console.log(form)
        axios.post(`/routename`,{
            form
        }).then(response => {
            console.log(response.data)
                this.props.serach_route_name(response.data)
            },
            error => {
            console.log('失败了',error);
            // alert('当前日期没有数据，请更换')
        })
    }

    render() {
        return (
            <div style={{position:"absolute",  right:224, top:17, color:"black", display: this.props.selectdisplay.routeselect}}>
                {/*<Space>*/}
                {/*    <span>站点名称</span>*/}
                {/*    <Select*/}
                {/*        showSearch*/}
                {/*        style={{ width: 329 }}*/}
                {/*        placeholder="请输入站点名称如”金荣达工业园“"*/}
                {/*        value={this.props.cur_stationname.cur_stationname}*/}
                {/*        optionFilterProp="children"*/}
                {/*        onChange={this.nameChange}*/}
                {/*        onSearch={this.onSearch}*/}
                {/*        filterOption={(input, option) =>*/}
                {/*            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                {/*        }*/}
                {/*    >*/}
                {/*        {*/}
                {/*          this.props.stationname.map((station)=>{*/}
                {/*            return <Option value={station}>{station}</Option>*/}
                {/*          })*/}
                {/*        }*/}
                {/*    </Select>*/}
                {/*    <Button type="primary" onClick={this.onButton}>*/}
                {/*        搜索*/}
                {/*    </Button>*/}
                {/*</Space>*/}


                <Select
                    showSearch
                    defaultValue={"地铁"}
                    style={{ width: 100 }}
                    placeholder="线路分类"
                    optionFilterProp="children"
                    onChange={this.typeChange}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="metro">地铁</Option>
                    <Option value="bus">公交</Option>
                </Select>

                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="路线名称"
                    defaultValue={"1号线"}
                    optionFilterProp="children"
                    onChange={this.nameChange}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        this.props.routename.map((route)=>{
                            return <Option value={route}>{route}</Option>
						})
                    }
                </Select>

            </div>
        );
    }
}
export default connect(
    state =>({
        selectdisplay: state.selectdisplay,
        date: state.date,
        routename: state.routename,
        timeindex: state.timeindex,
        bardata: state.bardata,
    }),
    {update_route_select, serach_route_name, update_routename, update_linedata, update_bardata}
)(RouteSelect)