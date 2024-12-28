async function fetchGitHubRepos() {
    try {
        // Show loading indicator
        document.getElementById('loading-indicator').style.display = 'block';

        // Fetch data from the Flask API
        const response = await fetch('http://127.0.0.1:5000/api/repos?username=felskeM');
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        // Parse the JSON response
        const repos = await response.json();

        // If no repositories are found, show an error message
        if (!repos || repos.length === 0) {
            throw new Error('No repositories found');
        }

        // Hide the loading indicator
        document.getElementById('loading-indicator').style.display = 'none';

        const container = document.getElementById('repos-container');
        container.innerHTML = ''; // Clear any previous content

        // Loop through the repositories and create elements to display them
        repos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('repo');

            repoDiv.innerHTML = `
                <h3><a href="${repo.url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description available'}</p>
                <p><strong>Stars:</strong> ${repo.stars}</p>
            `;
            container.appendChild(repoDiv);
        });
    } catch (error) {
        // Display error message if the fetch fails
        const container = document.getElementById('repos-container');
        container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Error fetching repositories:', error); // Log the error in the console for debugging
    }
}

// Call the function to fetch repositories on page load
fetchGitHubRepos();

// Refresh repositories every 5 minutes (300000 milliseconds)
setInterval(fetchGitHubRepos, 300000);
