import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Positions for the main cursor and the follower
    const cursorPos = useRef({ x: 0, y: 0 });
    const followerPos = useRef({ x: 0, y: 0 });

    // Mouse position target
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => {
            if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
            if (followerRef.current) followerRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
        };

        const handleMouseUp = () => {
            if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
            if (followerRef.current) followerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Hover effect for links and buttons
        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        // Add event listeners to all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .hover-lift');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleLinkHover);
            el.addEventListener('mouseleave', handleLinkLeave);
        });

        // Setup MutationObserver to attach listeners to new elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            const elements = node.querySelectorAll ? node.querySelectorAll('a, button, input, textarea, select, .hover-lift') : [];
                            if (node.matches && node.matches('a, button, input, textarea, select')) {
                                node.addEventListener('mouseenter', handleLinkHover);
                                node.addEventListener('mouseleave', handleLinkLeave);
                            }
                            elements.forEach(el => {
                                el.addEventListener('mouseenter', handleLinkHover);
                                el.addEventListener('mouseleave', handleLinkLeave);
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Animation loop
        let animationFrameId;

        const animate = () => {
            // Easing for follower
            const dx = mousePos.current.x - followerPos.current.x;
            const dy = mousePos.current.y - followerPos.current.y;

            followerPos.current.x += dx * 0.15; // Smooth lag
            followerPos.current.y += dy * 0.15;

            // Direct mapping for main cursor
            cursorPos.current.x = mousePos.current.x;
            cursorPos.current.y = mousePos.current.y;

            if (cursorRef.current) {
                cursorRef.current.style.left = `${cursorPos.current.x}px`;
                cursorRef.current.style.top = `${cursorPos.current.y}px`;
            }

            if (followerRef.current) {
                followerRef.current.style.left = `${followerPos.current.x}px`;
                followerRef.current.style.top = `${followerPos.current.y}px`;
            }

            // Expanding effect on hover
            if (isHovering && followerRef.current) {
                followerRef.current.classList.add('is-hovering');
            } else if (followerRef.current) {
                followerRef.current.classList.remove('is-hovering');
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);

            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleLinkHover);
                el.removeEventListener('mouseleave', handleLinkLeave);
            });
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovering]); // Re-run if hovering state dependency needed, though refs handles most

    if (!isVisible) return null;

    return (
        <>
            <div ref={cursorRef} className="custom-cursor-dot" />
            <div ref={followerRef} className="custom-cursor-follower" />
        </>
    );
};

export default CustomCursor;
