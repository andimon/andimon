// Icons mapping for technologies using devicon

let techIcons = {};

// Documentation URLs for technologies
const techDocs = {
    'elixir': 'https://elixir-lang.org/docs.html',
    'postgresql': 'https://www.postgresql.org/docs/',
    '.net': 'https://docs.microsoft.com/en-us/dotnet/',
    'javascript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'typescript': 'https://www.typescriptlang.org/docs/',
    'react': 'https://reactjs.org/docs/getting-started.html',
    'node': 'https://nodejs.org/en/docs/',
    'python': 'https://docs.python.org/3/',
    'docker': 'https://docs.docker.com/',
    'aws': 'https://docs.aws.amazon.com/',
    'git': 'https://git-scm.com/doc',
    'html': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    'css': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    'sass': 'https://sass-lang.com/documentation',
    'graphql': 'https://graphql.org/learn/',
    'mongodb': 'https://docs.mongodb.com/',
    'mysql': 'https://dev.mysql.com/doc/',
    'redis': 'https://redis.io/documentation',
    'linux': 'https://www.kernel.org/doc/html/latest/',
    'bash': 'https://www.gnu.org/software/bash/manual/',
    'java': 'https://docs.oracle.com/en/java/',
    'php': 'https://www.php.net/docs.php',
    'ruby': 'https://www.ruby-lang.org/en/documentation/',
    'go': 'https://golang.org/doc/',
    'rust': 'https://doc.rust-lang.org/book/',
    'swift': 'https://developer.apple.com/documentation/swift',
    'kotlin': 'https://kotlinlang.org/docs/home.html',
    'angular': 'https://angular.io/docs',
    'vue': 'https://vuejs.org/guide/introduction.html',
    'svelte': 'https://svelte.dev/docs',
    'nextjs': 'https://nextjs.org/docs',
    'nuxt': 'https://nuxtjs.org/docs',
    'gatsby': 'https://www.gatsbyjs.com/docs/',
    'jest': 'https://jestjs.io/docs/getting-started',
    'mocha': 'https://mochajs.org/',
    'nginx': 'https://nginx.org/en/docs/',
    'kubernetes': 'https://kubernetes.io/docs/home/',
    'docker': 'https://docs.docker.com/'
    // Add more as needed
};

// Load the JSON file first
fetch('content/tech-icons.json')
    .then(response => response.json())
    .then(data => {
        techIcons = data;
        // Call any functions that need techIcons here
    })
    .catch(error => console.error('Error loading tech icons:', error));

// Function to get the appropriate icon class for a technology
function getTechIcon(tech) {
    const lowerTech = tech.toLowerCase();
    // Try to find exact match first
    if (techIcons[lowerTech]) {
        return techIcons[lowerTech];
    }
    // Try to find partial match (e.g., 'node' should match 'nodejs')
    const matchedKey = Object.keys(techIcons).find(key => 
        lowerTech.includes(key) || key.includes(lowerTech)
    );
    return matchedKey ? techIcons[matchedKey] : 'devicon-code-plain';
}

// Function to get documentation URL for a technology
function getTechDocUrl(tech) {
    const lowerTech = tech.toLowerCase();
    // Try to find exact match first
    if (techDocs[lowerTech]) {
        return techDocs[lowerTech];
    }
    // Try to find partial match
    const matchedKey = Object.keys(techDocs).find(key => 
        lowerTech.includes(key) || key.includes(lowerTech)
    );
    return matchedKey ? techDocs[matchedKey] : '#'; // Default to '#' if no match found
}

// Function to update technologies section
function updateTechnologies(technologies) {
    const techContainer = document.getElementById('technologies-list');
    if (!techContainer || !Array.isArray(technologies)) return;
    
    techContainer.innerHTML = technologies
        .map(tech => {
            const techName = tech.trim();
            const docUrl = getTechDocUrl(techName);
            const iconClass = getTechIcon(techName);
            
            return `
                <a href="${docUrl}" target="_blank" rel="noopener noreferrer" class="tech-tag">
                    <i class="${iconClass}"></i>
                    <span>${techName}</span>
                </a>
            `;
        })
        .join('');
}

// Function to update social links section
function updateSocialLinks(socials) {
    const socialsContainer = document.getElementById('social-links');
    if (!socialsContainer || !socials) return;
    
    socialsContainer.innerHTML = Object.entries(socials)
        .map(([platform, url]) => {
            const platformLower = platform.toLowerCase();
            let iconClass = 'fa-link'; // default icon
            
            // Map platforms to their respective Font Awesome icons
            const socialIcons = {
                'github': 'fa-github',
                'linkedin': 'fa-linkedin',
                'twitter': 'fa-twitter',
                'facebook': 'fa-facebook',
                'instagram': 'fa-instagram',
                'youtube': 'fa-youtube',
                'twitch': 'fa-twitch',
                'discord': 'fa-discord',
                'stackoverflow': 'fa-stack-overflow',
                'medium': 'fa-medium',
                'dev': 'fa-dev',
                'codepen': 'fa-codepen',
                'gitlab': 'fa-gitlab',
                'bitbucket': 'fa-bitbucket',
                'reddit': 'fa-reddit',
                'telegram': 'fa-telegram',
                'slack': 'fa-slack',
                'email': 'fa-envelope',
                'website': 'fa-globe',
                'resume': 'fa-file-pdf'
            };
            
            // Find matching icon or use the platform name as class
            const matchedIcon = Object.entries(socialIcons).find(([key]) => 
                platformLower.includes(key) || key.includes(platformLower)
            );
            
            iconClass = matchedIcon ? matchedIcon[1] : `fa-${platformLower}`;
            const displayName = platform.charAt(0).toUpperCase() + platform.slice(1);
            
            return `
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-tag">
                    <i class="fab ${iconClass}"></i>
                    <span>${displayName}</span>
                </a>
            `;
        })
        .join('');
}

// Update the CSS to style the tech-tag and social-tag links
const style = document.createElement('style');
style.textContent = `
    /* Technology Tags */
    .tech-tag {
        display: inline-flex;
        align-items: center;
        background: #f1f8ff;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.9em;
        gap: 8px;
        transition: all 0.2s ease;
        text-decoration: none;
        color: inherit;
        margin: 3px;
    }
    
    .tech-tag:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        color: #0366d6;
    }
    
    .tech-tag i {
        font-size: 1em;
        color: #0366d6;
    }

    /* Social Tags - Similar to tech tags but with different colors */
    .social-tag {
        display: inline-flex;
        align-items: center;
        background: #f5f5f5;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.9em;
        gap: 8px;
        transition: all 0.2s ease;
        text-decoration: none;
        color: #333;
        margin: 3px;
        border: 1px solid #e1e4e8;
    }
    
    .social-tag:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        background: #f8f9fa;
        color: #0366d6;
    }
    
    .social-tag i {
        font-size: 1em;
        color: #6a737d;
    }
    
    .social-tag:hover i {
        color: inherit;
    }
`;
document.head.appendChild(style);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display content from data.json
    fetch('content/data.json')
        .then(response => response.json())
        .then(data => {
            // Update about section - using innerHTML to render HTML tags
            const aboutContent = document.getElementById('about-content');
            if (aboutContent) {
                aboutContent.innerHTML = data.about;
            }
            
            // Update technologies using the separate function
            if (data.technologies) {
                updateTechnologies(data.technologies);
            }
            
            // Update social links
            if (data.socials) {
                updateSocialLinks(data.socials);
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
