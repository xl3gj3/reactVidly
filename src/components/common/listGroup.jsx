import React from 'react'
// import PropTypes from 'prop-types'

class ListGroup extends React.Component {
  render () {
    const {items,textProperty,valueProperty,onItemSelect,selectedItem} = this.props;

    return (
      <ul className="list-group">
        {items.map((item)=><li key={item[valueProperty]} className={selectedItem === item ? "list-group-item active " : "list-group-item " + "clickable"} onClick={()=>onItemSelect(item)}>{item[textProperty]} </li>)}

      </ul>
    );
  }
}

export default ListGroup;
