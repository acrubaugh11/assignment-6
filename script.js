'use strict';
//  https://api.github.com/users/USERNAME/repos
async function getRepos(username) {
    try {
        let res = await fetch(`https://api.github.com/users/${username}/repos?per_page=20`);
        if(res.status == 404){
            alert("Invalid Username");
            return;
        }
        if(!res.ok){
            throw new Error(await res.text())
        }
        res = await res.json();
        console.log("Repos resolved: My Repo Data:", res)

        let gallery = document.querySelector("main");
        gallery.innerHTML = "";

        
        for(let i = 0; i < 20; i++){
            let galleryItem = document.createElement("div");
            galleryItem.classList.add("repo");
            let repoItem = res[i];
            if(!repoItem) break;
            // galleryItem.innerHTML = `<a href="https://github.com/${repoItem.full_name}" target="_blank">${repoItem.name}</a>`;
            // Set the link to the repo name
            let repoLink = document.createElement("a");
            let githubIcon = document.createElement("img");
            githubIcon.classList.toggle("icon")
            repoLink.href = "https://github.com/" + repoItem.full_name;
            repoLink.target = "_blank";
            githubIcon.src = "images/github.svg"
            repoLink.appendChild(githubIcon);
            repoLink.appendChild(document.createTextNode(repoItem.name));

            // Set the description
            let repoDesc = document.createElement("p");
            if(!repoItem.description){
                repoDesc.textContent = "No description";
               } else{
                repoDesc.textContent = repoItem.description;
               }

            // Set created at
            let repoCreated = document.createElement("p");
            let createdDate = new Date(repoItem.created_at);
            const dateFormat = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }
            createdDate = createdDate.toLocaleDateString('en-US', dateFormat);
            repoCreated.textContent = "Created: " + createdDate;

            // Set last updated
            let repoUpdated = document.createElement("p");
            let updatedDate = new Date(repoItem.updated_at);
            updatedDate = updatedDate.toLocaleTimeString('en-US', dateFormat).split(',')[0];
            repoUpdated.textContent = "Updated: " + updatedDate;

            // Set watchers
            let repoWatchers = document.createElement("p");
            let watchers = repoItem.watchers;
            repoWatchers.textContent = "Watchers: " + watchers;

            // Set languages
            let repoLanguages = document.createElement("p");
            try {
                let languages = await fetch(`https://api.github.com/repos/${username}/` + repoItem.name + "/languages");
                languages = await languages.json();
                languages = Object.keys(languages).join(", ");
                repoLanguages.textContent = "Languages: " + languages;



            }
            catch(err){
                console.log(err);
            }

            // // Set commits
            let repoCommits = document.createElement("p");
            try {
                let commits = await fetch(`https://api.github.com/repos/${username}/${repoItem.name}/commits?per_page=1`);
                let linkHeader = commits.headers.get("Link");
                let totalCommits = 0;
                if (linkHeader){
                    let pageNumber = linkHeader.match(/&page=(\d+)>; rel="last"/);
                    if (pageNumber){
                        totalCommits = pageNumber[1];
                    }
                    else {
                        totalCommits = 1;
                    }

                }
                else {
                    totalCommits = 1;
                }
                repoCommits.textContent = "Commits: " + totalCommits;
            }
            catch (err) {
                console.log("Error: " + err);
            }



            
            
            // Append all children
            galleryItem.appendChild(repoLink);
            galleryItem.appendChild(repoDesc);
            galleryItem.appendChild(repoCreated);
            galleryItem.appendChild(repoUpdated);
            galleryItem.appendChild(repoWatchers);
            galleryItem.appendChild(repoLanguages);
            galleryItem.appendChild(repoCommits);


            gallery.appendChild(galleryItem);
    
        }



    }
    catch (err) {
        console.log("Error:", err);

    }
}

// Handle search bar to dynamically get repos
let searchBar = document.getElementById("userSearch");
searchBar.addEventListener("submit", ((e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    if(!username){
        return;
    }
    getRepos(username);

}));
