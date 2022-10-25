import createG2 from 'g2-react';
import React, { Component } from 'react';
import './index.css'
import * as G2 from '@antv/g2';
// import { Line } from '@antv/g2plot';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import { Bar } from '@antv/g2plot';

import {Select, Button, Slider, Input, Space, InputNumber, Row, Col} from "antd";
import axios from "axios";
import {connect} from "react-redux";
import {serach_station_name} from "../../redux/actions/search_stationname";
import {update_linedata} from "../../redux/actions/update_linedata";
import {update_bardata} from "../../redux/actions/update_bardata";
import {update_stationname} from "../../redux/actions/update_stationname";
import {update_timeindex} from "../../redux/actions/update_timeindex";
import {update_regionname} from "../../redux/actions/update_regionname";
import {update_sankey} from "../../redux/actions/update_sankey";

const Line = createG2(chart => {
  chart.line().position('时间*数量').color('类型').shape('spline').size(3);
  chart.render();
});

const { Option } = Select;

const format = 'HH:mm';
const format2 = 'HH';

const { Search } = Input;


const onSearch = value => console.log(value);


const marks = {
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
    13: '13',
    14: '14',
    15: '15',
    16: '16',
    17: '17',
    18: '18',
    19: '19',
    20: '20',
    21: '21',
    22: '22',
    23: '23',
    24: '24',
};


class Charts extends Component {
    state = {
        station: '',
        line_data: [],
        width: 550,
        height: 250,
        plotCfg: {
            margin: [30, 50, 50, 80],
        },
        inputValue: "7:00",
        searchval: '',
    }


    timeChange = value => {
        const timeString = value.toString()+':00'
        console.log(timeString)

        this.setState({
          inputValue: timeString,
        });

        this.props.update_timeindex(timeString)

        const form_bar = {
            date: this.props.date.date,
            time: timeString,
            name: this.props.cur_routename.cur_routename,
        }

        axios.post(`/routebar`,{
            form_bar
        }).then(response => {
            console.log(response.data)
            this.props.update_bardata(response.data)

            var echarts = require('echarts')
            var barChart = echarts.init(document.getElementById('barchart'));

            barChart.setOption({
                title: {
                    text: '该时刻各站点客流情况',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    x:'right',
                    y:' center',
                    data: ['下车人数', '上车人数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                        type: 'category',
                        data: this.props.bardata.station
                },
                series: [
                    {
                        name: '下车人数',
                        type: 'bar',
                        data: this.props.bardata.down
                    },
                    {
                        name: '上车人数',
                        type: 'bar',
                        data: this.props.bardata.up
                    }
                ]
            })

        }, error => {
            console.log('失败了',error);
            // alert('当前日期没有数据，请更换')
        })
      };

    nameChange = (value)=>{
        this.setState({station: value})
        this.props.update_stationname(value)
        // const form = {
        //     name:value,
        //     date:this.props.date.date
        // }
        // axios.post(`/stationdiagram`,{
        //     form
        // }).then(response => {
        //     this.props.update_linedata(response.data.slice(0, response.data.length - 1))
        // }, error => {
        //     console.log('失败了',error);
        //     // alert('当前日期没有数据，请更换')
        // })

    }

    range = (start, end) => {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    }

    disabledRangeTime = () => {
        return {
            disabledHours: () => this.range(0, 11).splice(0, 11)
        };
    }

    disabledDateTime = () => { // date是选择的日期, moment对象
        return {
          disabledHours: () => this.range(0, 24).splice(0, 24),
          disabledMinutes: () => this.range(0, 60),
          disabledSeconds: () => this.range(0, 60)
        }
    }

    regionChange = (value) => {
        //
        //  更新region的值
        //
        this.props.update_regionname(value)

        const form_region_line = {
            date: this.props.date.date,
            region: value
        }

        axios.post(`/regionline`,{
            form_region_line
        }).then(response => {
            console.log(response.data)
            this.props.update_linedata(response.data.slice(0, response.data.length - 1))
        }, error => {
            console.log('失败了',error);
            // alert('当前日期没有数据，请更换')
        })
    }

    sankey_timeChange =(data,dataString) => {
        console.log(data, dataString[0])
        const form = {
            date:this.props.date.date,
            start_time: dataString[0],
            end_time: dataString[1],
         }
        console.log(form)
        axios.post(`/regionsankey`,{
          form
        }).then(response => {
            this.props.update_sankey(response.data)
            console.log(response.data)
            var echarts = require('echarts')
            var sankey = echarts.init(document.getElementById('sankey'));
            sankey.setOption({
                series: {
                    type: 'sankey',
                    layout: 'none',
                    emphasis: {
                        focus: 'adjacency'
                    },
                    data: this.props.sankey.region,
                    links: this.props.sankey.data,
                }
            })

            }, error => {
              console.log('失败了',error);
              // alert('当前日期没有数据，请更换')
        })
    }

    onSearch =(val)=> {
        const form = {search:val, date:this.props.date.date}

        axios.post(`/stationname`,{
          form
        }).then(response => {
              console.log(response.data)
              this.props.serach_station_name(response.data)
            }, error => {
              console.log('失败了',error);
              // alert('当前日期没有数据，请更换')
        })
    }

    onButton = () =>{
        const value = this.props.cur_stationname.cur_stationname
        const form = {
            name:value,
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

    tazChange = (value) => {
        //
        //  更新taz的名称
        //

    }

    onSankey = (value) => {
        console.log(value)
        const form = {
            date:this.props.date.date,
            start_time: value[0],
            end_time: value[1],
         }
        console.log(form)
        axios.post(`/regionsankey`,{
          form
        }).then(response => {
            this.props.update_sankey(response.data)
            console.log(response.data)
            var echarts = require('echarts')
            var sankey = echarts.init(document.getElementById('sankey'));
            sankey.setOption({
                series: {
                    type: 'sankey',
                    layout: 'none',
                    emphasis: {
                        focus: 'adjacency'
                    },
                    data: this.props.sankey.region,
                    links: this.props.sankey.data,
                }
            })

            }, error => {
              console.log('失败了',error);
              // alert('当前日期没有数据，请更换')
        })

    }

    onAfterSankey = (value) => {
        // console.log(value)
    }

    componentDidMount() {
        const form_bar = {
            date: this.props.date.date,
            time: this.props.timeindex.timeindex,
            name: this.props.cur_routename.cur_routename,
        }
        var echarts = require('echarts')

        axios.post(`/routebar`,{
            form_bar
        }).then(response => {
            console.log(response.data)
            this.props.update_bardata(response.data)


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

        const form = {
            date:this.props.date.date,
            start_time: '7',
            end_time: '8',
         }
        console.log(form)

        axios.post(`/regionsankey`,{
          form
        }).then(response => {
            this.props.update_sankey(response.data)
            console.log(response.data)

            var sankey = echarts.init(document.getElementById('sankey'));
            sankey.setOption({
                title: {
                    text: '流量流向'
                },
                grid: [{
                    left: 50,
                    // right: '10%'
                }],
                series: {
                    type: 'sankey',
                    layout: 'none',
                    emphasis: {
                        focus: 'adjacency'
                    },

                    data: this.props.sankey.region,
                    links: this.props.sankey.data,
                }
            })

            }, error => {
              console.log('失败了',error);
              // alert('当前日期没有数据，请更换')
        })
    }



    render() {
        return (
            <div>
                <Space>
                    <span style={{display: this.props.selectdisplay.stationselect}}>站点名称</span>
                    <Select
                        showSearch
                        style={{ width: 329, display: this.props.selectdisplay.stationselect }}
                        placeholder="请输入站点名称如”金荣达工业园“"
                        value={this.props.cur_stationname.cur_stationname}
                        optionFilterProp="children"
                        onChange={this.nameChange}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                          this.props.stationname.map((station)=>{
                            return <Option value={station}>{station}</Option>
                          })
                        }
                    </Select>
                    <Button type="primary" onClick={this.onButton} style={{ display: this.props.selectdisplay.stationselect }}>
                        搜索
                    </Button>
                </Space>

                <Space>
                    <Select
                            showSearch
                            style={{ width: 150, display: this.props.selectdisplay.regionselect}}
                            defaultValue={"宝安"}
                            placeholder="行政区名称"
                            optionFilterProp="children"
                            onChange={this.regionChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Baoan">宝安</Option>
                            <Option value="Nanshan">南山</Option>
                            <Option value="Futian">福田</Option>
                            <Option value="Luohu">罗湖</Option>
                            <Option value="Longgang">龙岗</Option>
                            <Option value="Yantian">盐田</Option>
                            <Option value="Longhua">龙华</Option>
                            <Option value="Pingshan">坪山</Option>
                            <Option value="Guangming">光明</Option>
                    </Select>
                </Space>

                <br style={{display: this.props.selectdisplay.stationselect}}/>
                <br style={{display: this.props.selectdisplay.stationselect}}/>

                <Space>
                    <Select
                        showSearch
                        style={{ width: 120, display: this.props.selectdisplay.stationselect }}
                        placeholder="站点分类"
                        optionFilterProp="children"
                        onChange={this.onSearch}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Number">数字</Option>
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="C">C</Option>
                        <Option value="D">D</Option>
                        <Option value="E">E</Option>
                        <Option value="F">F</Option>
                        <Option value="G">G</Option>
                        <Option value="H">H</Option>
                        <Option value="I">I</Option>
                        <Option value="J">J</Option>
                        <Option value="K">K</Option>
                        <Option value="L">L</Option>
                        <Option value="M">M</Option>
                        <Option value="N">N</Option>
                        <Option value="O">O</Option>
                        <Option value="P">P</Option>
                        <Option value="Q">Q</Option>
                        <Option value="R">R</Option>
                        <Option value="S">S</Option>
                        <Option value="T">T</Option>
                        <Option value="U">U</Option>
                        <Option value="V">V</Option>
                        <Option value="W">W</Option>
                        <Option value="X">X</Option>
                        <Option value="Y">Y</Option>
                        <Option value="Z">Z</Option>
                    </Select>
                    <Select
                        showSearch
                        style={{ width: 200, display: this.props.selectdisplay.stationselect }}
                        placeholder="站点名称"
                        optionFilterProp="children"
                        onChange={this.nameChange}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                          this.props.stationname.map((station)=>{
                            return <Option value={station}>{station}</Option>
                          })
                        }
                    </Select>
                </Space>
                {/*<Select*/}
                {/*    showSearch*/}
                {/*    style={{ width: 150, display: this.props.selectdisplay.regionselect, left:100}}*/}
                {/*    placeholder="Taz名称"*/}
                {/*    optionFilterProp="children"*/}
                {/*    onChange={this.tazChange}*/}
                {/*    // onSearch={}*/}
                {/*    filterOption={(input, option) =>*/}
                {/*        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                {/*    }*/}
                {/*>*/}
                {/*    <Option value="112.0">112.0</Option>*/}
                {/*</Select>*/}
                <Line
                    data={this.props.linedata.linedata}
                    width={this.state.width}
                    height={this.state.height}
                    plotCfg={this.state.plotCfg}
                />

                {/*<div id="test" style={{ width: 500, display: this.props.selectdisplay.routeselect }}/>*/}

                <div style={{ display: this.props.selectdisplay.routeselect}}>
                    <Row>
                        <Col span={24}>
                            <Slider
                                min={7}
                                max={24}
                                onChange={this.timeChange}
                                marks={marks}
                            />
                        </Col>
                    </Row>
                </div>


                {/*<TimePicker.RangePicker disabledTime={this.disabledDateTime} onChange={this.sankey_timeChange} minuteStep={30} format={format2} className={(this.props.selectdisplay.regionselect === 'block') ? 'show':'hide_sankey'}/>*/}
                <Slider className={(this.props.selectdisplay.regionselect === 'block') ? 'show':'hide_sankey'}
                    range
                    step={1}
                    marks={marks}
                    defaultValue={[7, 8]}
                    onChange={this.onSankey}
                    min={7}
                    max={24}
                    onAfterChange={this.onAfterSankey}
                />

                <div id="barchart" style={{ width: 500, height: 1000, display: this.props.selectdisplay.routeselect }} />
                <div id="sankey" style={{ width: 500, height: 800, display: this.props.selectdisplay.regionselect }} />
        </div>
      );
    }
}
export default connect(
    state =>({
        date: state.date,
        stationname: state.stationname,
        cur_stationname: state.cur_stationname,
        cur_routename: state.cur_routename,
        selectdisplay: state.selectdisplay,
        linedata: state.linedata,
        bardata: state.bardata,
        sankey: state.sankey,
        type: state.type,
        timeindex: state.timeindex,
    }),
    {serach_station_name, update_linedata, update_bardata, update_timeindex, update_stationname, update_regionname, update_sankey}
)(Charts)
