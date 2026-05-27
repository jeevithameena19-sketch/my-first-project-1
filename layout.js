document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // ─── Navbar ───
    const navbarHTML = `
        <nav class="navbar" id="navbar">
            <div class="container nav-container">
                <a href="index.html" class="logo text-gradient">Jeevitha K S.</a>
                <ul class="nav-links" id="nav-links">
                    <li><a href="index.html"         class="${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">Home</a></li>
                    <li><a href="about.html"          class="${currentPath === 'about.html'         ? 'active' : ''}">About</a></li>
                    <li><a href="projects.html"       class="${currentPath === 'projects.html'      ? 'active' : ''}">Projects</a></li>
                    <li><a href="education.html"      class="${currentPath === 'education.html'     ? 'active' : ''}">Education</a></li>
                    <li><a href="certifications.html" class="${currentPath === 'certifications.html'? 'active' : ''}">Certifications</a></li>
                    <li><a href="contact.html"        class="${currentPath === 'contact.html'       ? 'active' : ''}">Contact</a></li>
                </ul>
                <div class="menu-toggle" id="mobile-menu">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </nav>
    `;

    // ─── Footer ───
    const footerHTML = `
        <footer>
            <div class="container">
                <p>© ${new Date().getFullYear()} <span>Jeevitha K S</span>. Crafted with ♥</p>
            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // ─── Mobile Menu Toggle ───
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks   = document.getElementById('nav-links');

    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('nav-open');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            menuToggle?.classList.remove('active');
        });
    });

    // ─── Scroll Reveal (Intersection Observer) ───
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => observer.observe(el));
    }

    // ─── Navbar scroll effect ───
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // ─── Global Modal helpers ───
    window.openModal = function(modalId) {
        document.getElementById(modalId)?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    window.closeModal = function(modalId) {
        document.getElementById(modalId)?.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) closeModal(this.id);
        });
    });

    // Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
        }
    });
});
