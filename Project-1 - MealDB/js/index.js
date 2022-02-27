document.getElementById("error-message").style.display = "none";

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const inputText = searchField.value;
  //   clear data
  searchField.value = "";
  if (inputText == "") {
    document.getElementById("error-message").style.display = "block";
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.meals))
    .catch((error) => {
      document.getElementById("error-message").style.display = "block";
      console.log("", error);
    });
};
const displaySearchResult = (meals) => {
  document.getElementById("error-message").style.display = "none";
  //   console.log("meals", meals);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  for (const meal of meals) {
    // console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${
      meal.strMeal
    }" />
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">
                ${meal.strInstructions.slice(0, 200)}
                </p>
            </div>
        </div>
    `;
    searchResult.appendChild(div);
  }
};

const loadMealDetail = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  const mealDetails = document.getElementById("meal-details");
  mealDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">
            ${meal.strInstructions.slice(0, 150)}
            </p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Watch Video</a>
          </div>
    `;
  mealDetails.appendChild(div);
};
