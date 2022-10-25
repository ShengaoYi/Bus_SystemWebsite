import React, { Component } from 'react'
import { Card,Row } from 'antd'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";

const { Meta } = Card
class AlgorithmDisplayPanel extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Link to="/GA_Details">
                        <Card
                            hoverable
                            style={{ width: 240 ,margin:20, height: 300}}
                            cover={<img alt="example" src={"data:image/jpeg;base64,"+ this.props.algorithms_pic.GA} />}
                        >
                            <Meta title="遗传算法" description="" />
                        </Card>
                    </Link>

                    <Link to="/LNS_Details">
                        <Card
                            hoverable
                            style={{ width: 240 ,margin:20, height: 300}}
                            cover={<img alt="example" src={"data:image/jpeg;base64,"+ this.props.algorithms_pic.LNS} />}
                        >
                            <Meta title="大规模领域搜索" description="" />
                        </Card>
                    </Link>

                    <Link to="/TS_Details">
                        <Card

                            hoverable
                            style={{ width: 240 ,margin:20, height: 300}}
                            cover={<img alt="example" src={"data:image/jpeg;base64,"+ this.props.algorithms_pic.TS} />}
                        >
                            <Meta title="禁忌搜索算法" description="" />
                        </Card>
                    </Link>

                    <Link to="/Ant_Details">
                        <Card
                            hoverable
                            style={{ width: 240 ,margin:20, height: 300}}
                            cover={<img alt="example" src={"data:image/jpeg;base64,"+ this.props.algorithms_pic.ANT} />}
                        >
                            <Meta title="蚁群算法" description="" />
                        </Card>
                    </Link>

                    
                    </Row> 
            </div>
        )
    }
}

export default connect(
    state => ({
        algorithms_pic: state.algorithms_pic,
    }),
    {}
)(AlgorithmDisplayPanel)
