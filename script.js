// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display content from data.json
    fetch('content/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update about section - using innerHTML to render HTML tags
            const aboutContent = document.getElementById('about-content');
            if (aboutContent) {
                aboutContent.innerHTML = data.about;
            }
            
            // Update technologies
            const techContainer = document.getElementById('technologies-list');
            if (techContainer && Array.isArray(data.technologies)) {
                techContainer.innerHTML = data.technologies
                    .map(tech => `<span class="tech-tag">${tech}</span>`)
                    .join('');
            }
            
            // Update social links
            const socialsContainer = document.getElementById('social-links');
            if (socialsContainer && data.socials) {
                socialsContainer.innerHTML = Object.entries(data.socials)
                    .map(([platform, url]) => 
                        `<a href="${url}" target="_blank" rel="noopener noreferrer">${platform.charAt(0).toUpperCase() + platform.slice(1)}</a>`
                    )
                    .join(' | ');
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            const aboutContent = document.getElementById('about-content');
            if (aboutContent) {
                aboutContent.textContent = 'Failed to load content. Please try again later.';
            }
        });
});
