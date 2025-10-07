'use strict';
//  https://api.github.com/users/USERNAME/repos



async function getRepos() {
    try {
        let res = await fetch("https://api.github.com/users/acrubaugh11/repos");
        if(!res.ok){
            throw new Error(await res.text())
        }
        res = await res.json();
        console.log("Repos resolved: My Repo Data:", res)
    }
    catch (err) {
        console.log("Error:", err);

    }
}

getRepos();