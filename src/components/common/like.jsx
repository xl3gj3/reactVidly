import React from 'react'

class Like extends React.Component {
  render () {
    const {liked} = this.props;
    console.log(this.props);
    let classes = 'fa fa-heart';
    if (liked) {
      classes = 'fa fa-heart';
    }else {
      classes = 'fa fa-heart-o';
    }
    classes = classes + " clickable"
    // console.log("class name ",classes);
    return(
      <i className={classes} aria-hidden="true" onClick={this.props.onClick}></i>
    );
  }
}

export default Like;
