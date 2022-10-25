import React, { Component } from 'react';
import { Upload, Button, Icon, Table, message } from 'antd';
import Papa from 'papaparse'; // 解析cvs插件 市面上使用较多的
import jschardet from 'jschardet'; // 编码识别
import { InboxOutlined } from '@ant-design/icons';
import {update_filedata} from "../../../../../redux/actions/update_filedata";
import {connect} from "react-redux";
import {update_file} from "../../../../../redux/actions/update_file";

const { Dragger } = Upload

let file_columns = [];

let file_data = [];


class FileUpload extends Component {
    // 检查编排
    checkEncoding = (base64Str) => {
        //这种方式得到的是一种二进制串
        const str = atob(base64Str.split(";base64,")[1]); // atob  方法 Window 对象 定义和用法 atob() 方法用于解码使用 base-64 编码的字符
        //要用二进制格式
        let encoding = jschardet.detect(str);
        encoding = encoding.encoding;
        // 有时候会识别错误
        if (encoding === "windows-1252") {
            encoding = "ANSI";
        }
        return encoding;
    }
    render() {
        const _this = this;

        const file_props = {
            beforeUpload: file => {
                const fReader = new FileReader();
                // fReader.readAsDataURL(file); //  readAsDataURL 读取本地文件 得到的是一个base64值
                fReader.readAsText(file)
                fReader.onload = function (evt) {// 读取文件成功
                    console.log(fReader.result)
                    // const data = evt.target.result;
                    // const encoding = _this.checkEncoding(data);
                    // console.log(data)
                    // console.log(encoding)
                    // //papaparse.js 用来解析转换成二维数组
                    // Papa.parse(file, {
                    //     encoding: encoding,
                    //     complete: function (results) {        // UTF8 \r\n与\n混用时有可能会出问题
                    //         const res = results.data;
                    //         console.log(res)
                    //         if (res[res.length - 1] === "") {    //去除最后的空行 有些解析数据尾部会多出空格
                    //             res.pop();
                    //         }
                    //
                    //         const keys = res.shift();
                    //         const total = {
                    //             name: file.name,
                    //             key: keys,
                    //             data: res,
                    //         }
                    //         _this.props.update_file(total)
                    //         console.log(total)
                    //
                    //         //
                    //         //keys 形成 表头格式如下：
                    //         //
                    //         file_columns = [];
                    //         keys.forEach((value) => {
                    //             const temp = {};
                    //             temp['title'] = value;
                    //             temp['dataIndex'] = value;
                    //             file_columns.push(temp)
                    //         })
                    //         //
                    //         //res 取前十行数据 形成展示格式如下：
                    //         //
                    //
                    //         const res_ten = res.slice(0, 10)
                    //
                    //         file_data = [];
                    //         res_ten.forEach((line) => {
                    //
                    //             const temp = {};
                    //             for (var i = 0; i < keys.length; i++) {
                    //                 temp[keys[i]] = line[i];
                    //             }
                    //
                    //             file_data.push(temp);
                    //
                    //         }
                    //         )
                    //
                    //         const data = {
                    //             'data': file_data,
                    //             'columns': file_columns,
                    //         }
                    //
                    //         _this.props.update_filedata(data)
                    //
                    //     }
                    // });

                }
                return false;
            },

        };
        return (
            <div>
                <Dragger {...file_props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>

            </div>

        );
    }
}
export default connect(
    state =>({
        selectdisplay: state.selectdisplay,
    }),

    {update_filedata, update_file}
)(FileUpload)
