const API_KEY = "03bc74bbde0a434ab41541ea56876551";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load' , ()=>
{

    fetchdata("india");
    
});


async function fetchdata(news)
{

    const res = await fetch(`${url}${news}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    binddata(data.articles);
 
}

function binddata(articles)
{
    const templatecard = document.getElementById("template-card");
    const card = document.getElementById("card-container");
    
    card.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage)
        {
            return;
        }
        const cardclone = templatecard.content.cloneNode(true);
        filldataIncard(cardclone , article);
        card.appendChild(cardclone);
    });
    
}

function filldataIncard(cardclone , article)
{
 const news_img  = cardclone.getElementById("news-img");
 const titles = cardclone.getElementById("card-title");
 const card_source = cardclone.getElementById("card-source");
 const card_desc = cardclone.getElementById("card-desc");

  news_img.src = article.urlToImage;
  titles.innerHTML = article.title;
  card_desc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/jakarta"
  });

  card_source.innerHTML =`${article.source.name}• ${date}`;

  cardclone.firstElementChild.addEventListener("click",
  ()=>{
   window.open(article.url , "_blank");
  });
}

let curnavlink = null;
function navlinknews(id)
{
  fetchdata(id);  
  const newid = document.getElementById(id);
  curnavlink?.classList.remove('active'); 
  curnavlink = newid;
  curnavlink.classList.add('active');
} 

const inputtext = document.getElementById("input-text");
const searchbtn = document.getElementById("search-btn");

searchbtn.addEventListener('click', ()=>
{
    const query = inputtext.value;
    if(!query) return;
    fetchdata(query);
    curnavlink?.classList.remove("active");
});