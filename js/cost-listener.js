const select = document.getElementById("type");
const destination = document.getElementById("destination");
const output = document.getElementById("output");
var type = "";



select.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  if (selectedOption === "Commercial") {
    type = "Commercial";
  } else if (selectedOption === "Personal") {
    type = "Personal";
  } else if (selectedOption === "Governement") {
    output.textContent = "For government contracts, contact us directly";
  } else if (selectedOption === "none") {
    type = "none";
  }
});


destination.addEventListener("change", (event) =>{
  const destination = event.target.value;
  if (destination === "mercury" && type ==="Personal"){
    output.textContent = "Projected cost:  TerraUnits";
    } else if (destination === "murcury" && type ==="Commercial"){
      output.textContent = "Projected cost:  TerraUnits";
      }

        if (destination === "venus" && type ==="Personal"){
          output.textContent = "Projected cost: 57000 TerraUnits";
        }else if (destination === "venus" && type ==="Commercial"){
        output.textContent = "Projected cost: 57000 TerraUnits";
        }
        if (destination === "mars" && type ==="Personal"){
          output.textContent = "Projected cost: 57000 TerraUnits";
          }else if (destination === "mars" && type ==="Commercial"){
          output.textContent = "Projected cost: 57000 TerraUnits";
          }

        if (destination === "jupiter" && type ==="Personal"){
          output.textContent = "Projected cost:  TerraUnits";
          } else if (destination === "jupiter" && type ==="Commercial"){
            output.textContent = "Projected cost:  TerraUnits";
            }

            if (destination === "saturn" && type ==="Personal"){
              output.textContent = "Projected cost:  TerraUnits";
              } else if (destination === "saturn" && type ==="Commercial"){
                output.textContent = "Projected cost:  TerraUnits";
                }

                if (destination === "uranus" && type ==="Personal"){
                  output.textContent = "Projected cost:  TerraUnits";
                  } else if (destination === "uranus" && type ==="Commercial"){
                    output.textContent = "Projected cost:  TerraUnits";
                    }
                    if (destination === "neptune" && type ==="Personal"){
                      output.textContent = "Projected cost:  TerraUnits";
                      } else if (destination === "neptune" && type ==="Commercial"){
                        output.textContent = "Projected cost:  TerraUnits";
                        }
                        if (destination === "pluto" && type ==="Personal"){
                          output.textContent = "Projected cost:  TerraUnits";
                          } else if (destination === "pluto" && type ==="Commercial"){
                            output.textContent = "Projected cost:  TerraUnits";
                            }


     
     
});


$.get('https://theskylive.com/mercury-tracker', null, function(text){
  alert($(text).find('#disearth'));
});
