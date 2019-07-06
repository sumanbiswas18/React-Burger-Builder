import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerStyle from "./BurgerStyle.css";

const burger = props => {
  let catchIngredients = Object.keys(props.ingredients)
    .map(igkey => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngredients key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (catchIngredients.length === 0) {
    catchIngredients = <p>Please Start Adding ingredients!</p>;
  }
  console.log(catchIngredients);

  return (
    <div className={BurgerStyle.burger}>
      <BurgerIngredients type="breadTop" />
      {catchIngredients}
      <BurgerIngredients type="breadBottom" />
    </div>
  );
};

export default burger;
