import React from 'react';
import { extractedData } from '../../data';

const Hero = () => {
    const { name } = extractedData.Hero_Data.mainData;

    return (
        <section id="hero" className="hero-section d-flex align-items-center justify-content-center" style={{ minHeight: '50vh', paddingBottom: '0' }}>
            <div className="container text-center">
                <div className="row">
                    <div className="col-12">
                        <h1 className="display-1 fw-bold mb-0 text-uppercase" style={{ letterSpacing: '2px', color: 'transparent', WebkitTextStroke: '1px #fff' }}>
                            {name}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
