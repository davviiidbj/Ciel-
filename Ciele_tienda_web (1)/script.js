const WHATSAPP = "573000000000"; // Cambia este número por el WhatsApp de Cielé.

const products = [
  {id:1,name:"Cadena delicada",price:25000,stock:8},
  {id:2,name:"Pulsera minimalista",price:15000,stock:12},
  {id:3,name:"Anillo elegante",price:18000,stock:4},
  {id:4,name:"Collar corazón",price:22000,stock:0},
  {id:5,name:"Aretes dorados",price:20000,stock:6},
  {id:6,name:"Pulsera de perlas",price:17000,stock:9},
  {id:7,name:"Anillo ajustable",price:16000,stock:3},
  {id:8,name:"Cadena con dije",price:28000,stock:5}
];

const $ = s => document.querySelector(s);
const money = n => "$" + n.toLocaleString("es-CO");

function render(list = products){
  $("#products").innerHTML = list.map(p => `
    <article class="product" onclick="openProduct(${p.id})">
      <div class="product-image">C</div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="price">${money(p.price)}</div>
        <div class="stock ${p.stock===0?'out':''}">
          ${p.stock===0 ? "Agotado" : `${p.stock} disponibles`}
        </div>
      </div>
    </article>
  `).join("");
}

function openProduct(id){
  const p = products.find(x => x.id === id);
  $("#modalName").textContent = p.name;
  $("#modalPrice").textContent = money(p.price);
  $("#modalStock").textContent = p.stock === 0 ? "Producto agotado" : `${p.stock} unidades disponibles`;
  $("#modalImage").textContent = "C";
  $("#whatsapp").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola Cielé, me interesa ${p.name}. ¿Está disponible?`)}`;
  $("#modal").classList.remove("hidden");
}
$("#closeModal").onclick = () => $("#modal").classList.add("hidden");
$("#modal").onclick = e => { if(e.target.id === "modal") $("#modal").classList.add("hidden"); };
$("#search").oninput = e => {
  const q = e.target.value.toLowerCase().trim();
  render(products.filter(p => p.name.toLowerCase().includes(q)));
};
render();
