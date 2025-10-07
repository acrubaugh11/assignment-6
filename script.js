'use strict';
//  https://api.github.com/users/USERNAME/repos
async function getRepos() {
    try {
        let res = await fetch("https://api.github.com/users/acrubaugh11/repos?per_page=20");
        if(!res.ok){
            throw new Error(await res.text())
        }
        res = await res.json();
        console.log("Repos resolved: My Repo Data:", res)

        let gallery = document.querySelector("main");

        
        for(let i = 0; i < res.length; i++){
            let galleryItem = document.createElement("div");
            galleryItem.classList.add("repo");
            let repoItem = res[i];
            if(!repoItem) break;
            // galleryItem.innerHTML = `<a href="https://github.com/${repoItem.full_name}" target="_blank">${repoItem.name}</a>`;
            // Set the link to the repo name
            let repoLink = document.createElement("a");
            repoLink.href = "https://github.com/" + repoItem.full_name;
            repoLink.target = "_blank";
            repoLink.textContent = repoItem.name;

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


            
            
            // Append all children
            galleryItem.appendChild(repoLink);
            galleryItem.appendChild(repoDesc);
            galleryItem.appendChild(repoCreated);
            galleryItem.appendChild(repoUpdated);

            gallery.appendChild(galleryItem);
    
        }



    }
    catch (err) {
        console.log("Error:", err);

    }
}


getRepos();