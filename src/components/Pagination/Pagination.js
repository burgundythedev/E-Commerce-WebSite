import React, { useState } from "react";
import "./Pagination.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginateNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const paginatePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
  };

  return (
    <ul className="pagination">
      <li
        className={
          currentPage === 1 ? "pagination__li--active" : "pagination__li"
        }
        onClick={paginatePrevious}
      >
        <div className="pagination__arrow-prev" alt="arrow-slider"></div>
      </li>

      {pageNumbers.map((number) => {
        if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
          return (
            <li
              className={
                currentPage === number
                  ? "pagination__li--active"
                  : "pagination__li"
              }
              key={number}
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          );
        }

        return null;
      })}

      <li
        className={
          currentPage === totalPages
            ? "pagination__li--active"
            : "pagination__li"
        }
        onClick={paginateNext}
      >
        <div className="pagination__arrow-next" alt="arrow-slider"></div>
      </li>
    </ul>
  );
};

export default Pagination;
