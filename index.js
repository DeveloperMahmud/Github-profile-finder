const CLIENT_ID = '6fabaee70618d8addd6a';
const CLIENT_SECRET = '226b252815b4c15c81a2d693fd6806e9b83f88ac';

async function getUser(name){
    const res = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&cliend_secret=${CLIENT_SECRET}`);

    const profile = await res.json();

    return profile;
}

document.querySelector('#search').addEventListener('submit', async(e) => {
    e.preventDefault();
    const username = document.querySelector('#findByUsername').value;
    
    const profile = await getUser(username);

    showProfile(profile);
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
















