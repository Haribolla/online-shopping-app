let no2 = document.getElementById("no2");
let no5 = document.getElementById("no5");
let feedback = document.getElementById("feedback");
let totalprice = document.getElementById("totalprice");
let clearall = document.getElementById("clearall");
let sortthecart = document.getElementById("sortthecart");

let products = [
  {
    id: 1,
    name: "Laptops",
    image: `<img src="laptop.webp">`,
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    image: `<img src="phone.jpeg">`,
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    image: `<img src="tablet.webp">`,
    price: 5000,
  },
  {
    id: 4,
    name: "Smartwatch",
    image: `<img src="watch.webp">`,
    price: 1500,
  },
  {
    id: 5,
    name: "Headphones",
    image: `<img src="headphones.jpg">`,
    price: 500,
  },
];
let cart = [];
function renderproductdetails() {
  products.forEach(function (product) {
    /*let productrow = `
      <div  id=no3>
      <spam>${product.name}-Rs.${product.price}</spam>
      <button id="no4">ADD TO CART</button>
      </div>`;
      no2.insertAdjacentHTML("beforeend", productrow);
    */
    let { id, name, price, image } = product;
    let divelement = document.createElement("div");
    divelement.id = "no3";
    divelement.innerHTML = `<spam>${image}${name}-Rs.${price}</spam>
      <button id="no4" onclick="addtocart(${id})">ADD TO CART</button>`;
    no2.appendChild(divelement);
  });
}

function addtocart(id) {
  let isproductavailable = cart.some((product) => product.id === id);
  if (isproductavailable) {
    let producttoadd = products.find((product) => product.id === id);
    updateuserfeedback(`${producttoadd.name} is already added`, "error");
    return;
  }
  let producttoadd = products.find((product) => product.id === id);
  cart.push(producttoadd);
  rendercartdetails();
  updateuserfeedback(`${producttoadd.name} is add to cart.`, "success");
}
function rendercartdetails() {
  no5.innerHTML = "";
  cart.forEach(function (product) {
    let { id, name, price, image } = product;
    let cartitem = document.createElement("div");
    cartitem.id = "no3";
    cartitem.innerHTML = `<spam>${image}${name}-Rs.${price}</spam>
      <button id="no4" onclick="removefromcart(${id})">REMOVE</button>`;
    no5.appendChild(cartitem);
  });
  //let totalprice1 = 0;
  //for (i = 0; i < cart.length; i++) {
  //  totalprice1 = cart[i].price + totalprice1;
  //}
  let totalprice1 = cart.reduce(function (acc, curproduct) {
    return acc + curproduct.price;
  }, 0);
  totalprice.textContent = `Rs.${totalprice1}`;
}
function removefromcart(id) {
  let producttoadd = products.find((product) => product.id === id);
  let productindex = cart.findIndex((product) => product.id === id);
  cart.splice(productindex, 1);
  rendercartdetails();
  updateuserfeedback(`${producttoadd.name} is removed from cart.`, "remove");
  console.log(cart);
}
function sorting() {
  let sortthecartproducts =
    '<button id="sortthecart">sort the cart produts</button>';
  foracause.insertAdjacentHTML("afterend", sortthecartproducts);
  document.getElementById("sortthecart").addEventListener("click", function () {
    let sort = [1];
    sort.forEach(function () {
      sort.length = 0;
      let elements = `<button id="lowtohigh">low to high</button><button id="hightolow">high to low</button>`;
      document
        .getElementById("sortthecart")
        .insertAdjacentHTML("afterend", elements);
    });
    document.getElementById("sortthecart").remove();
    document.getElementById("lowtohigh").addEventListener("click", function () {
      cart.sort(function (cart1, cart2) {
        return cart1.price - cart2.price;
      });
      rendercartdetails();
      updateuserfeedback(
        `cart products are sorted by low to high prices`,
        "sorted"
      );
    });
    document.getElementById("hightolow").addEventListener("click", function () {
      cart.sort(function (cart1, cart2) {
        return cart2.price - cart1.price;
      });
      rendercartdetails();
      updateuserfeedback(
        `cart products are sorted by high to low prices`,
        "sorted"
      );
    });
  });
}
clearall.addEventListener("click", function () {
  cart.length = 0;
  rendercartdetails();
  updateuserfeedback(`cart is cleared.`, "remove");
  hightolow.remove();
  lowtohigh.remove();
  sorting();
});
sorting();

function updateuserfeedback(msg, type) {
  if (type === "success") {
    feedback.style.background = "rgb(63, 239, 239)";
    feedback.style.display = "block";
    feedback.style.color = "black";
  }
  if (type === "error") {
    feedback.style.background = "rgba(255, 0, 81, 0.75)";
    feedback.style.display = "block";
    feedback.style.color = "white";
  }
  if (type === "remove") {
    feedback.style.background = " rgba(247, 103, 148, 0.65)";
    feedback.style.display = "block";
    feedback.style.color = "black";
  }
  if (type === "sorted") {
    feedback.style.background = " rgba(150, 178, 250, 0.65)";
    feedback.style.display = "block";
    feedback.style.color = "black";
  }
  feedback.textContent = msg;
  setTimeout(function () {
    feedback.style.display = "none";
  }, 5000);
}
renderproductdetails();
