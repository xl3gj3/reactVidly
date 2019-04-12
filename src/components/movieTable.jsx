import React from 'react'
// import PropTypes from 'prop-types'
import Like from "./common/like";
import Table from './common/table';

class MovieTable extends React.Component {
  // constructor(){
  //   super();
  //   this.rasieSort = this.raiseSort.bind(this);
  // }
  // react element is plain javascript object
  cols = [
    {path :'title',lable:"Title"},
    {path :'genre.name',lable:"Genre"},
    {path :'numberInStock',lable:"Stock"},
    {path :'dailyRentalRate',lable:"Rate"},
    {key:"like", content : movie => (<Like movie={movie} liked={movie.liked} onClick={()=>this.props.onLike(movie)} id={movie._id}/>)},
    {key:"delete", content : movie => (<button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger">Delete</button>)},
  ];
  render () {
    const {movies, onSort,sortCol} = this.props;
    // const {cols,sortCol,onSort,data,valueProperty} = props;

    return (
      <Table cols={this.cols} onSort={onSort} sortCol={sortCol} data={movies} valueProperty="_id" />
    );

  }
}

export default MovieTable;
