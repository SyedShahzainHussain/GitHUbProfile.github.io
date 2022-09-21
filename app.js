const Api = "https://api.github.com/users/";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search')


async function getUser(userName){
    const rsp = await fetch(Api + userName);
    const data = await rsp.json();
    console.log(data)
    createUser(data);
    showRepo(userName)
}

async function showRepo(userName){
    const rsp = await fetch(Api + userName +"/repos");
    const data = await rsp.json();
    console.log(data)
    createRepo(data)
}


function createUser(user){
  const cardHtml= `
    <div class= "card">
        <div >
            <img class="avator" src="${user.avatar_url
            }" alt="${user.name}"/>
        </div>

        <div class="user-info">
        <h2>${user.name}</h2>
        <p> ${user.bio}</p>


        <ul class="info">
        <li>${user.followers}<strong>Follwers</strong></li>
        <li>${user.following}<strong>Following</strong></li>
        <li>${user.public_repos}<strong>Repos</strong></li>
        
        </ul>
        <div id="repo"></div>
        
        </div>

    </div>    
    `;
    main.innerHTML = cardHtml;
    
}

function createRepo(repo){
   const repoEl = document.getElementById('repo')
   repo
   
   .sort((a,b) =>b.stargazers_count - a.stargazers_count)
   .slice(0,10)
   
   
   
   .forEach((repo)=>{
        const reposEl = document.createElement('a')
        reposEl.classList.add('repo')
        reposEl.href = repo.html_url;
        reposEl.target = "_blank";
        reposEl.innerText = repo.name;

        repoEl.appendChild(reposEl)
    })
}



















form.addEventListener(("submit"),(e)=>{
    e.preventDefault()

    const user= search.value;

    if(user){
        getUser(user);
        
        search.value = "";
    }
    


    
})
