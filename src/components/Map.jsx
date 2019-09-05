import React, { Component } from 'react'

class Map extends Component {

  render() {
    const routes = this.props.routes.map((route, idx) => {
      let [src, dest] = [route[0], route[1]]
      let [x1, y1] = [src.long, src.lat];
      let [x2, y2] = [dest.long, dest.lat]
      debugger;      
      return (
        <g key={ idx }>
          <circle className="source" cx={x1} cy={y1}>
            <title></title>
          </circle> 
          <circle className="destination" cx={x1} cy={y1}>
            <title></title>
          </circle>
          <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
        </g>
      )
    });

    return (
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
          { routes }          
        </g>
      </svg>
    )
  }  
}


export default Map;