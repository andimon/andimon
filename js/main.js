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
    'docker': 'https://docs.docker.com/',
    'c++': 'https://en.cppreference.com/w/',
    'prometheus': 'https://prometheus.io/docs/introduction/overview/',
    'grafana': 'https://grafana.com/docs/',
    'elasticsearch': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html',
    'logstash': 'https://www.elastic.co/guide/en/logstash/current/index.html',
    'kibana': 'https://www.elastic.co/guide/en/kibana/current/index.html'
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
                <a href="${docUrl}" target="_blank" rel="noopener noreferrer" class="tech-tag d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border text-decoration-none">
                    <i class="${iconClass}"></i>
                    <span>${techName}</span>
                </a>
            `;
        })
        .join('');
}

// Function to update books section
function updateBooks(books) {
    const booksContainer = document.getElementById('books-list');
    if (!booksContainer || !Array.isArray(books)) return;

    booksContainer.innerHTML = books.map(book => {
        const percent = Math.round((book.pages_read / book.total_pages) * 100);
        return `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-start mb-1">
                    <div>
                        <a href="${book.link}" target="_blank" rel="noopener noreferrer" class="fw-semibold text-decoration-none">${book.title}</a>
                        <span class="text-muted ms-2 small">by ${book.author}</span>
                    </div>
                    <span class="small text-muted ms-3 text-nowrap">${percent}%</span>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${percent}%;" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="small text-muted mt-1">${book.pages_read} / ${book.total_pages} pages</div>
            </div>
        `;
    }).join('');
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
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-tag d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border text-decoration-none">
                    <i class="fab ${iconClass}"></i>
                    <span>${displayName}</span>
                </a>
            `;
        })
        .join('');
}

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

            // Update books
            if (data.books) {
                updateBooks(data.books);
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            const aboutContent = document.getElementById('about-content');
            if (aboutContent) {
                aboutContent.textContent = 'Failed to load content. Please try again later.';
            }
        });

    // Dark mode toggle functionality
    const themeToggleButtons = document.querySelectorAll('[data-theme-toggle]');
    const themeIcons = document.querySelectorAll('.theme-icon');
    const syntaxLight = document.getElementById('syntax-light');
    const syntaxDark = document.getElementById('syntax-dark');

    const applyTheme = (theme, persist = true) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcons.forEach((icon) => {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            });
            if (syntaxLight) syntaxLight.disabled = true;
            if (syntaxDark) syntaxDark.disabled = false;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcons.forEach((icon) => {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            });
            if (syntaxLight) syntaxLight.disabled = false;
            if (syntaxDark) syntaxDark.disabled = true;
        }

        if (persist) {
            localStorage.setItem('theme', theme);
        }
    };

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme, false);

    // Toggle theme on button click
    themeToggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            applyTheme(theme === 'dark' ? 'light' : 'dark');
        });
    });
});
