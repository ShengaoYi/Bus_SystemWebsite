import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Avatar, Row, Divider } from "antd";
import { AppstoreOutlined, ContainerOutlined, MailOutlined, PieChartOutlined, AntDesignOutlined } from "@ant-design/icons";
import axios from "axios";
import dataStore from "../../redux/dataStore";
import {
    update_station_data,
    update_route_data,
    update_region_data,
    update_left_data,
} from "../../redux/actions/update_data";
import {update_station_select, update_route_select, update_region_select} from "../../redux/actions/update_select";
import {get_map_data} from "../../redux/actions/get_map_data";
import {get_algorithms_pic} from "../../redux/actions/get_algorithms_pic";
import {connect} from 'react-redux'
import Processors from 'kepler.gl/processors';
import {update_properties, update_load, update_SD} from "../../redux/actions/update_network_select";
import leftdataStore from "../../redux/leftdataStore";
import {get_static_value} from "../../redux/actions/get_static_value";
import {update_regionname} from "../../redux/actions/update_regionname";
import {update_linedata} from "../../redux/actions/update_linedata";

const { SubMenu } = Menu;

class Sidemenu extends React.Component {
    getMapdata = ()=>{
        axios.get(`/mapdata`).then(
            response => {
                console.log(response.data)
                this.props.get_map_data(response.data)
            },
            error => {
                console.log('失败了',error);
            }
        )
    }

    componentDidMount() {
        axios.get(`/mapdata`).then(
            response => {
                this.props.get_map_data(response.data)
            },
            error => {
                console.log('失败了',error);
            }
        )
    }
    loadStation = ()=>{
        this.props.update_station_select(0)
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
                console.log(BusPointData)
                dataStore.dispatch(update_station_data(BusPointData))
            },
            error => {
                console.log('失败了',error);
                alert('当前日期没有数据，请更换')
            }
        )

        const form = {
            name:"金荣达工业园",
            date:this.props.date.date
        }
        axios.post(`/stationdiagram`,{
            form
        }).then(response => {
            this.props.update_linedata(response.data.slice(0, response.data.length - 1))
        }, error => {
            console.log('失败了',error);
            // alert('当前日期没有数据，请更换')
        })



    }
    loadRoute = ()=>{
        this.props.update_route_select(1)

        const form ={
            type:'metro',
            name:'1号线'
        }
        const form_line = {
            date: this.props.date.date,
            name: '1号线',
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



      axios.post(`/routedata`,{
          date: '2017-09-18',form
            }).then(response => {
                console.log(response.data)
                // const station_data = response.data['metro_station']
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
                            // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
                            // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
                            id: 'metro_stop'
                        }
                    };
                    dataStore.dispatch(update_route_data([PointData,RouteData]))
                }
                else {
                    const PointData = {
                        data: Processors.processGeojson(response.data['bus_station']),
                        info: {
                            label: 'Stops',
                            // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
                            // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
                            id: 'bus_stop'
                        }
                    };
                    dataStore.dispatch(update_route_data([PointData,RouteData]))
                }

            },
                error => {
                    console.log('失败了',error);
                    // alert('当前日期没有数据，请更换')
                }
            )
    }
    loadRegion = ()=>{
        this.props.update_region_select(1)
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
            dataStore.dispatch(update_region_data(RegionData))
        },
            error => {
                console.log('失败了',error);
                alert('当前日期没有数据，请更换')
            }
        )

        this.props.update_regionname("Baoan")

        const form_region_line = {
            date: this.props.date.date,
            region: "Baoan"
        }

        axios.post(`/regionline`,{
            form_region_line
        }).then(response => {

            this.props.update_linedata(response.data.slice(0, response.data.length - 1))
        }, error => {
            console.log('失败了',error);
            // alert('当前日期没有数据，请更换')
        })


  }

    loadAlgorithms = ()=>{
        axios.post(`/algorithmspic`).then(
            response => {
                console.log(response.data)
                this.props.get_algorithms_pic(response.data)
            },
            error => {
                console.log('失败了',error);
            }
        )
    }


    loadProperties = ()=>{
        // this.props.update_properties(1)
        axios.post(`/prodata`,).then(response => {
              const ProData = {
                  data: Processors.processGeojson(response.data),
                  info: {
                      label: 'Routes',
                      id: 'bk4x78l5m'
                  }
              };
              leftdataStore.dispatch(update_left_data(ProData))
          },
              error => {
                console.log('失败了',error);
                alert('当前日期没有数据，请更换')
            }
          )

        axios.post(`/staticvalue`,).then(response => {
            console.log(response.data)
              this.props.get_static_value(response.data)
          },
              error => {
                console.log('失败了',error);
                alert('当前日期没有数据，请更换')
            }
          )
    }

    render() {
        return (
            <div>
                <Avatar size="large" icon={<AntDesignOutlined />}/>
                    <Row>
                        <Menu
                            defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark" style={{ width: '14.2em' }}>
                            <Menu.Item key="1" onClick={this.getMapdata} icon={<PieChartOutlined />}>
                                <Link to="/basic_data" >基础数据</Link>
                                </Menu.Item>
                                <SubMenu key="sub1" icon={<MailOutlined />} title="客流分析">
                                <Menu.Item key="2">
                                  <Link onClick={()=>{this.loadStation()}} to="/flow_analysis">站点客流</Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                  <Link onClick={()=>{this.loadRoute()}} to="/flow_analysis">线路客流</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                  <Link onClick={()=>{this.loadRegion()}} to="/flow_analysis">区域客流</Link>
                                </Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="线网优化">
                                    <Menu.Item key="5">
                                        <Link onClick={()=>{this.loadAlgorithms()}} to="/algorithms">算法库</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <Link to="/optimizations">优化项目</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<ContainerOutlined />} title="线网评估">
                                    <Menu.Item key="7">
                                        <Link onClick={()=>{this.loadProperties()}} to="/Network_properties">线网静态指标</Link>
                                    </Menu.Item>
                                    <Menu.Item key="8">
                                        <Link to="/Network_load">线网负荷水平</Link>
                                    </Menu.Item>
                                    <Menu.Item key="9">
                                        <Link to="/Network_SD">供需分析</Link>
                                    </Menu.Item>
                                </SubMenu>
                        </Menu>
                    </Row>
            </div>
        )
    }
}
export default connect(
    state => ({
        selectdisplay: state.selectdisplay,
        date: state.date
    }),
    {get_map_data, update_regionname, update_linedata, get_algorithms_pic, get_static_value, update_left_data, update_station_data,update_route_data,update_region_data,update_station_select,update_route_select,update_region_select, update_properties, update_load, update_SD}
)(Sidemenu)