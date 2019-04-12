import React from 'react'
import lodash from 'lodash';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  render () {
    const {itemsCount,pageSize,onPageChange,currentPage} = this.props;
    console.log("currentPage",currentPage);

    const pageCount =  Math.ceil(itemsCount/pageSize);
    if (pageCount === 1) {
      return null;
    }
    const pages = lodash.range(1,pageCount+1);
    return(
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
              <a onClick={()=>onPageChange(page)} className='page-link'>{page}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
Pagination.propTypes = {
  itemsCount : PropTypes.number.isRequired,
  pageSize : PropTypes.number.isRequired,
  onPageChange : PropTypes.func.isRequired,
  currentPage :PropTypes.number.isRequired
}

export default Pagination;
