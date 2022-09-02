const loadAllProduct  = async()=>{
    const res = await fetch(`https://fakestoreapi.com/products`)
    const data = await res.json()
   return data;
}
 /*---Set all menu bar declear  --- */
const setAllMenu = async()=>{
    const data = await loadAllProduct();
   /*  console.log(data) */
   const menu = document.getElementById('all-menu');
   const uniqueArray = [];
   for(const product of data){
     /* console.log(product.category) 
  */
    if(uniqueArray.indexOf(product.category)==-1){
        uniqueArray.push(product.category);
        const li = document.createElement('li');
        li.innerHTML = `<a>${product.category} </a>`
        menu.appendChild(li);
    };
   };

};
setAllMenu();

const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async(event)=>{
/* console.log(event.key) */

if(event.key==='Enter'){
    /* console.log(searchField.value) */
    const searchValue = searchField.value;
    const allProducts = await loadAllProduct();
   /*  console.log(allProducts) */

   const poundProduct = allProducts.filter(product=>product.category.includes(searchValue));
   const productContainer = document.getElementById('product-container');
   productContainer.textContent = '';
   const notFound = document.getElementById('no-result-found');
   notFound.textContent = '';
   if(poundProduct.length === 0)
   {
    /* console.log('not found products') */
    notFound.innerHTML =
    `
    <h2 class="text-5xl text-orange-500 text-center"> not found products </h2>
    `
    return;
   }
/*    console.log(poundProduct) */
   poundProduct.forEach(product=>{
    /* console.log(product); */
    const {category,image,price,title,description}= product;
    const div = document.createElement('div');
    div.innerHTML= `
    <div class="card w-full  bg-base-100 shadow-xl">
  <figure class="px-10 pt-10">
    <img src="${image}" alt="Shoes" class="rounded-xl h-64 w-full" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title"> ${title.length > 20 ? title.slice(0, 20)+"..." :title }</h2>
    <p>Category: ${category} </p>
    <h3 class="text-3xl font-semiBold">price: ${price} </h3>

    <div class="card-actions">
    <label for="my-modal-3" class="btn modal-button" onclick="showAllModal('${description}','${image}')">Show Details</label>
    </div>
  </div>
</div>
    
    `;
    productContainer.appendChild(div)
   })
}
})
const showAllModal = (description,image)=>{
/* console.log(description,image) */
const modalBody = document.getElementById('modal-body');
modalBody.innerHTML = 
`
<figure class="px-10 pt-10">
    <img src="${image}" alt="Shoes" class="rounded-xl h-64 w-full" />
  </figure>
    <p class="py-4"> ${description} </p>
`;
}