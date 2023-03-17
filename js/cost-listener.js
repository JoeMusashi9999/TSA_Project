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
    output.textContent = "Projected cost: 80k TerraUnits";
    } else if (destination === "murcury" && type ==="Commercial"){
      output.textContent = "Projected cost: 890 TerraUnits per kg";
      }

        if (destination === "venus" && type ==="Personal"){
          output.textContent = "Projected cost: 40k TerraUnits";
        }else if (destination === "venus" && type ==="Commercial"){
        output.textContent = "Projected cost: 450 TerraUnits per kg";
        }
        if (destination === "mars" && type ==="Personal"){
          output.textContent = "Projected cost: 20k TerraUnits";
          }else if (destination === "mars" && type ==="Commercial"){
          output.textContent = "Projected cost: 200 TerraUnits per kg";
          }

        if (destination === "jupiter" && type ==="Personal"){
          output.textContent = "Projected cost: 600k TerraUnits";
          } else if (destination === "jupiter" && type ==="Commercial"){
            output.textContent = "Projected cost: 6.5k TerraUnits per kg";
            }

            if (destination === "saturn" && type ==="Personal"){
              output.textContent = "Projected cost: 1.5 Million TerraUnits";
              } else if (destination === "saturn" && type ==="Commercial"){
                output.textContent = "Projected cost: 17k TerraUnits per kg";
                }

                if (destination === "uranus" && type ==="Personal"){
                  output.textContent = "Projected cost: 3 Million TerraUnits";
                  } else if (destination === "uranus" && type ==="Commercial"){
                    output.textContent = "Projected cost: 34k TerraUnits per kg";
                    }
                    if (destination === "neptune" && type ==="Personal"){
                      output.textContent = "Projected cost: 4 Million TerraUnits";
                      } else if (destination === "neptune" && type ==="Commercial"){
                        output.textContent = "Projected cost: 45k TerraUnits per kg";
                        }
                        if (destination === "pluto" && type ==="Personal"){
                          output.textContent = "Projected cost: 5 Million TerraUnits";
                          } else if (destination === "pluto" && type ==="Commercial"){
                            output.textContent = "Projected cost: 55k TerraUnits per kg";
                            }


     
     
});


$.get('https://theskylive.com/mercury-tracker', null, function(text){
  alert($(text).find('#disearth'));
});
