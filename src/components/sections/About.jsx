import React from 'react';
import { extractedData } from '../../data';

const About = () => {
    const { mainData, skills, connect } = extractedData.About_Data;

    return (
        <section id="about" className="section pb-5 pt-0">
            <div className="container">
                <div className="row g-4 g-md-5 align-items-center">
                    <div className="col-lg-4 order-lg-2 text-center">
                        <div className="hero-avatar">
                            <img
                                src={mainData.heroAvatar.src}
                                alt="hero avatar"
                                className="img-fluid rounded-circle"
                                style={{ maxWidth: '300px' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 order-lg-1">
                        <div className="row g-4">
                            <div className="col-12">
                                <h6 className="text-uppercase text-white mb-3">Biography</h6>
                                <p className="lead">{mainData.biography}</p>
                            </div>
                            <div className="col-12">
                                <h6 className="text-uppercase text-white mb-3">Skills</h6>
                                <ul className="list-inline mb-0">
                                    {skills.map((skill, index) => (
                                        <li className="list-inline-item" key={index}>
                                            <span className="text-light opacity-75 fs-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                {skill.name}
                                                {index !== skills.length - 1 && <span className="mx-2 opacity-50">•</span>}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-12">
                                <h6 className="text-uppercase text-white mb-3">Connect</h6>
                                <div className="d-flex gap-2">
                                    {connect.map((link, index) => (
                                        <a href={link.url} key={index} className="btn btn-outline-light btn-sm rounded-circle p-2" aria-label="Social Link">
                                            <i className={link.bootstrapIcon}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 order-lg-3 text-lg-end">
                        <div className="row g-4">
                            <div className="col-4 col-lg-12">
                                <h6 className="text-uppercase text-white mb-1">Projects Done</h6>
                                <h1 className="display-4 fw-bold mb-0">{mainData.projectsDone}</h1>
                            </div>
                            <div className="col-4 col-lg-12">
                                <h6 className="text-uppercase text-white mb-1">Years of Exp.</h6>
                                <h1 className="display-4 fw-bold mb-0">{mainData.yearsOfExperience}+</h1>
                            </div>
                            {/* <div className="col-4 col-lg-12">
                                <h6 className="text-uppercase text-white mb-1">Happy Clients</h6>
                                <h1 className="display-4 fw-bold mb-0">{mainData.worldwideClients}</h1>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
