import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Scroll handler for potential future use
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        // { name: 'Awards', href: '#awards' },
        // { name: 'Testimonial', href: '#testimonial' },
        // { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className={`navbar fixed-top bg-transparent`}>
            <div className="container">
                <a className="navbar-brand fw-bold fs-3 text-light" href="/">Eddy</a>

                <div className="d-flex align-items-center order-lg-3 ms-lg-3 position-relative">
                    <a href="#contact" className="btn btn-hover-scale rounded-pill px-5 py-3 d-none d-lg-inline-block me-3 text-light border-0 fw-bolder" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.1)', fontSize: '16px' }}>
                        Let's Talk <span className="ms-2">🔹</span>
                    </a>
                    <button
                        className="navbar-toggler ms-2 text-uppercase fw-bolder border-0 rounded-pill px-5 py-3 btn-hover-scale"
                        type="button"
                        onClick={toggleNav}
                        aria-controls="navbarNav"
                        aria-expanded={isNavOpen}
                        aria-label="Toggle navigation"
                        style={{ fontSize: '16px', letterSpacing: '1px', color: '#000', backgroundColor: '#fff' }}
                    >
                        MENU <span className="ms-2">🔹</span>
                    </button>

                    <div className={`collapse navbar-collapse position-absolute end-0 top-100 mt-3 p-4 rounded-4 shadow-lg ${isNavOpen ? 'show' : ''}`} id="navbarNav"
                        style={{
                            background: '',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            minWidth: '250px',
                            zIndex: 1050
                        }}>
                        <ul className="navbar-nav ms-auto text-start">
                            {navLinks.map((link, index) => (
                                <li className="nav-item mb-2" key={index}>
                                    <a className="nav-link text-white fw-bold fs-5 menu-link-item" href={link.href} onClick={() => setIsNavOpen(false)}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
