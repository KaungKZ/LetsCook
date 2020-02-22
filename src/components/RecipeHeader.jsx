import React from "react";
import LetsCook from "../assets/LetsCook.svg";
export default function RecipeHeader({ handleSearchInput }) {
  return (
    <>
      <div className="title">
        <img src={LetsCook} alt="" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter a recipe name .."
          onChange={e => handleSearchInput(e.target.value)}
        />
      </div>
    </>
  );
}
