import React from "react";

export default function RecipeIngredientsList({ ingredient }) {
  return (
    <div className="ingredient">
      <span>{ingredient.name}</span>
      <span>{ingredient.amount}</span>
    </div>
  );
}
