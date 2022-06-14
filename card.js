let labal = document.getElementById("labal");
let shoppingcard = document.getElementById("shopping-card");
let homepage=document.getElementById("home_page");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
    let sum = 0;
    for (let i = 0; i < basket.length; i++) {
        sum += basket[i].item;
    }
    document.getElementById("top").innerHTML = sum;
};
calculation();
const generatecarditem = () => {
    if (basket.length == 0) {
       homepage.innerHTML=``;
        shoppingcard.innerHTML=``;
        labal.innerHTML =`
        <h3 >Card is Empty</h3>
        <a href="index.html"> 
        <button class="homebtn"> Back to Home</button>
        </a>
        `;
    } else {
        return (shoppingcard.innerHTML = basket
            .map((x) => {
              homepage.innerHTML=`<a href="index.html"><h2 class="center">Home</h2></a>`;
                const { id, item } = x;
                let search = shopitem.find((x) => id == x.id);
                return `<div class="carditem">

                <img width="100" src="${search.img}">
                  <div class="details">
                  <div class="title-price-x">
                   <h4>${search.name}</h4>
                  <h4 class="card-price">${search.price}$</h4>
                  <i onclick="removeitem(${id})" class="bi bi-x-lg"></i>

                  </div>
                  <div class="button">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                  <h3 class="total-price">$ ${item*search.price}</h3>    
                  </div>
         </div>`;
            })
            .join(""));
    }
};

generatecarditem();
const increment=(id)=>{
  let selectedid=id;
  let take=basket.find((x)=>x.id===selectedid.id);
  if(take===undefined)
  {
    basket.push({id:selectedid.id
      ,item:1});
  }
  else
  {
    take.item++;
  }
  update(selectedid.id);
  localStorage.setItem("data",JSON.stringify(basket));
  generatecarditem();
}
let decrement=(id)=>
{
  let selectedid=id;
  if(basket.length==0)
  {
    return ;
  }
  let take=basket.find((x)=>x.id===selectedid.id);
  if(take.item==0)
  {
    return ;
  }
  else{
  take.item--;
  }
  update(selectedid.id);
  basket=basket.filter((x)=>x.item!==0);
  localStorage.setItem("data",JSON.stringify(basket));
  generatecarditem();
}
let update=(id)=>
{
  let take=basket.find((x)=>x.id===id);
  document.getElementById(id).innerHTML=take.item;
  calculation();
  totalamount();
}
let removeitem=(id)=>
{
  let selectedid=id;
  basket=basket.filter((x)=>x.id!==selectedid.id);
  generatecarditem();
  calculation();
  totalamount();
  localStorage.setItem("data",JSON.stringify(basket));
}
let totalamount=()=>{
  if(basket.length==0)
  {
    return ;
  }
  else
  {
    let total=basket.map((x)=>{
      let {id,item}=x;
      let search=shopitem.find((y)=>id==y.id)||[];
      return item*search.price;
    })
    let money=0;
    for(let i=0;i<total.length;i++)
    {
      money+=total[i];
    }
    labal.innerHTML=`<h3>Total Bill : $ ${money}</h3>
    <button onclick="clearallcard()" class="homebtn mt">Clear All card</button>`
  }
}
totalamount();
let clearallcard=()=>
{
  basket=[];
  generatecarditem();
  calculation();
  localStorage.setItem("data",JSON.stringify(basket));
}