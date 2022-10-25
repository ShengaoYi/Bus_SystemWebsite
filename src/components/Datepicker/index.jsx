import React, {Component} from 'react';
import { DatePicker, Space } from 'antd';
import axios from "axios";
import Processors from "kepler.gl/processors";
import dataStore from "../../redux/dataStore";
import moment from 'moment';
import {connect} from "react-redux";

import {update_date} from "../../redux/actions/update_date";
import {update_station_data, update_route_data, update_region_data} from "../../redux/actions/update_data";
import {update_linedata} from "../../redux/actions/update_linedata";

const dateFormat = 'YYYY-MM-DD';

class Datepicker extends Component {
    onChange = (date, dateString) => {
        this.props.update_date(dateString)
        if (this.props.cur_stationname.cur_stationname !== 'none')
        {
            const form = {
                name:this.props.cur_stationname.cur_stationname,
                date:dateString
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
        if (this.props.selectdisplay.stationselect === 'block')
        {
            axios.post(`/stationdata`,{
                date: dateString,
            }).then(response => {
                const data = response.data
                const BusPointData = {
                    data: data,
                    info: {
                        label: 'Bus Stops',
                        id: 'stop_heatmap'
                    }
                };
                dataStore.dispatch(update_station_data(BusPointData))
                }, error => {
                    console.log('失败了',error);
                    alert('当前日期没有数据，请更换')
                }
            )
        }
        else if(this.props.selectdisplay.routeselect === 'block')
        {
            const form_line = {
                date: dateString,
                name: this.props.cur_routename.cur_routename,
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

        }
        else if(this.props.selectdisplay.regionselect === 'block')
        {
            if (this.props.type.type === 'region')
            {
                axios.post(`/regiondata`,{
                    date: dateString,
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
                },error => {
                    console.log('失败了',error);
                    alert('当前日期没有数据，请更换')
                }
              )
            }
            else {
                axios.post(`/tazdata`,{
                    date: dateString,
                }).then(response => {
                    const TazData = {
                        data: Processors.processGeojson(response.data),
                        info: {
                            label: 'Taz',
                            // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
                            // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
                            id: 'region'
                        }
                    };
                    console.log(TazData)
                    dataStore.dispatch(update_region_data(TazData))
                }, error => {
                    console.log('失败了',error);
                    alert('当前日期没有数据，请更换')
                }
              )
            }
        }
    }
    render() {
        return (
            <div style={{position:"absolute", right:80, top:17, backgroundColor:"black"}}>
                <Space direction="vertical">
                    <DatePicker defaultValue={moment('2017-09-18', dateFormat)} format={dateFormat} onChange={this.onChange}/>
                </Space>
            </div>
        );
    }
}

export default connect(
    state =>({
        selectdisplay: state.selectdisplay,
        type: state.type,
        cur_stationname: state.cur_stationname,
        cur_routename: state.cur_routename,
        date: state.date,
    }),
    {update_date, update_linedata}
)(Datepicker);