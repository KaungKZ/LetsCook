import React from "react";
import RecipeEditIngredients from "./RecipeEditIngredients";
import { uuid } from "uuidv4";
import RecipeList from "./RecipeList";
import deleteBtn from "../assets/closeBtn.svg";

export default function RecipeEdit({
  selectedRecipe,
  handleEditChange,
  handleEdit
}) {
  function handleChange(changes) {
    handleEditChange(selectedRecipe.id, { ...selectedRecipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...selectedRecipe.ingredients];
    const index = newIngredients.findIndex(one => one.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }
  function handleAddIngredient() {
    const newIngredient = [
      {
        id: uuid(),
        name: "",
        amount: ""
      }
    ];
    handleChange({
      ingredients: [...selectedRecipe.ingredients, ...newIngredient]
    });
  }

  function handleDeleteIngredient(id) {
    handleChange({
      ingredients: selectedRecipe.ingredients.filter(i => i.id !== id)
    });
  }
  return (
    <>
      <div className="original-section">
        <RecipeList item={selectedRecipe}></RecipeList>
      </div>
      <div className="edit-section">
        <button
          onClick={() => handleEdit(undefined)}
          className="main-close-btn btn"
        >
          <img src={deleteBtn} alt="" />
        </button>
        <div className="primary-edit">
          <div className="name">
            <label className="edit-item-title" htmlFor="edit-name">
              Name:{" "}
            </label>

            <input
              type="text"
              name="edit-name"
              value={selectedRecipe.name}
              onChange={e => handleChange({ name: e.target.value })}
              placeholder="Title"
            />
          </div>
          <div className="cookTime">
            <label className="edit-item-title" htmlFor="edit-cookTime">
              Cook Time:{" "}
            </label>
            <input
              type="text"
              min="1"
              name="edit-cookTime"
              value={selectedRecipe.cookTime}
              onChange={e => handleChange({ cookTime: e.target.value })}
              placeholder="Cook Time"
            />
          </div>
          <div className="instructions">
            <label className="edit-item-title" htmlFor="edit-instructions">
              Instructions:{" "}
            </label>
            <textarea
              id=""
              cols="30"
              rows="10"
              name="edit-instructions"
              value={selectedRecipe.instructions}
              onChange={e => handleChange({ instructions: e.target.value })}
              placeholder="Enter instructions .."
            ></textarea>
          </div>
        </div>
        <div className="ingredients">
          <label className="edit-item-title">Ingredients: </label>
          <div className="grid-ingredients">
            {selectedRecipe.ingredients.map(ingredient => {
              return (
                <RecipeEditIngredients
                  key={ingredient.id}
                  ingredient={ingredient}
                  handleIngredientChange={handleIngredientChange}
                  handleDeleteIngredient={handleDeleteIngredient}
                ></RecipeEditIngredients>
              );
            })}
          </div>
          <button
            className="add-ingredient-btn"
            onClick={() => handleAddIngredient()}
          >
            Add Ingredient
          </button>
        </div>
      </div>
    </>
  );
}
