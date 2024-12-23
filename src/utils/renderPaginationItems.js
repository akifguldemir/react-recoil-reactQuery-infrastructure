import React from 'react';
import { Pagination } from 'react-bootstrap';

const renderPaginationItems = (currentPage, totalPages, handlePageChange) => {
  const items = [];
  const maxPagesToShow = 5;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
  let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

  if (currentPage <= halfMaxPagesToShow) {
    endPage = Math.min(totalPages, maxPagesToShow);
  }

  if (currentPage + halfMaxPagesToShow >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  if (startPage > 1) {
    items.push(
      <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
        1
      </Pagination.Item>
    );
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }
    items.push(
      <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
        {totalPages}
      </Pagination.Item>
    );
  }

  return items;
};

export default renderPaginationItems;