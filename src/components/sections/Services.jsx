// import React from 'react';
import { extractedData } from '../../data';

const Services = () => {
    const { services } = extractedData.Services_Data;

    return (
        <section id="services" className="section py-5">
            <div className="container">
                <div className="row g-4 g-lg-5">
                    {/* Left Side: Heading */}
                    <div className="col-lg-4 mb-4 mb-lg-0" style={{ top: '100px', height: 'fit-content', zIndex: 1 }}>
                        <span className="text-uppercase text-secondary d-block mb-3 ls-2 fw-bold small">Services</span>
                        <h2 className="display-4 fw-bold text-white mb-0">
                            What I <span className="text-gradient-purple">Do</span>
                        </h2>
                    </div>

                    {/* Right Side: Services List */}
                    <div className="col-lg-8">
                        <div className="d-flex flex-column gap-4">
                            {services.map((service, index) => (
                                <div key={index} className="service-card p-3 p-md-4 d-flex align-items-start gap-3">
                                    <div className="service-number text-gradient-purple opacity-50 fw-bold display-3 lh-1">
                                        {service.number}/
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="mb-3 text-gradient-purple display-6">
                                            <i className={service.bootstrapIcon}></i>
                                        </div>
                                        <h3 className="text-white fw-bold mb-3">{service.title}</h3>
                                        <p className="text-light opacity-75 mb-0 lead" style={{ fontSize: '1.1rem' }}>
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
