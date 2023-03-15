const select = document.getElementById("type");
const destination = document.getElementById("destination");
const output = document.getElementById("output");
var type = "";



select.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  if (selectedOption === "Commercial") {
    
    if (destination === "mars"){
    output.textContent = "Projected cost: 57000 TerraUnits";
    }
    
  } else if (selectedOption === "Personal") {
    output.textContent = "Projected cost:";
  } else if (selectedOption === "Governement") {
    output.textContent = "Projected cost:";
  } else if (selectedOption === "none") {
    output.textContent = "Please select an option.";
  }
});


destination.addEventListener("change", (event) =>{
  const destination = event.target.value;
  if (destination === "mars"){
    output.textContent = "Projected cost: 57000 TerraUnits";
    }
});


$.get('https://theskylive.com/mercury-tracker', null, function(text){
  alert($(text).find('#disearth'));
});
