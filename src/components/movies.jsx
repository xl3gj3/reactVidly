import React from 'react';
// import PropTypes from 'prop-types';
import {getMovies} from "../services/fakeMovieService";
import "../css/movie.css";
// import Like from "./common/like";
import Pagination from "./common/pagination";
import {paginate} from "../utilities/paginate";
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/fakeGenreService";
import MovieTable from "./movieTable";
import lodash from "lodash";

class Movie extends React.Component {
  state = {
    movies :[],
    genres : [],
    pageSize : 4,
    currentPage : 1,
    sortCol : {path:"title", order:'asc'}
  };

  tableClassName = "";
  constructor(){
    super();
    this.onDelete = this.onDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.renderNumberOfMovie = this.renderNumberOfMovie.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGenreSelect = this.handleGenreSelect.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  componentDidMount(){
    const genres = [{name : 'All Genres',_id:"allGenres"},...getGenres()];
    this.setState({movies:getMovies(),genres:genres})
  }
  handleSort(sortCol){
    this.setState({sortCol : sortCol});
  }
  onDelete(id){
    console.log(this.state);
    console.log("delete button id is",id);
    const newMovieState = this.state.movies.filter((movie) => {
      return movie._id !== id;
    });
    this.setState({movies :newMovieState });
  }
  renderNumberOfMovie(numberOfMovies){
    if (numberOfMovies > 0) {
      this.tableClassName = "table";

      return <h4>Showing {numberOfMovies} movies in database</h4>;

    }else {
      this.tableClassName = "table displayNone";

      return <h4>No Movies in DB</h4>;

    }
  }
  handleGenreSelect (genre){
    console.log("genre select is ", genre);
    this.setState({selectedGenre : genre,currentPage:1})

  }
  handleLike(movie){
    // console.log("this id is ", id);
    const newMovies = this.state.movies;
    const index = newMovies.indexOf(movie);
    console.log("this clicked index is ", index);
    newMovies[index] = {...movie};
    if (newMovies[index].liked) {
       newMovies[index].liked = false;
    }else {
      newMovies[index].liked = true;
    }
    this.setState({movies:newMovies});
    // const selectMovie =
  }
  handlePageChange(page){
    console.log("handle page, the page number is ",page);
    this.setState({currentPage : page})
  }
  returnOranizedMovies (allMovies,selectedGenre,sortCol,currentPage,pageSize){
    // filter
    let filtered = [];
    // selectedGenre && selectedGenre._id
    // ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    // : allMovies;
    if (selectedGenre && selectedGenre._id) {
      if (selectedGenre._id ==="allGenres") {
        filtered =  allMovies;
      }else {
        filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id)
      }
    }else {
      filtered =  allMovies;
    }
    const sorted = lodash.orderBy(filtered,[sortCol.path],[sortCol.order]);
    const movies = paginate(sorted,currentPage,pageSize);

    return movies;
    // sorted

    // paginated

  }
  getPagedData(){
    const {
      pageSize,
      currentPage,
      movies:allMovies,
      selectedGenre,
      sortCol
    } = this.state;
    let filtered = [];
    // selectedGenre && selectedGenre._id
    // ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    // : allMovies;
    if (selectedGenre && selectedGenre._id) {
      if (selectedGenre._id ==="allGenres") {
        filtered =  allMovies;
      }else {
        filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id)
      }
    }else {
      filtered =  allMovies;
    }
    const sorted = lodash.orderBy(filtered,[sortCol.path],[sortCol.order]);
    const movies = paginate(sorted,currentPage,pageSize);

    return {totalCount : filtered.length, data:movies};
  }
  render() {
    // console.log(this.state);
    const {
      pageSize,
      currentPage,
      sortCol
    } = this.state;

    const {totalCount, data:movies}= this.getPagedData();

    // const movies = this.returnOranizedMovies(allMovies,selectedGenre,sortCol,currentPage,pageSize)
    // const movies = paginate(filtered,currentPage,pageSize);
    // console.log(movies);

    return (
      <div className="row mt-4">
        <div className="col-3">
          <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} textProperty="name" valueProperty="_id" selectedItem={this.state.selectedGenre}/>
        </div>
        <div className="col">
          {this.renderNumberOfMovie(totalCount)}
          <MovieTable movies={movies} sortCol={this.state.sortCol} onLike={this.handleLike} onDelete={this.onDelete} onSort={this.handleSort}/>
          <Pagination currentPage={currentPage} itemsCount = {totalCount} pageSize={pageSize} onPageChange = {this.handlePageChange}/>
        </div>


      </div>
    );
  }
}

export default Movie;
