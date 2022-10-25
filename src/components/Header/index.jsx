import React from "react";
import { TeamOutlined ,MessageOutlined,StarFilled} from '@ant-design/icons'
import { Layout ,Button,Row,Col} from 'antd';
const { Header } = Layout;

export default class Myheader extends React.Component{
    render() {
        return(
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <Row>
                    <Col offset={20}>
                        <Button key="3"><TeamOutlined /></Button>
                        <Button key="2"><MessageOutlined /></Button>
                        <Button key="1">
                            <StarFilled />
                        </Button>
                    </Col>
                   
                </Row>
            </Header>
        )
    }

}