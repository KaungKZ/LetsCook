import React from "react";

export default function RecipeEditIngredients({
  ingredient,
  handleIngredientChange,
  handleDeleteIngredient
}) {
  function handleChange(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  }
  return (
    <div className="grid">
      <div className="ingredient-edit-name">
        <span className="name">Name: </span>
        <input
          type="text"
          value={ingredient.name}
          onChange={e => handleChange({ name: e.target.value })}
        />
      </div>
      <div className="ingredient-edit-amount">
        <span className="amount">Amount: </span>
        <input
          type="text"
          value={ingredient.amount}
          onChange={e => handleChange({ amount: e.target.value })}
        />
      </div>
      <button
        onClick={() => handleDeleteIngredient(ingredient.id)}
        className="ingredient-edit-delete-btn btn"
      >
        <div className="ingredient-delete-btn"></div>
      </button>
    </div>
  );
}
