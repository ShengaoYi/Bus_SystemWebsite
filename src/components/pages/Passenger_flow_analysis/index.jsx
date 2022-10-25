import React, {Component} from 'react';
import {Drawer, Button, Select} from 'antd';
import {AreaChartOutlined} from '@ant-design/icons';
import './index.css'
import Map from "../../Map";
import Datepicker from "../../Datepicker";
import RouteSelect from "../../Selection";
import RegionSelect from "../../Selection/region_select.jsx"
import Charts from "../../Charts";


export default class Flow_analysis extends Component {
    state = { drawervisible: false };

    showDrawer = () => {
        this.setState({
            drawervisible: true,
        });
    };

    onClose = () => {
        this.setState({
          drawervisible: false,
        });
    };


    render() {
        return (
            <div className="site-drawer-render-in-current-wrapper">
                <Map/>
                <div className="icons-list" style={{position:"absolute", right:11, top:213, height: 40, width: 32, padding: "4px 0"}}>
                    <Button type="primary" icon={<AreaChartOutlined />} style={{backgroundColor: "#29323C", height: 32, width: 32, border: 0, margin: 0, boxShadow: "0 6px 12px 0 rgb(0 0 0 / 16%)", color: "#6A7485"}} onClick={this.showDrawer}/>
                </div>
                <Datepicker/>
                <RouteSelect/>
                <RegionSelect/>
                <Drawer
                    title="客流统计"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.drawervisible}
                    getContainer={false}
                    style={{ position: 'absolute'}}
                    width={600}
                >
                    <Charts/>
                </Drawer>
            </div>
        );
    }
}
