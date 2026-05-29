// import React from 'react';
// import { extractedData } from '../../data';

// const Awards = () => {
//     const { awards } = extractedData.Awards_Data;

//     return (
//         <section id="awards" className="section awards-section py-5">
//             <div className="container">
//                 <div className="row g-5">
//                     {/* Left Side: Label & Heading */}
//                     <div className="col-lg-4 lg-top" style={{ top: '100px', alignSelf: 'start', zIndex: 1 }}>
//                         <span className="section-label text-uppercase">ACHIEVEMENTS</span>
//                         <h2 className="awards-heading">
//                             <span className="text-gradient-purple-subtle">Awards</span>
//                         </h2>
//                         <p className="text-muted d-none d-lg-block mt-3" style={{ maxWidth: '300px' }}>
//                             Recognized for deliver excellence, innovation, and impactful results in every project.
//                         </p>
//                     </div>

//                     {/* Right Side: Grid of Cards */}
//                     <div className="col-lg-8">
//                         <div className="row g-4">
//                             {awards.map((award, index) => (
//                                 <div className="col-md-6" key={index}>
//                                     <div className="award-card d-flex flex-column h-100">
//                                         <h4 className="card-title">{award.title}</h4>
//                                         <span className="award-year">{award.date}</span>
//                                         <p className="card-text mb-0">{award.description}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Awards;
