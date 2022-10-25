import React, { Component } from 'react'
import Header from '../../Header'
import DataUpload from './DataUpload'
import InputData from './InputData'
import OthersData from './OthersData'
import SelectCity from './DataUpload/SelectCity'
import { Breadcrumb, Col, Divider, Layout, Row, Space } from 'antd'
const { Content } = Layout

export default class Basic_database extends Component {
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
                        <h1 style={{ fontsize: '30px' }}>基础数据</h1>
                    </Row>
                    <Row>
                        <Breadcrumb style={{ margin: '1vh 4vh 0vh' }}>
                            <Breadcrumb.Item>主页 </Breadcrumb.Item>
                            <Breadcrumb.Item>基础数据</Breadcrumb.Item>
                        </Breadcrumb>
                        <Divider />
                    </Row>
                    <Row style={{ margin: '1vh 4vh 4vh' }}>
                        <Col span={4}>
                            线网数据
                        </Col>
                        <Col offset={12}>
                            <Space size='small'>
                                <SelectCity />
                                <DataUpload/>
                            </Space>
                        </Col>
                        <Divider />
                        <InputData/>
                    </Row>
                    <Row style={{ margin: '1vh 4vh 4vh' }}>
                        <Col>
                            其他数据
                        </Col>
                        <Divider />
                        <OthersData/>
                    </Row>
                </Content>
            </div>
        )
    }
}
