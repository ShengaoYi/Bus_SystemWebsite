import React, { Component } from 'react'
import Header from '../../../Header'
import { Breadcrumb, Layout,Col,Row,Divider } from 'antd'
import NewOptimization from './NewOptimization'
import OptimizationProjects from './OptimizationsProjects'
const { Content } = Layout
export default class Optimizations extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content className="site-layout-background" style={{
                    margin: '24px 16px',

                    padding: 0,
                    minHeight: 280,

                }}
                >
                    <Row style={{ margin: '2vh 3vh 0vh ' }}>
                        <h1 style={{ fontsize: '30px' }}>线网优化</h1>

                    </Row>
                    <Row>
                        <Breadcrumb style={{ margin: '1vh 4vh 0vh' }}>
                            <Breadcrumb.Item>主页 </Breadcrumb.Item>
                            <Breadcrumb.Item>线网优化</Breadcrumb.Item>
                            <Breadcrumb.Item>优化项目</Breadcrumb.Item>
                        </Breadcrumb>
                        <Divider />
                    </Row>
                    <Row style={{ margin: '1vh 4vh 4vh' }}>
                        <Col>
                            我的项目
                        </Col>
                        <Col>
                           <NewOptimization/>
                        </Col>
                        <Divider />
                        
                    </Row>
                    <Row style={{ margin: '1vh 4vh 4vh' }}>
                        <OptimizationProjects/>
                    </Row>
                    
                </Content>
            </div>


        )
    }
}
