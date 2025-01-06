window.onload = function() {
    const githubActivity = document.getElementById("github-activity");
    const reposContainer = document.getElementById("repos-container");
    const loadingIndicator = document.getElementById("loading-indicator");

    // Make an API call to fetch the repositories
    fetch('/api/repos')
        .then(response => response.json())
        .then(data => {
            loadingIndicator.style.display = 'none'; // Hide the loading indicator
            if (data && data.length) {
                // Loop through the repos and display them
                data.forEach(repo => {
                    const repoDiv = document.createElement('div');
                    repoDiv.classList.add('repo');
                    repoDiv.innerHTML = `
                        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                        <p>${repo.description || 'No description available'}</p>
                        <strong>Language: ${repo.language}</strong>
                    `;
                    reposContainer.appendChild(repoDiv);
                });
            } else {
                reposContainer.innerHTML = "<p>No repositories found.</p>";
            }
        })
        .catch(error => {
            loadingIndicator.style.display = 'none';
            reposContainer.innerHTML = "<p>Failed to load repositories.</p>";
            console.error('Error fetching GitHub data:', error);
        });
};