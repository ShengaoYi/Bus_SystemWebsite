import React from 'react';
import {Provider} from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from 'antd';
import Sidemenu from './components/Sidemenu';
import store from './redux/store'

import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import Basic_database from "./components/pages/Basic_database";

import Flow_analysis from "./components/pages/Passenger_flow_analysis";
import Algorithms from "./components/pages/Network_optimization/Algorithms";
import GA_Details from "./components/pages/Network_optimization/Algorithms/GA_Details";
import LNS_Details from "./components/pages/Network_optimization/Algorithms/LNS_Details";
import TS_Details from "./components/pages/Network_optimization/Algorithms/TS_Details";
import ANT_Details from "./components/pages/Network_optimization/Algorithms/ANT_Details";
import Optimizations from "./components/pages/Network_optimization/Optimizations";
import Network_properties from "./components/pages/Network_assessment/Network_properties";
import Network_properties_compare from "./components/pages/Network_assessment/Network_properties/compare";
import Network_load from "./components/pages/Network_assessment/Network_load";
import Network_SD from "./components/pages/Network_assessment/Network_SD";


const { Sider } = Layout;

export default class App extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div>
                <Provider store={store}>
                    <BrowserRouter>
                        <Layout className="all_layout">
                            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                                <div className="logo" />
                                <Sidemenu />
                            </Sider>
                            <Layout className="site-layout" style={{overflow:'auto'}}>
                                <Route path="/basic_data" component={Basic_database}/>
                                <Route path="/flow_analysis" component={Flow_analysis}/>
                                <Route path="/algorithms" component={Algorithms}/>
                                <Route path="/GA_details" component={GA_Details}/>
                                <Route path="/LNS_details" component={LNS_Details}/>
                                <Route path="/TS_details" component={TS_Details}/>
                                <Route path="/ANT_details" component={ANT_Details}/>
                                <Route path="/optimizations" component={Optimizations}/>
                                <Route path="/Network_properties" component={Network_properties}/>
                                <Route path="/Network_properties_compare" component={Network_properties_compare}/>
                                <Route path="/Network_load" component={Network_load}/>
                                <Route path="/Network_SD" component={Network_SD}/>
                                <Redirect to="/basic_data"/>
                            </Layout>
                        </Layout>
                    </BrowserRouter>
                </Provider>
            </div>
        )
    }
}


