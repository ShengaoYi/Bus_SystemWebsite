import React, { Component } from 'react'
import Header from '../../../Header'
import { Breadcrumb, Layout, Row, Col, Divider } from 'antd'

import AlgorithmDisplayPanel from './AlgorithmDisplayPanel'
const { Content } = Layout
export default class Algorithms extends Component {
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
                            <Breadcrumb.Item>算法库</Breadcrumb.Item>
                        </Breadcrumb>
                        <Divider />
                    </Row>
                    <Row style={{ margin: '1vh 4vh 4vh' }}>
                        <Col>
                            算法库
                        </Col>
                        <Divider />
                    </Row>
                    <Row style={{ margin: '0vh 4vh 4vh' }}>
                        <AlgorithmDisplayPanel />
                    </Row>

                </Content>
            </div>


        )
    }
}
