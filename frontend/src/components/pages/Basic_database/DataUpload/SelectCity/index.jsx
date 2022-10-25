import React, { Component } from 'react'
import {Select} from 'antd';

const {Option} = Select;

export default class SeletCity extends Component {
    render() {
        return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择城市"
                    optionFilterProp="children"
                    // onChange={this.typeChange}

                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="shenzhen">深圳</Option>
                </Select>
        )
    }
}
