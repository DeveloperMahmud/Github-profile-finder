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

    console.log(username);

    const profile = await getUser(username);
    console.log(profile);
})