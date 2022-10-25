import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
import leftdataStore from "../../redux/leftdataStore";

// Kepler.gl actions
import {addDataToMap} from 'kepler.gl/actions';
import {onLayerClick} from "kepler.gl/dist/actions/vis-state-actions";
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
import {wrapTo, togglePerspective} from 'kepler.gl/actions';
// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';
import mapConfigJson from './config-all.json';


class LeftMap extends Component {
  componentDidMount() {
    this.props.dispatch(wrapTo('leftmap', addDataToMap({datasets: leftdataStore.getState(), config: mapConfigJson})));

    leftdataStore.subscribe(()=>{
      console.log(leftdataStore.getState(), 2)
      this.setState({})
      this.props.dispatch(wrapTo('leftmap', addDataToMap({datasets: leftdataStore.getState(), config: mapConfigJson})));
      console.log(leftdataStore.getState(), 3)
    })
  }

  render() {
    return (
      <div style={{ height: '100%', minHeight: '70vh'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={'pk.eyJ1IjoieWVzZW5pYW8iLCJhIjoiY2tlZjAyM3p5MDNnMjJycW85bmpjenFkOCJ9.TDYe7XRNP8CnAto0kLA5zA'}
              id="leftmap"
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}


const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(
    mapStateToProps,
    dispatchToProps
)(LeftMap);