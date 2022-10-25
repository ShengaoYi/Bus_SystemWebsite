import React, { Component } from 'react'
import Util from './Util';
class CitySelectorPYContent extends Component {
    state = {
        select: '北京市'
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !Util.shallowEqual(nextProps, this.props) ||
            !Util.shallowEqual(nextState, this.state);
    }
    onCityChange(e) {
        this.props.onCityChange && this.props.onCityChange(e.target.innerText.trim());
        

    }
    getContent() {
        let citys = []
        this.props.pyValues.forEach(function (v, i) {
            citys.push(
                <span onClick={(e) => {
                    this.onCityChange(e)
                    this.setState({
                        select:v
                    })
                        
                }} key={i} className={v===this.state.select?"click-name":"city-name"}>{v}</span>
            )
        }, this);
        return citys;
    }
    render() {
        return (
            <div className={this.props.className}>
                <div className='py-key'>{this.props.pyFirst}</div>
                <div className='city-content' >
                    {this.getContent()}
                </div>
            </div>
        )
    }
}
export default CitySelectorPYContent;