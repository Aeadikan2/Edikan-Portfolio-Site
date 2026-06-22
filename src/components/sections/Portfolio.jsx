import React, { useRef, useState, useEffect } from 'react';
import { extractedData } from '../../data';

const Portfolio = () => {
    const { mainData, projects } = extractedData.Portfolio_Data;
    const carouselRef = useRef(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartScroll = useRef(0);
    const rafRef = useRef(null);
    const pausedRef = useRef(false);
    const directionRef = useRef(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);

    const scrollByAmount = (mult = 1) => {
        const el = carouselRef.current;
        if (!el) return 0;
        // use a portion of the container to create consistent scroll step
        const amount = Math.round(el.clientWidth * 0.62 * mult);
        return amount;
    };

    const scrollNext = () => {
        const el = carouselRef.current;
        if (!el) return;
        const amount = scrollByAmount(1);
        el.scrollBy({ left: amount, behavior: 'smooth' });
    };

    const scrollPrev = () => {
        const el = carouselRef.current;
        if (!el) return;
        const amount = scrollByAmount(1);
        el.scrollBy({ left: -amount, behavior: 'smooth' });
    };

    const snapToClosest = () => {
        const container = carouselRef.current;
        if (!container) return;
        const cards = Array.from(container.querySelectorAll('.peek-card'));
        if (!cards.length) return;
        let closest = cards[0];
        let minDiff = Infinity;
        cards.forEach((card) => {
            const diff = Math.abs(container.scrollLeft - card.offsetLeft);
            if (diff < minDiff) { minDiff = diff; closest = card; }
        });
        const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
        container.scrollTo({ left: Math.max(0, closest.offsetLeft - paddingLeft), behavior: 'smooth' });
    };


    // Continuous auto-scroll using requestAnimationFrame; wraps cleanly by resetting position at the edges
    useEffect(() => {
        let rafId = 0;
        let last = 0;
        const speed = 85; // pixels per second, adjust for desired pace

        const step = (now) => {
            if (!last) last = now;
            const dt = (now - last) / 1000;
            last = now;
            const el = carouselRef.current;
            if (el && !pausedRef.current && !isDragging.current && !selectedProject) {
                const maxScroll = el.scrollWidth - el.clientWidth;
                el.scrollLeft += speed * dt * directionRef.current;

                if (directionRef.current > 0 && el.scrollLeft >= maxScroll) {
                    el.scrollLeft = 0;
                }
                if (directionRef.current < 0 && el.scrollLeft <= 0) {
                    el.scrollLeft = maxScroll;
                }
            }
            rafId = requestAnimationFrame(step);
        };

        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [selectedProject]);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        el.scrollLeft = 0;
    }, []);

    // Reverse scroll direction on hover, pause during drag/tap
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        const onEnter = () => { directionRef.current = -1; };
        const onLeave = () => { directionRef.current = 1; };
        const onPointerDown = () => { pausedRef.current = true; };
        const onPointerUp = () => { pausedRef.current = false; };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('pointerup', onPointerUp);

        return () => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
            el.removeEventListener('pointerdown', onPointerDown);
            el.removeEventListener('pointerup', onPointerUp);
        };
    }, []);

    return (
        <section id="portfolio" className="section py-5">
            <div className="container">
                <div className="portfolio-bg-container rounded-5 p-4 p-md-5">
                    <div className="row mb-5">
                        <div className="col-lg-8 mx-auto text-center">
                            <span className="text-uppercase text-secondary d-block mb-3 ls-2 fw-bold small">{mainData.label}</span>
                            <h2 className="display-4 fw-bold mb-3 text-white">
                                {mainData.title} <span className="text-gradient-purple">{mainData.title2}</span>
                            </h2>
                            <p className="lead text-light opacity-75 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                                {mainData.description}
                            </p>

                            <div className="d-flex justify-content-center gap-3">
                                <button onClick={() => scrollPrev()} className="btn btn-outline-light rounded-circle p-3 lh-1 portfolio-nav-btn" aria-label="Previous">
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <button onClick={() => scrollNext()} className="btn btn-outline-light rounded-circle p-3 lh-1 portfolio-nav-btn" aria-label="Next">
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-12">
                            <div
                                className="peek-carousel pb-4 px-2"
                                ref={carouselRef}
                                onPointerDown={(e) => {
                                    isDragging.current = true;
                                    try { carouselRef.current.setPointerCapture(e.pointerId); } catch (err) {}
                                    dragStartX.current = e.pageX - carouselRef.current.offsetLeft;
                                    dragStartScroll.current = carouselRef.current.scrollLeft;
                                }}
                                onPointerMove={(e) => {
                                    if (!isDragging.current) return;
                                    e.preventDefault();
                                    const x = e.pageX - carouselRef.current.offsetLeft;
                                    const walk = (x - dragStartX.current) * 1;
                                    carouselRef.current.scrollLeft = dragStartScroll.current - walk;
                                }}
                                onPointerUp={(e) => {
                                    isDragging.current = false;
                                    try { carouselRef.current.releasePointerCapture(e.pointerId); } catch (err) {}
                                    // snap into place after drag ends
                                    setTimeout(() => snapToClosest(), 70);
                                }}
                                onPointerCancel={() => { isDragging.current = false; snapToClosest(); }}
                                onScroll={() => {
                                    if (rafRef.current) cancelAnimationFrame(rafRef.current);
                                    rafRef.current = requestAnimationFrame(() => {
                                        const container = carouselRef.current;
                                        if (!container) return;
                                        const center = container.scrollLeft + container.clientWidth / 2;
                                        const cards = Array.from(container.querySelectorAll('.peek-card'));
                                        let closest = 0;
                                        let minDiff = Infinity;
                                        cards.forEach((card, idx) => {
                                            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                                            const diff = Math.abs(center - cardCenter);
                                            if (diff < minDiff) { minDiff = diff; closest = idx; }
                                        });
                                        setActiveIndex(closest % projects.length);
                                    });
                                }}
                            >
                                {projects.map((project, index) => {
                                    return (
                                    <div className={`peek-card ${activeIndex === index ? 'active' : ''} rounded-4`} key={`peek-${index}`}>
                                        <div className="portfolio-card position-relative overflow-hidden h-100 group">
                                            <div className="portfolio-img-wrapper position-relative overflow-hidden rounded-4" style={{ height: '360px' }}>
                                                <div className="w-100 h-100 position-absolute top-0 start-0" style={{ background: project.gradient, opacity: 0.9 }}></div>
                                                {project.website ? (
                                                    <a href={project.website} target="_blank" rel="noopener noreferrer" className="d-block w-100 h-100 position-relative text-decoration-none">
                                                        <img
                                                            src={project.mainImage.src}
                                                            alt={project.title}
                                                            className="w-100 h-100 position-relative peek-card-media"
                                                            style={{ objectFit: project.mainImage.objectFit || 'cover' }}
                                                        />

                                                        <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                                            <span className="text-uppercase text-light opacity-75 d-block mb-2 ls-1 small fw-bold">{project.category}</span>
                                                            <h3 className="card-title fw-bold text-white mb-0 h5">{project.title}</h3>
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <>
                                                        <img src={project.mainImage.src} alt={project.title} className="w-100 h-100 position-relative peek-card-media" style={{ objectFit: project.mainImage.objectFit || 'cover' }} />
                                                        <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                                            <span className="text-uppercase text-light opacity-75 d-block mb-2 ls-1 small fw-bold">{project.category}</span>
                                                            <h3 className="card-title fw-bold text-white mb-0 h5"><a href="#" className="text-decoration-none text-white stretched-link">{project.title}</a></h3>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-center mt-3">
                                                <button type="button" onClick={() => setSelectedProject((current) => current?.title === project.title ? null : project)} className="btn glass-btn btn-sm view-details-btn text-uppercase fw-semibold" aria-expanded={selectedProject?.title === project.title}>{project.detailsButton || 'View Details'}</button>
                                            </div>
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedProject && (
                <div className="portfolio-modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="portfolio-modal glass-card p-4 rounded-4" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={() => setSelectedProject(null)}
                            aria-label="Close details"
                        >
                            &times;
                        </button>
                        <span className="text-uppercase text-secondary small fw-bold d-block mb-2">
                            {selectedProject.category}
                        </span>
                        <h3 className="text-white mb-3">{selectedProject.title}</h3>
                        <p className="text-light opacity-75 mb-4">
                            {selectedProject.details || selectedProject.slug || 'No details available.'}
                        </p>
                        {selectedProject.website && (
                            <a
                                href={selectedProject.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn glass-btn btn-sm text-uppercase fw-semibold"
                            >
                                Visit Website
                            </a>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
