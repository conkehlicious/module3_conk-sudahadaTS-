"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Button and element declarations with type assertions
const getRecipeBtn = document.querySelector("#getRecipeBtn");
const container = document.querySelector(".recipe-container");
const ingredientText = document.querySelector(".ingredienttext");
// API URL
const url = "https://www.themealdb.com/api/json/v1/1/random.php";
// Function for onclick button to get recipe
function onRandomRecipe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            const meal = data.meals[0];
            if (!meal) {
                throw new Error("No meal data found");
            }
            // Loop function for ingredients
            const ingredientss = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                if (ingredient) {
                    ingredientss.push(ingredient);
                }
                else {
                    break;
                }
            }
            // HTML styling
            document.body.style.backgroundColor = "black";
            container.style.width = "350px";
            container.style.padding = "10px";
            container.style.minHeight = "500px";
            // Display random recipe
            container.innerHTML = `
      <h2 style="border: 2px blue solid">${meal.strMeal}</h2>
      <h3>CATEGORY : ${meal.strCategory}</h3>
      <h3>COUNTRY OF ORIGIN : ${meal.strArea}</h3>
      <h3 style="color: red">INSTRUCTION :</h3>
      <p>${meal.strInstructions}</p>
      <img style="width: 200px" src="${meal.strMealThumb}">
    `;
            ingredientText.innerHTML = `<ol>${ingredientss
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("")}</ol>`;
            console.log(ingredientss);
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
// Ensure the button has an onclick event listener
getRecipeBtn.onclick = onRandomRecipe;
// Call the function initially if desired
onRandomRecipe();
