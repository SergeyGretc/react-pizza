import React from "react";
import debounce from "lodash.debounce";

import styles from "./search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filter/slice";

const Search: React.FC = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  React.useEffect(() => {});
  return (
    <>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.root}
        placeholder="Поиск пиццы..."
      />
      {<button onClick={onClickClear}>Отмена поиска</button>}
    </>
  );
};

export default Search;
