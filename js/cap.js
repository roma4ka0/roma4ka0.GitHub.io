fetch("https://restcountries.com/v3.1/region/europe")
.then((resolve) => resolve.json())
.then((data) => {
  data.forEach((element) => {
    document.getElementById("ul_Capitals").innerHTML += `<li>${element.capital[0]}`;
  });
});