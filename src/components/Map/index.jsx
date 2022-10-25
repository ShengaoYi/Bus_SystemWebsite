import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
import dataStore from "../../redux/dataStore";

// Kepler.gl actions
import {addDataToMap, togglePerspective, wrapTo} from 'kepler.gl/actions';
import {onLayerClick} from "kepler.gl/dist/actions/vis-state-actions";
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';

// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';
import mapConfigJson from './config-all.json';


class Map extends Component {
  componentDidMount() {
    this.props.dispatch(wrapTo('map', addDataToMap({datasets: dataStore.getState(), config: mapConfigJson})));

    dataStore.subscribe(()=>{
      this.setState({})
      this.props.dispatch(wrapTo('map', addDataToMap({datasets: dataStore.getState(), config: mapConfigJson})));
    })
  }

  render() {
    return (
      <div style={{ height: '100%', minHeight: '70vh'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={'pk.eyJ1IjoieWVzZW5pYW8iLCJhIjoiY2tlZjAyM3p5MDNnMjJycW85bmpjenFkOCJ9.TDYe7XRNP8CnAto0kLA5zA'}
              id="map"
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
)(Map);