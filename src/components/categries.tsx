import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    const categories = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              onClick={() => onClickCategory(index)}
              key={index}
              className={index === value ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
