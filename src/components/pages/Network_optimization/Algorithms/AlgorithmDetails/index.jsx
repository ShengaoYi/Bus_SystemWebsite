import React, { Component } from 'react'
import Header from '../../../../Header'
import { Breadcrumb, Divider, Layout, Row, Col } from 'antd'
const { Content } = Layout
export default class AlgorithmDetails extends Component {
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
                            <Breadcrumb.Item>具体算法</Breadcrumb.Item>
                        </Breadcrumb>
                        <Divider />
                    </Row>
                    <Row style={{ margin: '1vh 4vh 4vh' }}>
                        <Col>
                            <img alt={'Algorithm'} src={'../logo.png'} width={360} />
                        </Col>
                        <Col>
                            <Row style={{ margin: '1vh 4vh 4vh' }}>
                                 算法名称
                            </Row>

                            <Row style={{ margin: '1vh 4vh 4vh' }}>
                                简介
                            </Row>
                        </Col>
                        
                        
                    </Row>
                    <Divider orientation="left">输入</Divider>
                    <Row style={{ margin: '4vh 16vh 4vh' }}>
                        这里写输入
                        

                    </Row>
                    <Divider orientation="left">输出</Divider>
                    <Row style={{ margin: '4vh 16vh 4vh' }}>

                        这里写输出

                    </Row>

                    <Divider orientation="left">算法原理</Divider>
                    <Row style={{ margin: '4vh 16vh 4vh' }}>

                        这里写算法原理

                    </Row>

                    <Divider orientation="left">参考文献</Divider>
                    <Row style={{ margin: '4vh 16vh 4vh' }}>

                        这里写参考文献

                    </Row>

                </Content>
            </div>
        )
    }
}
