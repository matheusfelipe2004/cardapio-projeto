const menu= document.getElementById("menu");
const cartBtn= document.getElementById("cart-btn");
const cartModal= document.getElementById("cart-modal");
const cartItems= document.getElementById("cart-items");
const cartTotal= document.getElementById("cart-total");
const checkout= document.getElementById("checkout-btn");
const closeModal= document.getElementById("close-modal-btn");
const cartCount= document.getElementById("cart-count");
const address= document.getElementById("address");
const addressWarn= document.getElementById("address-warn");

let cart = [];

cartBtn.addEventListener("click", (evt)=>{
     updateCartModal();
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

menu.addEventListener("click", (evt)=>{
    let parentButton = evt.target.closest(".add-to-cart-btn");
    
    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat( parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }
})

function addToCart(name, price){
   const existing = cart.find(item => item.name == name);

   if(existing){
    existing.quantity += 1;
   }else{
    cart.push({
        name,
        price,
        quantity: 1,

    })
   }

   updateCartModal();
   
}

function updateCartModal(){
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item =>{
        const cartItemElement = document.createElement("div");

        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
          </div>

        
            <button class="remove-btn" data-name="${item.name}">
               Remover
            </button>
         
        </div>
        `
        total += item.price * item.quantity;

        cartItems.appendChild(cartItemElement);
    })

     cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
     })

     cartCount.innerHTML = cart.length;
}

cartItems.addEventListener("click", evt=>{
    if(evt.target.classList.contains("remove-btn")){
        const name = evt.target.getAttribute("data-name");

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name == name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

address.addEventListener("input", evt =>{
    let inputValue = evt.target.value;

    if(inputValue !== ""){
        address.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
})

checkout.addEventListener("click", evt =>{

    const isOpen = openRestaurant();
    if(!isOpen){
        Toastify({ 
            text: "Ops! O restaurante está fechado.",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
        }).showToast();
        return;
    }

    if(cart.length == 0) return;

    if(address.value == ""){
        addressWarn.classList.remove("hidden");
        address.classList.add("border-red-500");
        return;
    }

    const cartItems = cart.map((item) =>{
        return(
            ` ${item.name} Quantidade: (${item.quantity}) R$${item.price} |`
        )
    }).join("");
   
     const message = encodeURIComponent(cartItems);

     const phone = "82999326553";

     window.open(`https://wa.me/${phone}?text=${message} Endereço: ${address.value}`, "_blank");

     cart.length = 0;
     updateCartModal();
})


function openRestaurant(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 16 && hora <= 23;
}

const spanItem = document.getElementById("date-span");
const isOpen = openRestaurant();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
}else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}