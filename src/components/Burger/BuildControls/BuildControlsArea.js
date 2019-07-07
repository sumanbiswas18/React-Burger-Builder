import React from "react";
import cssClass from "./BuildControlsArea.css";
import Buildcontrol from "./BuildControl/BuildControl";

const controls = [
  { lable: "Salad", type: "salad" },
  { lable: "Bacon", type: "bacon" },
  { lable: "Cheese", type: "cheese" },
  { lable: "Meat", type: "meat" }
];
const BuildControlsArea = props => (
  <div className={cssClass.buildControlsArea}>
    <p>Your Burger Price: {props.price.toFixed(2)}</p>
    {controls.map(ctrl => (
      <Buildcontrol
        key={ctrl.lable}
        IngredientLable={ctrl.lable}
        added={() => props.ingredientsAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}

    <button className={cssClass.OrderButton} disabled={!props.purchasable}>
      Order Now
    </button>
  </div>
);

export default BuildControlsArea;
