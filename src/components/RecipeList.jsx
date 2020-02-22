import React from "react";
import RecipeIngredientsList from "./RecipeIngredientsList";
import editBtn from "../assets/editBtn.svg";
import deleteBtn from "../assets/closeBtn.svg";

export default function RecipeList({
  item,
  handleDeleteRecipe,
  handleEdit,
  selectedRecipeId
}) {
  return (
    <>
      <div className={selectedRecipeId === item.id ? "item editing" : "item"}>
        <div className="name">
          <span className="item-title item-main-title"> {item.name}</span>
        </div>
        <div className="cookTime">
          <span className="item-title">Cook Time:</span>
          <span className="item-content"> {item.cookTime}</span>
        </div>
        <div className="instructions">
          <span className="item-title">Instructions:</span>
          <p className="item-content instructions-content">
            {" "}
            {item.instructions}
          </p>
        </div>
        <div className="ingredients">
          <span className="item-title">Ingredients:</span>
          <div className="grid-ingredients">
            {item.ingredients.map(ingredient => {
              return (
                <RecipeIngredientsList
                  ingredient={ingredient}
                  key={ingredient.id}
                ></RecipeIngredientsList>
              );
            })}
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => handleDeleteRecipe(item.id)}
            className="delete-btn btn"
            title="delete"
          >
            <img src={deleteBtn} alt="" />
          </button>
          <button
            onClick={e => {
              handleEdit(item.id);
            }}
            className="edit-btn btn"
            title="edit"
          >
            <img src={editBtn} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
