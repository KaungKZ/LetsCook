import React, { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import { RecipeItems } from "./components/RecipeItems";
import RecipeEdit from "./components/RecipeEdit";
import RecipeHeader from "./components/RecipeHeader";
import { uuid } from "uuidv4";
import "./css/style.css";

export default function App() {
  const [recipes, setRecipes] = useState(RecipeItems);
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [filteredList, setFilterList] = useState([]);
  const [searchedText, setSearchedText] = useState("recipes");
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  useEffect(() => {
    const edit_section = document.querySelector("#root .recipe-edit");
    const recipe_header = document.querySelector("#root .recipe-header");
    const recipe_items = document.querySelector("#root .recipe-items");
    if (edit_section && edit_section.classList.contains("active")) {
      document.body.style.overflowX = "hidden";
      recipe_header.style.display = "none";
      recipe_items.style.display = "none";
    } else {
      document.body.style.overflowX = "visible";
      recipe_header.style.display = "flex";
      recipe_items.style.display = "flex";
    }
  }, [selectedRecipeId]);
  useEffect(() => {
    if (localStorage.getItem("react-practice") != null) {
      setRecipes(JSON.parse(localStorage.getItem("react-practice")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-practice", JSON.stringify(recipes));
  }, [recipes]);

  function handleSearchInput(e) {
    if (e === "") {
      setSearchedText("recipes");
    } else {
      setSearchedText("searchedText");
    }
    const filter = recipes.filter(recipe => {
      const lc = recipe.name.toLowerCase();
      return lc.includes(e.toLowerCase());
    });

    setFilterList(filter);
  }

  let searchedRecipe;
  if (searchedText === "recipes") searchedRecipe = recipes;
  else searchedRecipe = filteredList;

  function handleAddRecipe(e) {
    const newRecipe = {
      id: uuid(),
      name: "",
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuid(), name: "", amount: "" }]
    };
    setRecipes([...recipes, newRecipe]);
    setSelectedRecipeId(newRecipe.id);
  }

  function handleDeleteRecipe(id) {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      handleEdit(undefined);
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  function handleEdit(id) {
    setSelectedRecipeId(id);
  }

  function handleEditChange(id, changedRecipe) {
    const newRecipe = [...recipes];
    const index = newRecipe.findIndex(recipe => recipe.id === id);
    newRecipe[index] = changedRecipe;
    setRecipes(newRecipe);
  }

  return (
    <>
      <div className="recipe-header">
        <RecipeHeader handleSearchInput={handleSearchInput}></RecipeHeader>
      </div>
      <div
        className={selectedRecipeId ? "recipe-items editing" : "recipe-items"}
      >
        <div className="grid-items">
          {searchedRecipe.map(item => {
            return (
              <RecipeList
                key={item.id}
                item={item}
                handleDeleteRecipe={handleDeleteRecipe}
                handleEdit={handleEdit}
                selectedRecipeId={selectedRecipeId}
              ></RecipeList>
            );
          })}
        </div>
        <button onClick={handleAddRecipe} className="add-recipe-btn">
          Add Recipe
        </button>
      </div>
      <div className={selectedRecipe ? "recipe-edit active" : "recipe-edit"}>
        {selectedRecipe && (
          <>
            <RecipeEdit
              selectedRecipe={selectedRecipe}
              handleEditChange={handleEditChange}
              handleEdit={handleEdit}
            ></RecipeEdit>
          </>
        )}
      </div>
    </>
  );
}
