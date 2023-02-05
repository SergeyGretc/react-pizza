import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

type T_Pagination = {
  onChangePage: (page: number) => void;
  value: number;
};

const Pagination: React.FC<T_Pagination> = ({ onChangePage, value }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={value - 1}
        previousLabel="<"
      />
    </div>
  );
};

export default Pagination;
