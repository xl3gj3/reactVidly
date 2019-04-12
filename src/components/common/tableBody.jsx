import React from 'react'
// import PropTypes from 'prop-types'
import lodash from 'lodash';

class TableBody extends React.Component {
  renderCell (item,column) {
    if (column.content) {
      return column.content(item);
    }else {
      return lodash.get(item,column.path)
    }
  }
  createKey(item,col,val){
    return item[val] + (col.path || col.key)
  }
  render () {
    const {data,columns,valueProperty} = this.props;
    console.log(data);
    return(
      <tbody>
        {data.map(item =><tr key={item[valueProperty]}>
            {columns.map(col=> <td key={this.createKey(item,col,valueProperty)}>{this.renderCell(item,col)}</td>)}
        </tr>)}
      </tbody>
    );
    // {data.map(item =><tr>
    // </tr>)}
    // <tbody>
    //   {movies.map(movie => (
    //     <tr key={movie._id}>
    //       <td>{movie.title}</td>
    //       <td>{movie.genre.name}</td>
    //       <td>{movie.numberInStock}</td>
    //       <td>{movie.dailyRentalRate}</td>
    //       <td><Like movie={movie} liked={movie.liked} onHandleLike={onLike} id={movie._id}/></td>
    //       <td><button onClick={() => onDelete(movie._id)} className="btn btn-danger">Delete</button></td>
    //     </tr>
    //   ))}
    //   </tbody>
  }
}

export default TableBody;
