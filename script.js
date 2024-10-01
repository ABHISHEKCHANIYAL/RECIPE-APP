var searchbox = document.querySelector(".searchbox")
var searchbtn = document.querySelector(".searchbtn")
var recipeContainer= document.querySelector(".recipe-container")
var recipeDetailsContent= document.querySelector(".recipe-details-content")
var recipeClosebtn = document.querySelector(".recipe-closebtn ")



var fetchRecipes= async (query)=> {
    recipeContainer.innerHTML="<h2> Fetching Recpies...</h2>";
    try {
    var data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    var response = await data.json();

    recipeContainer.innerHTML="";
response.meals.forEach(meal =>{
    var recipeDiv = document.createElement('div'); 
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    var button = document.createElement("button");
      button.textContent = "View Recipes";
      recipeDiv.appendChild(button);

      button.addEventListener("click",()=>{
        openRecipePopup(meal);
      })
       
    recipeContainer.appendChild(recipeDiv);
});
}
 catch (error) {
    recipeContainer.innerHTML="<h2>Error in Fetching Recpies...</h2>";
      
}
}

var fetchIngredients = (meal)=>{
    let ingredientsList ="";
    for(let i=1; i<=20; i++){
    var ingredient = meal[`strIngredient${i}`];

    if(ingredient){
      var measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    
    else {
      break; 
    }
    
  } 
    return ingredientsList;

}

var openRecipePopup = (meal)=>{ 
  recipeDetailsContent.innerHTML =`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
     </div>
     `

  recipeDetailsContent.parentElement.style.display="block";
}

recipeClosebtn.addEventListener("click",()=>{
   recipeDetailsContent.parentElement.style.display ="none";
}) 

searchbtn.addEventListener('click',(e)=>{
  e.preventDefault();
  var searchInput = searchbox.value.trim();
  if(!searchInput){
    recipeContainer.innerHTML =` <h2>Type  the meal in the search box...</h2>`
    return;
  }
  fetchRecipes(searchInput);
})