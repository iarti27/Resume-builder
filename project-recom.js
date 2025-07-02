document.getElementById('projectRecommendationButton').addEventListener('click', async () => {
    const position = document.getElementById('position').value;
    const skills = Array.from(document.querySelectorAll('.skill-entry .skill-name')).map(skill => skill.value).join(', ');


    const url = 'https://github-repos.p.rapidapi.com/search?user=samuk-a';
    const options = {
        method: 'GET',
        headers: {
           'x-rapidapi-key': '1680381a92msh50bbd6ac3fccfb4p1187a8jsnde1b3af1ccef',
		'x-rapidapi-host': 'github-repos.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); 

        const jobSuggestionsDisplayContainer = document.getElementById('jobSuggestionsDisplayContainer');
        jobSuggestionsDisplayContainer.innerHTML = ''; 


        const repositories = result.repositories;

        if (repositories.length > 0) {
            repositories.forEach(project => {
                jobSuggestionsDisplayContainer.innerHTML += `
                    <div class="project-recommendation bg-slate-50 border-solid border-neutral-950 p-4 mr-3 mb-4 w-full h-1/4">
                        <h4 class="text-blue-800 text-2xl p-3">${project.name}</h4>
                        <p class="text-blue-700 text-2xl p-3">Description: ${project.description || 'No description available'}</p>
                        <a href="${project.url}" target="_blank" class="bg-sky-600 p-2 m-4 text-white">View Project</a>
                    </div>
                `;
            });
        } else {
            jobSuggestionsDisplayContainer.innerHTML = '<p>No project recommendations found.</p>';
        }
    } catch (error) {
        console.error('Error fetching project recommendations:', error);
        jobSuggestionsDisplayContainer.innerHTML = '<p>Error fetching project recommendations. Please try again later.</p>';
    }
});