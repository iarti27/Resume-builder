document.getElementById('jobSuggestionButton').addEventListener('click', async () => {
    const position = document.getElementById('position').value;
    const skills = Array.from(document.querySelectorAll('.skill-entry .skill-name')).map(skill => skill.value).join(', ');


    const url = `https://jobs-api14.p.rapidapi.com/v2/list?query=${encodeURIComponent(position)}&location=United%20States&autoTranslateLocation=false&remoteOnly=false&employmentTypes=fulltime%3Bparttime%3Bintern%3Bcontractor`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1680381a92msh50bbd6ac3fccfb4p1187a8jsnde1b3af1ccef', 
            'x-rapidapi-host': 'jobs-api14.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

       
        const jobSuggestionsDisplayContainer = document.getElementById('jobSuggestionsDisplayContainer');
        jobSuggestionsDisplayContainer.innerHTML = '';

        if (result.jobs.length > 0) {
            result.jobs.forEach(job => {
                jobSuggestionsDisplayContainer.innerHTML += `
                 
                    <div class=" job-suggestion bg-slate-50 border-solid border-neutral-950 p-4 mr-3 mb-4 w-full h-1/4">
                        <h4 class="text-blue-800 text-2xl p-3">${job.title}</h4>
                        <p class="text-blue-700 text-2xl p-3">Company: ${job.company}</p>
                        <p>Location: ${job.location}</p>
                        <p>Type: ${job.employmentType}</p>
                        <textarea class="p-4 mb-2" rows="7">${job.description}</textarea>
                        <a href="${job.jobProviders[0].url}" target="_blank" class="bg-sky-600 p-2 m-4 text-white">Apply Here</a>
                    </div>
                 
                `;
            });
        } else {
            jobSuggestionsDisplayContainer.innerHTML = '<p>No job suggestions found.</p>';
        }
    } catch (error) {
        console.error('Error fetching job suggestions:', error);
        document.getElementById('jobSuggestionsDisplayContainer').innerHTML = '<p>Error fetching job suggestions. Please try again later.</p>';
    }
});