import React, { Component } from 'react'

class HomeImage extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        const {homeImage}=this.props
        const {onHide}=this.props
        return (
            <img
            onClick={onHide}
            className="apartment-image"
            src={homeImage}
            alt="..."
          />
        )
    }
}
export default HomeImage;