// ===== CONFIGURATION =====
class Portfolio {
    constructor() {
        this.init();
    }

    // ===== INITIALISATION =====
    init() {
        // Attendre que le DOM soit chargé
        document.addEventListener('DOMContentLoaded', () => {
            this.setupLoader();
            this.setupTheme();
            this.setupNavigation();
            this.setupSmoothScroll();
            this.setupAnimations();
            this.setupProjects();
            this.setupVeille();
            this.setupForm();
            this.setupCounters();
            this.setupBackToTop();
            
            console.log('Portfolio initialisé avec succès 🚀');
        });
    }

    // ===== LOADER =====
    setupLoader() {
        const loader = document.getElementById('loader');
        
        if (loader) {
            // Simuler un chargement minimum
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 800);
        }
    }

    // ===== THÈME =====
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');

        // Appliquer le thème sauvegardé ou le thème système
        if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }

        // Gérer le toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                
                if (currentTheme === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                }
            });
        }

        // Surveiller les changements de thème système
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                }
            }
        });
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const mobileClose = document.getElementById('mobileClose');
        const navMobile = document.getElementById('navMobile');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
        const navbar = document.getElementById('navbar');

        // Menu mobile
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMobile.classList.toggle('active');
                document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
            });
        }

        if (mobileClose) {
            mobileClose.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Fermer le menu mobile en cliquant sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Navigation sticky
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                navbar.style.backgroundColor = 'rgba(var(--bg-primary), 0.95)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.backgroundColor = 'rgba(var(--bg-primary), 0.9)';
            }
        });
    }

    // ===== SMOOTH SCROLL =====
    setupSmoothScroll() {
        const scrollLinks = document.querySelectorAll('[data-scroll]');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (!targetId || targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight + 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ===== ANIMATIONS =====
    setupAnimations() {
        // Observer pour les animations au scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation des barres de compétences
                    if (entry.target.classList.contains('skill-item')) {
                        const level = entry.target.getAttribute('data-level');
                        const progressBar = entry.target.querySelector('.skill-progress');
                        if (progressBar) {
                            setTimeout(() => {
                                progressBar.style.width = `${level}%`;
                            }, 200);
                        }
                    }
                    
                    // Animation fade-in
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        const animatedElements = document.querySelectorAll(
            '.about-card, .skill-category, .timeline-item, .project-card, .edu-card, .info-card'
        );

        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Animation des formes du hero
        const heroShapes = document.querySelectorAll('.hero-shape');
        heroShapes.forEach((shape, index) => {
            shape.style.animation = `float ${6 + index}s ease-in-out infinite`;
        });

        // Ajouter l'animation float
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== PROJETS =====
    setupProjects() {
    const projectsData = [
        // ===== PROJET 1 : Site Harry Potter =====
                {
            id: 1,
            title: "Site Vitrine - Entreprise de Piscines",
            date: "Octobre 2024",
            category: "web",
            description: "Site vitrine responsive pour une entreprise spécialisée dans la construction et l'entretien de piscines. Présentation des services, galerie et formulaire de contact.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Form Validation"],
            image: "",
            links: {
                live: "#",
                github: "https://github.com/ziyadbch22/site-piscine"
            }
        },
        
        // ===== PROJET 2 : Quiz Culture Générale Java =====
                {
            id: 2,
            title: "Univers Harry Potter - Site Interactif",
            date: "Novembre 2024",
            category: "web",
            description: "Site web interactif sur l'univers Harry Potter avec exploration des maisons, personnages et sorts. Intégration d'une API Harry Potter pour les données dynamiques.",
            technologies: ["HTML5", "CSS3", "JavaScript", "API REST", "Fetch API"],
            image: "https://raw.githubusercontent.com/ziyadbch22/port/main/projets/hp.png",
            links: {
                live: "",
                github: "https://github.com/ziyadbch22/harry-potter-universe"
            }
        },

        
        // ===== PROJET 3 : Site Vitrine Piscine =====
                {
            id: 3,
            title: "Site Restaurant - WordPress",
            date: "Février 2025",
            category: "web",
            description: "Site web complet pour un restaurant créé avec WordPress. Thème personnalisé, gestion de menu en ligne, réservations et galerie photo.",
            technologies: ["WordPress", "PHP", "MySQL", "Elementor", "WooCommerce"],
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&auto=format",
            links: {
                live: "#",
                github: "#"
            }
        },

        
        // ===== PROJET 4 : Site WordPress Restaurant =====
        {
            id: 4,
            title: "Quiz Culture Générale - Application Java",
            date: "Janvier 2025",
            category: "java",
            description: "Application desktop Java avec interface graphique pour un quiz de culture générale. Gestion des scores, timer et sauvegarde des résultats.",
            technologies: ["Java", "Java Swing", "JDBC", "MySQL", "POO"],
            image: "assets/projects/quiz.png",
            links: {
                live: "#",
                github: "https://github.com/ziyadbch22/quiz-culture-generale"
            }
        },
                {
            id: 5,
            title: "Site Jos Medical Export",
            date: "Mai 2025",
            category: "web",
            description: "Refonte du site vitrine avec gestion des produits médicaux et formulaire de contact.",
            technologies: ["HTML", "CSS", "PHP", "MySQL", "JavaScript"],
            image: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?w=400&h=300&fit=crop",
            links: {
                live: "#",
                github: "https://github.com/ziyadbch22/josmedical"
            }
        }
        ,
        // ===== ESPACE POUR TES FUTURS PROJETS =====
        {
            id: 6,
            title: "Projet BTS SLAM - À venir",
            date: "2025",
            category: "app",
            description: "Projet de fin d'année de BTS SLAM. Application web complète avec frontend et backend.",
            technologies: ["À définir"],
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&auto=format",
            links: {
                live: "#",
                github: "#"
            }
        },
        
        {
            id: 7,
            title: "Stage 2ème année - Application",
            date: "Janvier 2026",
            category: "app",
            description: "Application développée lors de mon stage de 2ème année de BTS SLAM.",
            technologies: ["À compléter"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format",
            links: {
                live: "#",
                github: "#"
            }
        },


    ];

        const projectsGrid = document.querySelector('.projects-grid');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Rendre les projets
        const renderProjects = (filter = 'all') => {
            if (!projectsGrid) return;

            projectsGrid.innerHTML = '';
            
            const filteredProjects = filter === 'all' 
                ? projectsData 
                : projectsData.filter(project => project.category === filter);

            filteredProjects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card fade-in';
                projectCard.setAttribute('data-category', project.category);
                
                projectCard.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            <span class="project-date">${project.date}</span>
                        </div>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        <div class="project-links">
                            ${project.links.live !== '#' ? 
                                `<a href="${project.links.live}" class="project-link" target="_blank" rel="noopener">
                                    <i class="fas fa-external-link-alt"></i>
                                    Voir le projet
                                </a>` : ''
                            }
                            ${project.links.github !== '#' ? 
                                `<a href="${project.links.github}" class="project-link" target="_blank" rel="noopener">
                                    <i class="fab fa-github"></i>
                                    Code source
                                </a>` : ''
                            }
                        </div>
                    </div>
                `;

                projectsGrid.appendChild(projectCard);
            });

            // Re-observer les nouveaux éléments
            setTimeout(() => {
                document.querySelectorAll('.project-card').forEach(card => {
                    this.animateOnScroll(card);
                });
            }, 100);
        };

        // Filtrer les projets
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                button.classList.add('active');
                // Filtrer les projets
                const filter = button.getAttribute('data-filter');
                renderProjects(filter);
            });
        });

        // Initialiser les projets
        renderProjects();
    }

    // ===== FORMULAIRE =====
    setupForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Récupérer les données du formulaire
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };

                // Validation simple
                if (!this.validateForm(formData)) {
                    this.showNotification('Veuillez remplir tous les champs correctement.', 'error');
                    return;
                }

                // Désactiver le bouton
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                submitBtn.disabled = true;

                try {
                    // Simuler un envoi (remplacer par une vraie requête)
                    await this.simulateApiCall(formData);
                    
                    this.showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
                    contactForm.reset();
                } catch (error) {
                    this.showNotification('Erreur lors de l\'envoi du message. Veuillez réessayer.', 'error');
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    validateForm(data) {
        return (
            data.name.trim() !== '' &&
            data.email.trim() !== '' &&
            this.isValidEmail(data.email) &&
            data.subject.trim() !== '' &&
            data.message.trim() !== ''
        );
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Données envoyées:', data);
                resolve({ success: true });
            }, 1500);
        });
    }

    // ===== COMPTEURS =====
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // ===== BACK TO TOP =====
    setupBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ===== NOTIFICATIONS =====
    showNotification(message, type = 'info') {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Style de la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-left: 4px solid ${type === 'success' ? '#10b981' : '#ef4444'};
            border-radius: var(--radius-md);
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            max-width: 400px;
            box-shadow: var(--shadow-lg);
            transform: translateX(150%);
            transition: transform 0.3s ease-out;
            z-index: 10000;
        `;

        // Styles internes
        const contentStyle = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text-primary);
            flex: 1;
        `;

        const iconStyle = `
            color: ${type === 'success' ? '#10b981' : '#ef4444'};
            font-size: 1.25rem;
        `;

        const closeStyle = `
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: var(--radius-sm);
            transition: all 0.2s ease;
        `;

        notification.querySelector('.notification-content').style.cssText = contentStyle;
        notification.querySelector('.notification-content i').style.cssText = iconStyle;
        notification.querySelector('.notification-close').style.cssText = closeStyle;

        // Ajouter au DOM
        document.body.appendChild(notification);

        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Fermer la notification
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto-fermeture
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(150%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ===== UTILITAIRES =====
    animateOnScroll(element) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
// ===== VEILLE TECHNOLOGIQUE =====
setupVeille() {
    // Pas besoin de données dynamiques
    // Les articles sont déjà dans le HTML
    
    // Juste un peu d'interactivité pour l'édition
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
        // Permettre l'édition en double-cliquant
        article.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('article-title') || 
                e.target.classList.contains('article-excerpt') ||
                e.target.classList.contains('article-date') ||
                e.target.classList.contains('article-source')) {
                
                const oldText = e.target.textContent;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = oldText;
                input.className = 'edit-input';
                
                e.target.replaceWith(input);
                input.focus();
                
                input.addEventListener('blur', () => {
                    const newText = input.value || oldText;
                    const element = document.createElement(e.target.tagName.toLowerCase());
                    element.className = e.target.className;
                    element.textContent = newText;
                    input.replaceWith(element);
                });
                
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        input.blur();
                    }
                });
            }
        });
        
        // Mettre à jour les liens
        const links = article.querySelectorAll('.article-link');
        links.forEach(link => {
            link.addEventListener('dblclick', (e) => {
                e.preventDefault();
                const newUrl = prompt('Entrez le nouvel URL de l\'article:', link.href);
                if (newUrl) {
                    link.href = newUrl;
                    link.textContent = 'Lire l\'article';
                }
            });
        });
    });
    
    // Ajouter le style pour l'édition
    const editStyle = document.createElement('style');
    editStyle.textContent = `
        .edit-input {
            width: 100%;
            padding: 0.5rem;
            border: 2px solid var(--primary);
            border-radius: var(--radius-sm);
            background: var(--bg-primary);
            color: var(--text-primary);
            font-family: inherit;
            font-size: inherit;
        }
        
        .edit-input:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(var(--primary), 0.2);
        }
    `;
    document.head.appendChild(editStyle);
}
}

// ===== INITIALISATION =====
const portfolio = new Portfolio();

// Exposer pour le débogage
window.portfolio = portfolio;

// Ajouter les styles pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-close:hover {
        color: var(--text-primary);
        background-color: var(--bg-secondary);
    }
    
    @media (max-width: 640px) {
        .notification {
            max-width: calc(100% - 40px);
        }
    }
`;

document.head.appendChild(notificationStyles);
