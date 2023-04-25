var Application = new Vue({
    el: "#app",
    data: {
      products: [
        {
          id: 1,
          title: "Lemon1",
          text: "Лемон",
          image: "Lemon2.jfif",
          desc: "Full desc1",
        },
  
        {
          id: 2,
          title: "Lemon2",
          text: "Лемон",
          image: "Lemon3.jfif",
          desc: "Full desc2",
        },
  
        {
          id: 3,
          title: "Lemon3",
          text: "Лемон",
          image: "Lemon4.jfif",
          desc: "Full desc3",
        },
  
        {
          id: 4,
          title: "Lemon4",
          text: "Лемон",
          image: "Lemon5.jfif",
          desc: "Full desc4",
        },
  
        {
          id: 5,
          title: "Lemon5",
          text: "Лемон",
          image: "Lemon7.jfif",
          desc: "Full desc5",
        },
      ],

      product: [],
      lemn: [],
      contactFields: [],
      btnVisible: 0,
      order: 0,
    },
    mounted: function () {
      this.getProduct();
      this.checkInLemn();
      this.getLemn();
    },
    methods: {
      getProduct() {
        if (window.location.hash) {
          var id = window.location.hash.replace("#", "");
          if (this.products && this.products.length > 0) {
            for (i in this.products) {
              if (
                this.products[i] &&
                this.products[i].id &&
                id == this.products[i].id
              )
                this.product = this.products[i];
            }
          }
        }
      },
      addToLemn(id) {
        var lemn = [];
        if (window.localStorage.getItem("lemn")) {
          lemn = window.localStorage.getItem("lemn").split(",");
        }
  
        if (lemn.indexOf(String(id)) == -1) {
          lemn.push(id);
          window.localStorage.setItem("lemn", lemn.join());
          this.btnVisible = 1;
        }
      },
      checkInLemn() {
        if (
          this.product &&
          this.product.id &&
          window.localStorage
            .getItem("lemn")
            .split(",")
            .indexOf(String(this.product.id)) != -1
        )
          this.btnVisible = 1;
      },
      getLemn() {
        if (window.localStorage.getItem("lemn") != null) {
          if (this.products != null && this.products.length > 0) {
            for (let i in this.products) {
              if (
                this.products[i] != null &&
                this.products[i].id != null &&
                window.localStorage
                  .getItem("lemn")
                  .split(",")
                  .indexOf(String(this.products[i].id)) != -1
              )
                this.lemn.push(this.products[i]);
            }
          }
        }
      },
      removeFromLemn(id) {
        let lemn = [];
        if (window.localStorage.getItem("lemn") != null) {
          lemn = window.localStorage.getItem("lemn").split(",");
        }
        if (lemn.indexOf(String(id)) != -1) {
          lemn.splice(lemn.indexOf(String(id)), 1);
          window.localStorage.setItem("lemn", lemn.join(","));
          this.lemn = [];
          this.getLemn();
        }
      },
      makeOrder() {
        this.lemn = [];
        window.localStorage.setItem("lemn", "");
        this.order = 1;
      },
    },
  });


  const cat_btn = document.getElementById("cat_btn");
  const dog_btn = document.getElementById("dog_btn"); 
  const cat_result = document.getElementById("cat_result");
  const dog_result = document.getElementById("dog_result");
  
  cat_btn.addEventListener("click", getRandomCat);
  dog_btn.addEventListener("click", getRandomDog);
  
  function getRandomCat() {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((res) => res.json())
      .then((data) => {
        cat_result.innerHTML = `<img src=${data[0].url} alt="cat" />`;
      });
  }
  
  function getRandomDog() {
    fetch("https://random.dog/woof.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.url.includes(".mp4")) {
          getRandomDog();
        } else {
          dog_result.innerHTML = `<img src=${data.url} alt="dog" />`;
        }
      });
  }
  