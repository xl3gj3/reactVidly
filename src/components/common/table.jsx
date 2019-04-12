import React from 'react'
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
// import PropTypes from 'prop-types'

const Table = (props) => {
  const {cols,sortCol,onSort,data,valueProperty} = props;
  return (
    <table className="table">
      <TableHeader cols={cols} sortCol={sortCol} onSort={onSort}/>
      <TableBody data={data} columns={cols} valueProperty={valueProperty}/>
    </table>
  )
}

export default Table
