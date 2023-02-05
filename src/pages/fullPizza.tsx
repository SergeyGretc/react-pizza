import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63bd0f53fa38d30d85d7c821.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <>"Loading..."</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Картинка пиццы" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem
        tenetur, quasi veniam reiciendis in ab eligendi cumque nesciunt nemo
        quos?
      </p>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
