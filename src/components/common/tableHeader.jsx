import React from 'react'
// import PropTypes from 'prop-types'
// think what is the input
// cols : array
// sortCol : object
// onSort : function
class TableHeader extends React.Component {
  raiseSort (col) {
    const newSortOrder = {...this.props.sortCol};
    if (newSortOrder.path === col) {
      newSortOrder.order = (newSortOrder.order === 'asc') ? 'desc' : 'asc'
    }else {
      newSortOrder.path = col;
      newSortOrder.order = "asc"
    }
    this.props.onSort(newSortOrder);
  };
  renderSortIcon (col) {
    const {sortCol} = this.props
    if (col.path!==sortCol.path) {
      return null
    }
    if (sortCol.order === 'asc') {
      return <i className="fa fa-sort-asc ml-2"></i>
    }else {
      return <i className="fa fa-sort-desc ml-2"></i>
    }
  }
  render () {
    return(
      <thead>
        <tr>
          {this.props.cols.map((col)=> <th className="clickable" key={col.path || col.key} onClick={()=> this.raiseSort(col.path)} >{col.lable}{this.renderSortIcon(col)}</th>)}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
