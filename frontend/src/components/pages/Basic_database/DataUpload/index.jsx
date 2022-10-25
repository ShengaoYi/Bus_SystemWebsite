import React, { useState } from 'react';
import { Modal, Button, Steps, message, Upload, Table, Radio, Row, Divider, Space, Icon,Col } from 'antd';
import { connect } from "react-redux";
import FileUpload from './FileUpload'
import { Input } from 'antd';
import CitySelector from "../../../CitySelector";
import { update_filedata } from "../../../../redux/actions/update_filedata";
import {get_map_data} from "../../../../redux/actions/get_map_data";
import axios from "axios";

const { Dragger } = Upload;

const { TextArea } = Input;

const { Step } = Steps;

const steps = [
    {
        title: '上传数据',
        content: 'First-content',
    },
    {
        title: '数据预览',
        content: 'Second-content',
    },
    {
        title: '数据设置',
        content: 'Last-content',
    },
];




const DataUpload = (props) => {

    //选择器选择值
    const [Data_form, setDataForm] = React.useState(1);
    const [coordinate, setCoordinate] = React.useState(1);
    const [is_open, setOpenState] = React.useState(1);

    const [Data_name,setDataName] = React.useState(null);
    const [Data_description,setDataDescription] = React.useState(null);

    const DataName = e => {
        console.log('Input checked', e.target.value);
        setDataName(e.target.value);
    };
    const DataDescription= e => {
        console.log('Textarea checked', e.target.value);
        setDataDescription(e.target.value);
    };

    //模态框方法
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        clear();
        setIsModalVisible(false);
        props.update_filedata({})
        const my_props = {
            type: Data_form,
            coor: coordinate,
            open: is_open,
            name: Data_name,
            description: Data_description,
        }
        console.log(props.file.file)
        axios.post(`/upload`, {
            'file': props.file.file,
            'props': my_props
        }).then(response => {
            console.log(response)
        }, error => {
            console.log('失败了', error);
            // alert('当前日期没有数据，请更换')
        })
        axios.get(`/mapdata`).then(
            response => {
                props.get_map_data(response.data)
            },
            error => {
                console.log('失败了',error);
            }
        )
    };

    const handleCancel = () => {
        clear();
        setIsModalVisible(false);
    };
    //分页方法
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        // console.log('props',props.filedata)
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const clear = () => {
        setCurrent(0);
        setDataForm(1);
        setCoordinate(1);
        setOpenState(1);
        setDataName(null);
        setDataDescription(null);
    }
    const DataForm = e => {
        console.log('radio checked', e.target.value);
        setDataForm(e.target.value);
    };

    const Coordinates = e => {
        console.log('radio checked', e.target.value);
        setCoordinate(e.target.value);
    };
    const Open = e => {
        console.log('radio checked', e.target.value);
        setOpenState(e.target.value);
    }


    return (
        <>
            <Button type="primary" onClick={showModal}>
                上传数据
      </Button>
            <Modal width={900} title="上传数据" visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <div className="steps-action">
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                上一步
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                下一步
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => {
                                clear();
                                handleOk();
                                message.success('Processing complete!');
                                setIsModalVisible(false);
                            }}>
                                提交
                            </Button>
                        )}

                    </div>
                ]}
            >
                <Steps size="small" current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content" style={{ margin: '4vh 4vh 4vh' }}>
                    {steps[current].content === 'First-content' &&
                        (
                            <FileUpload />
                        )}
                    {steps[current].content === 'Second-content' && <Table columns={props.filedata.filedata.columns} dataSource={props.filedata.filedata.data} size="middle" />}
                    {steps[current].content === 'Last-content' &&
                        <div>
                            <Divider orientation="left">数据信息</Divider>
                            <Row style={{paddingTop:'20px'}}>
                                <Col offset={4}>
                                    <p>文件名称：</p>
                                </Col>
                                <Col span={8}>
                                    <Input onChange={DataName} value={Data_name} placeholder="在此输入文件名称" allowClear />
                                </Col>

                            </Row>
                            <br />
                            <br />
                            <Row style={{paddingBottom:'20px'}}>
                                <Col offset={4} >
                                    <p>文件描述：</p>
                                </Col>

                                <Col span={12}>
                                    <TextArea onChange={DataDescription} value={Data_description} rows={4} placeholder="对文件进行简单描述" allowClear />
                                </Col>

                            </Row>

                            <Divider orientation="left">数据类型</Divider>
                            <Row justify="space-around" style={{ margin: '4vh 4vh 4vh' }}>
                                <Radio.Group onChange={DataForm} value={Data_form}>
                                    <Space size='large'>
                                        <Radio value={"Network"}>线网数据</Radio>
                                        <Radio value={"Basic"}>基础图层</Radio>
                                        <Radio value={"POI"}>POI数据</Radio>
                                        <Radio value={"Station"}>站点数据</Radio>
                                    </Space>
                                </Radio.Group>
                            </Row>

                            <Divider orientation="left">选择坐标系</Divider>
                            <Row justify="space-around" style={{ margin: '4vh 4vh 4vh' }}>
                                <Radio.Group onChange={Coordinates} value={coordinate}>
                                    <Space size='large'>
                                        <Radio value={"GCJ02"}>GCJ02坐标系</Radio>
                                        <Radio value={"CGCS2000"}>CGCS2000坐标系</Radio>
                                        <Radio value={"WGS84"}>WGS84坐标系</Radio>
                                        <Radio value={"Baidu"}>百度坐标系</Radio>
                                    </Space>
                                </Radio.Group>
                            </Row>

                            <Divider orientation="left">选择城市</Divider>
                            <Row justify="space-around" style={{ margin: '4vh 4vh 4vh' }}>
                                <CitySelector/>
                            </Row>

                            <Divider orientation="left">是否公开</Divider>
                            <Row justify="space-around" style={{ margin: '4vh 4vh 4vh' }}>
                                <Radio.Group onChange={Open} value={is_open}>
                                    <Space size='large'>
                                        <Radio value={"y"}>公开</Radio>
                                        <Radio value={"n"}>私密</Radio>
                                    </Space>
                                </Radio.Group>
                            </Row>
                        </div>
                    }
                </div>

            </Modal>
        </>
    );
}

export default connect(
    state => ({
        filedata: state.filedata,
        file: state.file,
    }),
    { update_filedata, get_map_data }
)(DataUpload)