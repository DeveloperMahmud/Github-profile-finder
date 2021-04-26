const CLIENT_ID = '6fabaee70618d8addd6a';
const CLIENT_SECRET = '226b252815b4c15c81a2d693fd6806e9b83f88ac';

async function getUser(name){
    const res = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&cliend_secret=${CLIENT_SECRET}`);

    const profile = await res.json();

    return profile;
}

async function getRepos(profile){
    const res = await fetch(
        `${profile.repos_url}?client_id=${CLIENT_ID}&cliend_secret=${CLIENT_SECRET}&per_page=10`
    );
    const repo = await res.json();
    return repo;

}

document.querySelector('#search').addEventListener('submit', async(e) => {
    e.preventDefault();
    const username = document.querySelector('#findByUsername').value;

    const profile = await getUser(username);
    
    if(username.length > 0){
        document.querySelector('.loader').style.display = 'block';
        document.querySelector('.notFound').style.display = 'none';
        document.querySelector('.user-details').style.display = 'none';
        
        
        document.querySelector('.loader').style.display = 'none';
        
        if(profile.message ==='Not Found'){
            document.querySelector('.notFound').style.display = 'block';
            
            
        }else{
            const repos = await getRepos(profile);
            document.querySelector('.user-details').style.display = 'flex';
        
            showProfile(profile);
            showRepos(repos);
        }

        
    const username = document.querySelector('#findByUsername').value = '';
    }

})

function showProfile(profile){
    document.querySelector('.profile').innerHTML = `

        <img
            src="${profile.avatar_url}"
            alt="${profile.name}"/>
        </img>    
        <p class="name">${profile.name}</p>
        <p class="username login">${profile.login}</p>
        <p class="bio">
            ${profile.bio}
        </p>

        <div class="followers-stars">
            <p>
                <ion-icon name="people-outline"></ion-icon>
                <span class="followers"> ${profile.followers} </span> followers
            </p>
                <span class="dot">·</span>
            <p>
            <span class="following"> ${profile.following} </span> 
                following
            </p>
        </div>

        <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            ${profile.company}
        </p>
        <p class="location">
            <ion-icon name="location-outline"></ion-icon>${profile.location}
        </p>

    `;
};

function showRepos(repos){
    let newHtml = '';
    for(let repo of repos){
        newHtml += `
            <div class="repo">
                <div class="repo_name">
                    <a href="${repo.html_url}">${repo.name}</a>
                </div>
                <p>
                    <span class="circle"></span>${repo.language}
                    <ion-icon name="star-outline"></ion-icon> ${repo.watchers}
                    <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks}
                </p>
            </div>
        `;
    }
    document.querySelector('.repos').innerHTML = newHtml;
    
};













