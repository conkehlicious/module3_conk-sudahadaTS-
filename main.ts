// Define types for the API response
interface Meal {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: any; // To handle dynamic properties like strIngredient1, strIngredient2, etc.
}

interface ApiResponse {
  meals: Meal[];
}

// Button and element declarations with type assertions
const getRecipeBtn = document.querySelector(
  "#getRecipeBtn"
) as HTMLButtonElement;
const container = document.querySelector(".recipe-container") as HTMLElement;
const ingredientText = document.querySelector(".ingredienttext") as HTMLElement;

// API URL
const url = "https://www.themealdb.com/api/json/v1/1/random.php";

// Function for onclick button to get recipe
async function onRandomRecipe(): Promise<void> {
  try {
    const response = await fetch(url);
    const data: ApiResponse = await response.json();

    const meal = data.meals[0];
    if (!meal) {
      throw new Error("No meal data found");
    }

    // Loop function for ingredients
    const ingredientss: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        ingredientss.push(ingredient);
      } else {
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
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Ensure the button has an onclick event listener
getRecipeBtn.onclick = onRandomRecipe;

// Call the function initially if desired
onRandomRecipe();
