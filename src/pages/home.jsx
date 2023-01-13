import React, { useEffect, useState } from "react";
import PizzaBlock from "../components/pizzaBlock/pizzaBlock";
import Categories from "../components/categries";
import Skeleton from "../components/pizzaBlock/skeleton";
import Sort from "../components/sort";
import Pagination from "../components/pagination";

const Home = ({ setSearchValue, searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://63bd0f53fa38d30d85d7c821.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((pizza) => (
    <PizzaBlock key={pizza.price} {...pizza} />
  ));
  const skeletons = [...new Array(6)].map((v, i) => <Skeleton key={i} />);
  return (
    <>
      <div className="conteiner">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(id) => setCategoryId(id)}
          />
          <Sort
            value={sortType}
            onClickSortType={(obj) => {
              setSortType(obj);
            }}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
