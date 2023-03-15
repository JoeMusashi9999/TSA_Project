const select = document.getElementById("type");
const output = document.getElementById("output");

select.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  if (selectedOption === "Commercial") {
    output.textContent = "Projected cost:";
  } else if (selectedOption === "Personal") {
    output.textContent = "Projected cost:";
  } else if (selectedOption === "Governement") {
    output.textContent = "Projected cost:";
  } else if (selectedOption === "none") {
    output.textContent = "Please select an option.";
  }
});
