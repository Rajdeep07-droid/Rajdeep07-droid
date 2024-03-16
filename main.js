// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://127.0.0.1:${
  import.meta && import.meta.env && import.meta.env.REACT_APP_JSON_SERVER_PORT
    ? import.meta.env.REACT_APP_JSON_SERVER_PORT
    : 9090
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
let mainSection = document.getElementById("data-list-wrapper");

let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");

let fetchRecipesBtn = document.getElementById("fetch-recipes");

let filterLessThan50Btn = document.getElementById("filter-less-than-50");
let filterMoreThanEqual50Btn = document.getElementById(
  "filter-more-than-equal-50"
);

let loginUserUsername = document.getElementById("login-user-username");
let loginUserPassword = document.getElementById("login-user-passowrd");
let loginUserButton = document.getElementById("login-user");
let welcomeUsernameSpan = document.getElementById("welcome-username");

let editRecipeInputId = document.getElementById("edit-recipe-input-id");
let editRecipeInputPrice = document.getElementById("edit-recipe-input-price");
let editRecipeButton = document.getElementById("edit-recipe-button");

let recipeData = [];

let userAuthToken, userInfo;

fetchRecipesBtn,addEventListener("click", async()=>{
  try{
    const response = await fetch(`{baseServerUrl}/recipes`);
    if (response.ok){
      recipeData = await response.json();
    }
    else{
      throw new Error("Failed to fetch recipes")
    }
  }
  catch (error){
    console.error(error);
  }
});

sortAtoZBtn.addEventListener("click0", () =>{
  recipeData.sort((a,b) => a.name.localeCompare(b.name));
});
sortAtoZBtn.addEventListener("click0", () =>{
  recipeData.sort((a,b) => b.name.localeCompare(a.name));
});

loginUserButton.addEventListener("click", async() =>{
  const username = loginUserUsername.value;
  const password = loginUserPassword.value;
  try{
    const response = await fetch(`${baseServerURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.dtringify({username, password})
    });
    if(response.ok){
      const data = await response.json();
      userAuthToken = data.token;
      userInfo = data.user;
    }
    else{
      throw new Error("login failed");
    }
  }catch (error){
    console.error(error);
  }
});

editRecipeButton.addEventListener("click", async () =>{
  const id = editRecipeInputId.value;
  const price = editRecipeInputPrice.value
  try{
    const response = await fetch (`${baseServerURL}/recipes/${id}`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
        Authorization: 'Bearer {userAuthToken}'
      },
      body: JSON.stringify({price})
    });
    if(  response.ok){
      //Recipe updated successfully
    }
    else{
      throw new Error("Failed to edit recipe");
    }
  }catch ( error){
    console.error(error)
  }
});

