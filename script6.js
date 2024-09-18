const API_KEY = "b67f6577e20b411299425d0fc67799a8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("pakistan"));
async function fetchNews(topic) {
   const request = await fetch(`${url}${topic}&apikey=${API_KEY}`);
   const data = await request.json();
   console.log(data);
   bindData(data.articles);
}

function bindData(articles){
   const cardsContainer = document.getElementById('cards_container');
   const newsTemplate = document.getElementById('template-news1');

   cardsContainer.innerHTML = '';

   articles.forEach(article => {
      if(!article.urlToImage) return;
         const cardClone = newsTemplate.content.cloneNode(true);
         fillData(cardClone, article);
         cardsContainer.appendChild(cardClone);
   });
}

function fillData(cardClone, article){
   const newsImg = cardClone.querySelector('#news-img');
   const newsTitle = cardClone.querySelector('#Title1');
   const newsSource = cardClone.querySelector('#source1');
   const newsDesc = cardClone.querySelector('#news_desc1');

   newsImg.src = article.urlToImage;
   newsTitle.innerHTML = article.title;
   newsDesc.innerHTML = article.description;
   
   const date = new Date(article.publishedAt).toLocaleString("en-US", ()=>{
      timeZone: "Asia/Jakarta";
   });

   newsSource.innerHTML = `${article.source.name} , ${date}`;
   cardClone.firstElementChild.addEventListener('click', ()=>{
      window.open(article.url, '_blank');
   })
}

function onNavClick(id){
   fetchNews(id);
}

const searchButton = document.getElementById('search_button1');
const searchText = document.getElementById('search_text');

searchButton.addEventListener('click', ()=>{
   const query = searchText.value;
   if(!query) return;
   fetchNews(query);
})