const products=[
{id:1,name:"Floral Printed Chudidhar Set",cat:"Daily Wear",price:999},
{id:2,name:"Cotton Embroidered Set",cat:"Daily Wear",price:1099},
{id:3,name:"Aari Work Chudidhar Set",cat:"Designer Wear",price:1399},
{id:4,name:"Designer Organza Set",cat:"Designer Wear",price:1499},
{id:5,name:"Premium Party Wear Set",cat:"Party Wear",price:1799},
{id:6,name:"Blush Embroidery Chudidhar",cat:"Designer Wear",price:1599},
{id:7,name:"Soft Peach Daily Set",cat:"Daily Wear",price:899},
{id:8,name:"Festive Maroon Chudidhar",cat:"Party Wear",price:1999}
];
let cart=JSON.parse(localStorage.getItem("smkCart")||"[]"),active="All";
const productColors=["#ead6cf,#d6dfcf","#f0dfc8,#d8c7b7","#c8d4ca,#e4d7ca","#d9c9d8,#eee1d6","#d6b8bd,#5f6f69","#efd4cf,#c6d1c1","#f3dfc8,#e4cfc5","#8b4b55,#d5b4ae"];
const productsEl=document.getElementById("products");
function renderProducts(){
 let list=active==="All"?products:products.filter(p=>p.cat===active);
 productsEl.innerHTML=list.map(p=>`<article class="product">
  <div class="product-image" style="background:linear-gradient(145deg,${productColors[p.id-1]})"><button class="heart">♡</button><span>SMK</span></div>
  <div class="product-info"><small>${p.cat}</small><h3>${p.name}</h3><div class="price-row"><b class="price">₹${p.price.toLocaleString("en-IN")}</b><button class="add" onclick="addToCart(${p.id})">ADD TO BAG</button></div></div>
 </article>`).join("");
}
function addToCart(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();renderCart();openCart()}
function save(){localStorage.setItem("smkCart",JSON.stringify(cart))}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML='<p style="color:#7d726c;margin-top:24px">Your bag is waiting for something beautiful.</p>'}
 else el.innerHTML=cart.map(x=>{let p=products.find(y=>y.id===x.id);return `<div class="cart-row"><div><b>${p.name}</b><div style="color:#7d726c;margin-top:4px">₹${p.price.toLocaleString("en-IN")}</div></div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> ${x.qty} <button onclick="changeQty(${p.id},1)">+</button></div></div>`}).join("");
 let total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
 document.getElementById("cartTotal").textContent=total.toLocaleString("en-IN");
}
function changeQty(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();renderCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartOverlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartOverlay").classList.remove("show")}
document.querySelectorAll("#filters button").forEach(b=>b.onclick=()=>{active=b.dataset.filter;document.querySelectorAll("#filters button").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.querySelectorAll(".collection-card").forEach(b=>b.onclick=()=>{active=b.dataset.filter;document.querySelectorAll("#filters button").forEach(x=>x.classList.toggle("active",x.dataset.filter===active));renderProducts();document.getElementById("new").scrollIntoView()});
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("cartOverlay").onclick=closeCart;
document.getElementById("menuBtn").onclick=()=>document.getElementById("mobileMenu").classList.add("open");
document.getElementById("closeMenu").onclick=()=>document.getElementById("mobileMenu").classList.remove("open");
document.querySelectorAll(".mobile-menu a").forEach(a=>a.onclick=()=>document.getElementById("mobileMenu").classList.remove("open"));
function whatsapp(){let msg="Hello SMK Fashion Hub!%0A%0AI want to order:%0A"+cart.map(x=>{let p=products.find(y=>y.id===x.id);return `${p.name} x ${x.qty} - ₹${p.price*x.qty}`}).join("%0A");let total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);msg+=`%0A%0ATotal: ₹${total}%0A%0AName:%0AAddress:`;window.open("https://wa.me/911234567890?text="+msg,"_blank")}
document.getElementById("whatsappOrder").onclick=()=>{if(cart.length)whatsapp()};document.getElementById("whatsappFloat").onclick=()=>{if(cart.length)whatsapp();else window.open("https://wa.me/911234567890","_blank")};
document.getElementById("searchBtn").onclick=()=>document.getElementById("new").scrollIntoView();
renderProducts();renderCart();