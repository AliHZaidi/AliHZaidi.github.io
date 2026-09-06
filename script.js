document.addEventListener('DOMContentLoaded', () => {
    const site = window.siteData;
    const navTarget = document.querySelector('[data-nav]');
    const footerTarget = document.querySelector('[data-footer]');
    const pageContent = document.getElementById('page-content');
    const currentPage = document.body.dataset.page || 'home';

    const savedTheme = localStorage.getItem('ali-zaidi-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    if (navTarget) {
        navTarget.innerHTML = `
            <div class="nav-container">
                <a href="index.html" class="logo">${site.name}</a>
                <div class="nav-shell">
                    <ul class="nav-links">
                        ${site.navLinks
                            .map(
                                (link) => `
                                    <li class="${link.key === currentPage ? 'active' : ''}">
                                        <a href="${link.href}">${link.label}</a>
                                    </li>
                                `
                            )
                            .join('')}
                    </ul>
                    <button class="theme-toggle" type="button" aria-label="Toggle dark theme">
                        <span class="theme-toggle-icon">${document.body.classList.contains('dark-theme') ? '☀️' : '🌙'}</span>
                    </button>
                </div>
            </div>
        `;

        const themeToggle = navTarget.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isDark = document.body.classList.toggle('dark-theme');
                localStorage.setItem('ali-zaidi-theme', isDark ? 'dark' : 'light');
                themeToggle.querySelector('.theme-toggle-icon').textContent = isDark ? '☀️' : '🌙';
            });
        }
    }

    if (footerTarget) {
        footerTarget.innerHTML = `
            <div class="footer-shell">
                <div class="footer-inner">
                    <div>
                        <p class="footer-name">${site.name}</p>
                        <p class="footer-copy">&copy; 2026 Ali Zaidi. All rights reserved.</p>
                    </div>
                    <div class="social-links">
                        ${site.socialLinks
                            .map(
                                (item) => `
                                    <a href="${item.url}" target="_blank" rel="noreferrer" aria-label="${item.label}" class="fa ${item.icon}"></a>
                                `
                            )
                            .join('')}
                    </div>
                </div>
            </div>
        `;
    }

    if (!pageContent) return;

    const renderAboutSection = () => `
        <section id="about" class="panel section-card">
            <a href="#about" class="section-header-link">About Me</a>
            <div class="about-grid">
                <div class="profile-card">
                    <img src="${site.profileImage}" alt="Ali Zaidi" class="profile-image">
                    <div class="contact-card">
                        <h3>Contact</h3>
                        <p>${site.email}</p>
                        <div class="social-links compact">
                            ${site.socialLinks
                                .map(
                                    (item) => `
                                        <a href="${item.url}" target="_blank" rel="noreferrer" aria-label="${item.label}" class="fa ${item.icon}"></a>
                                    `
                                )
                                .join('')}
                        </div>
                    </div>
                </div>
                <div class="copy-block">
                    ${site.aboutParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
                </div>
            </div>
        </section>
    `;

    const renderPublicationsSection = () => `
        <section id="publications" class="panel section-card">
            <a href="#publications" class="section-header-link">Publications</a>
            <ul class="publication-list">
                ${site.publications
                    .map(
                        (pub) => `
                            <li class="publication-item">
                                <div class="publication-meta">${pub.status ? `<span class="status-badge">${pub.status}</span>` : ''}</div>
                                <h3>${pub.title}</h3>
                                <p class="authors">${pub.authors}</p>
                                <p class="venue">${pub.venue}</p>
                                ${pub.link && pub.link !== '#' ? `<a href="${pub.link}" target="_blank" rel="noreferrer">Read more</a>` : ''}
                            </li>
                        `
                    )
                    .join('')}
            </ul>
        </section>
    `;

    const renderTeachingSection = () => `
        <section id="teaching" class="panel section-card">
            <a href="#teaching" class="section-header-link">Teaching</a>
            <ul class="info-list">
                ${site.teaching.map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </section>
    `;

    const renderAwardsSection = () => `
        <section id="awards" class="panel section-card">
            <a href="#awards" class="section-header-link">Awards and Honors</a>
            <ul class="info-list">
                ${site.awards.map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </section>
    `;

    const renderRolesSection = () => `
        <section id="roles" class="panel section-card">
            <a href="#roles" class="section-header-link">Leadership Roles</a>
            <ul class="info-list">
                ${site.roles.map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </section>
    `;

    const renderHome = () => `
        <section class="hero-panel">
            <div class="hero-content">
                <p class="eyebrow">Human-Centered AI • Design • HCI</p>
                <h1 id="hero-title">${site.heroRotations[0].title}</h1>
                <p id="hero-subtitle" class="hero-subtitle">${site.heroRotations[0].subtitle}</p>
                <div class="hero-actions">
                    <a href="#about" class="primary-btn">Read more</a>
                    <a href="#publications" class="secondary-btn">View publications</a>
                </div>
            </div>
        </section>
        ${renderAboutSection()}
        ${renderPublicationsSection()}
        ${renderTeachingSection()}
        ${renderAwardsSection()}
        ${renderRolesSection()}
    `;

    const renderers = {
        home: renderHome,
        about: renderAboutSection,
        publications: renderPublicationsSection,
        teaching: renderTeachingSection,
        awards: renderAwardsSection,
        roles: renderRolesSection
    };

    pageContent.innerHTML = (renderers[currentPage] || renderHome)();

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    if (currentPage === 'home') {
        let heroIndex = 0;
        const titleNode = document.getElementById('hero-title');
        const subtitleNode = document.getElementById('hero-subtitle');

        if (titleNode && subtitleNode) {
            const rotateHero = () => {
                const nextIndex = (heroIndex + 1) % site.heroRotations.length;

                titleNode.classList.add('is-transitioning');
                subtitleNode.classList.add('is-transitioning');

                setTimeout(() => {
                    heroIndex = nextIndex;
                    titleNode.textContent = site.heroRotations[heroIndex].title;
                    subtitleNode.textContent = site.heroRotations[heroIndex].subtitle;

                    titleNode.classList.remove('is-transitioning');
                    subtitleNode.classList.remove('is-transitioning');
                }, 220);
            };

            setInterval(rotateHero, 5000);
        }
    }
});