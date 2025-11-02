import {loadJSON} from './utils.js';


// Function to get the appropriate icon class for a technology
function getTechIcon(tech, techIcons) {
    const lowerTech = tech.toLowerCase();
    if (techIcons[lowerTech]) {
        return techIcons[lowerTech];
    }
    const matchedKey = Object.keys(techIcons).find(key => 
        lowerTech.includes(key) || key.includes(lowerTech)
    );
    return matchedKey ? techIcons[matchedKey] : 'devicon-code-plain';
}

// Function to get documentation URL for a technology
function getTechDocUrl(tech, techDocs) {
    const lowerTech = tech.toLowerCase();
    if (techDocs[lowerTech]) {
        return techDocs[lowerTech];
    }
    const matchedKey = Object.keys(techDocs).find(key => 
        lowerTech.includes(key) || key.includes(lowerTech)
    );
    return matchedKey ? techDocs[matchedKey] : '#';
}

// Function to update technologies section
function updateTechnologies(technologies, techIcons, techDocs) {
    const techContainer = document.getElementById('technologies-list');
    if (!techContainer || !Array.isArray(technologies)) return;
    
    techContainer.innerHTML = technologies
        .map(tech => {
            const techName = tech.trim();
            const docUrl = getTechDocUrl(techName, techDocs);
            const iconClass = getTechIcon(techName, techIcons);
            
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
    
    socialsContainer.innerHTML = Object.entries(socials)
        .map(([platform, url]) => {
            const platformLower = platform.toLowerCase();
            const matchedIcon = Object.entries(socialIcons).find(([key]) => 
                platformLower.includes(key) || key.includes(platformLower)
            );
            
            const iconClass = matchedIcon ? matchedIcon[1] : `fa-${platformLower}`;
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
        background: var(--tag-bg);
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.9em;
        gap: 8px;
        transition: all 0.2s ease;
        text-decoration: none;
        color: var(--text-color);
        margin: 3px;
        border: 1px solid var(--border-color);
    }

    .tech-tag:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 5px var(--tag-hover-shadow);
        color: var(--link-color);
    }

    .tech-tag i {
        font-size: 1em;
        color: var(--link-color);
    }

    /* Social Tags */
    .social-tag {
        display: inline-flex;
        align-items: center;
        background: var(--tag-bg);
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.9em;
        gap: 8px;
        transition: all 0.2s ease;
        text-decoration: none;
        color: var(--text-color);
        margin: 3px;
        border: 1px solid var(--border-color);
    }

    .social-tag:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 5px var(--tag-hover-shadow);
        opacity: 0.8;
    }

    .social-tag i {
        font-size: 1em;
        color: var(--link-color);
    }

    .social-tag:hover i {
        color: inherit;
    }
`;
document.head.appendChild(style);

// Initialize theme
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const syntaxLight = document.getElementById('syntax-light');
    const syntaxDark = document.getElementById('syntax-dark');

    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (syntaxLight) syntaxLight.disabled = true;
        if (syntaxDark) syntaxDark.disabled = false;
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');

            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                if (syntaxLight) syntaxLight.disabled = false;
                if (syntaxDark) syntaxDark.disabled = true;
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                if (syntaxLight) syntaxLight.disabled = true;
                if (syntaxDark) syntaxDark.disabled = false;
            }
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load all JSON files concurrently
        const [techDocs, techIcons, data] = await Promise.all([
            loadJSON('content/tech-docs.json'),
            loadJSON('content/tech-icons.json'),
            loadJSON('content/data.json')
        ]);

        // Update about section
        const aboutContent = document.getElementById('about-content');
        if (aboutContent && data) {
            aboutContent.innerHTML = data.about;
        }
        
        // Update technologies
        if (data?.technologies && techIcons && techDocs) {
            updateTechnologies(data.technologies, techIcons, techDocs);
        }
        
        // Update social links
        if (data?.socials) {
            updateSocialLinks(data.socials);
        }

    } catch (error) {
        console.error('Error loading content:', error);
        const aboutContent = document.getElementById('about-content');
        if (aboutContent) {
            aboutContent.textContent = 'Failed to load content. Please try again later.';
        }
    }

    // Initialize theme toggle
    initTheme();
});