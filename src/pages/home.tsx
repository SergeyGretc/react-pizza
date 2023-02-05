import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import PizzaBlock from "../components/pizzaBlock";
import Categories from "../components/categries";
import Skeleton from "../components/pizzaBlock/skeleton";
import SortPopup from "../components/sort";
import Pagination from "../components/pagination";

import qs from "qs";
import { sortList } from "../components/sort";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slices/filter/selectors";
import { selectPizzaData } from "../redux/slices/pizza/selectors";
import {
  setCategoryId,
  setCurrentCount,
  setFilters,
} from "../redux/slices/filter/slice";
import { fetchPizzas } from "../redux/slices/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/slices/pizza/types";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentCount(page));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort ? sort : sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  return (
    <>
      <div className="conteiner">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />
          <SortPopup value={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Корзина пустая</h2>
            <p>Вероятнее всего вы не заказывали пиццу.</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
