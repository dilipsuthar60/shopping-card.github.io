let shop = document.getElementById("shop");
let basket=JSON.parse(localStorage.getItem("data"))||[];
const generateshop = () => {
  return (shop.innerHTML = shopitem
    .map((x) => {
      const { id ,name, price, desc, img } = x;
      let search=basket.find((x)=>x.id==id)||[]
      return `<div class="item">
        <img width="200" src=${img} alt="">
        <div class="detail">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h3>${price}$</h3>
                <div class="button">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${search.item===undefined?0:search.item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`;
    })
    .join(""));
};
generateshop();
let increment=(id)=>{
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
}
let update=(id)=>
{
  let take=basket.find((x)=>x.id===id);
  document.getElementById(id).innerHTML=take.item;
  calculation();
}
let calculation=()=>
{
  let sum=0
  for(let i=0;i<basket.length;i++)
  {
    sum+=basket[i].item;
  }
  document.getElementById("top").innerHTML=sum;
}
calculation();
