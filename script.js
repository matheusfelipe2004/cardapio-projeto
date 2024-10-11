const menu= document.getElementById("menu");
const cartBtn= document.getElementById("cart-btn");
const cartModal= document.getElementById("cart-modal");
const cartItems= document.getElementById("cart-items");
const total= document.getElementById("cart-total");
const checkout= document.getElementById("checkout-btn");
const closeModal= document.getElementById("close-modal-btn");
const cartCount= document.getElementById("cart-count");
const address= document.getElementById("address");
const addressWarn= document.getElementById("address-warn");

cartBtn.addEventListener("click", (evt)=>{
    cartModal.style.display= "flex";
});

cartModal.addEventListener("click", (evt)=>{
    if(evt.target === cartModal){
        cartModal.style.display= "none";
    }
});

closeModal.addEventListener("click",(evt)=>{
    cartModal.style.display= "none";
});