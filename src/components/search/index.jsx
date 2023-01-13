import React from "react";
import styles from "./search.module.scss";

const Search = ({ setSearchValue, searchValue }) => {
  return (
    <>
      <input
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        className={styles.root}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <button onClick={() => setSearchValue("")}>Отмена поиска</button>
      )}
    </>
  );
};

export default Search;
