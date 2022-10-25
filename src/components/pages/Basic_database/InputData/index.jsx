import React, { Component } from 'react'
import {Card, Col, Row, Modal, Button } from 'antd'
import {connect} from "react-redux";
import dataStore from "../../../../redux/dataStore";
import axios from "axios";

import {update_modal_data} from "../../../../redux/actions/update_data";
import Map from "../../../Map";
import Processors from "kepler.gl/processors";
const { Meta } = Card

class InputData extends Component {
    state = {
        isModalVisible: false,
    }
    showModal = (name) => {
        this.setState({isModalVisible: true})
        console.log(name)
        axios.post(`/modaldata`,{
              name
          }).then(response => {
              const ModalData = {
                  data: Processors.processGeojson(response.data),
                  info: {
                    label: 'data',
                    // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
                    // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
                    id: 'bk4x78l5m'
                  }
              };
              console.log(ModalData)
              dataStore.dispatch(update_modal_data(ModalData))
          }, error => {
                console.log('失败了',error);
                // alert('当前日期没有数据，请更换')
            })

    };

    handleOk = () => {
        this.setState({isModalVisible: false})
    };

    handleCancel = () => {
        this.setState({isModalVisible: false})
    };


    render() {
        return (
            <div className="site-card-wrapper">
                <Row gutter={16}>
                {
                    this.props.mapdata.input.map((dataObj)=>{
                        return(
                            <div>
                                <Col span={8}>
                                    <Card  onClick={() => this.showModal(dataObj.name)} hoverable style={{ width: 240, height: 300 }} cover={<img alt="map" src={"data:image/jpeg;base64,"+ dataObj.pic} />}>
                                        <Meta title={dataObj.name} description={dataObj.describe}/>
                                    </Card>
                                </Col>
                                <Modal width={1200} title="预览图" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                                    <Map/>
                                </Modal>
                            </div>
                        )
                    })
                }
                </Row>
            </div>
        )
    }
}
export default connect(
    state => ({
        mapdata:state.mapdata,
    }),
    {update_modal_data}
)(InputData)