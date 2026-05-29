// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
// import { extractedData } from '../../data';

// import 'swiper/css';
// import 'swiper/css/pagination';

// const Testimonial = () => {
//     const { testimonial } = extractedData.Testimonial_Data;

//     return (
//         <section id="testimonial" className="section py-5 bg-light">
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-lg-8">
//                         <Swiper
//                             modules={[Pagination, Autoplay]}
//                             spaceBetween={40}
//                             slidesPerView={1}
//                             autoplay={{
//                                 delay: 4000,
//                                 disableOnInteraction: false,
//                             }}
//                             pagination={{ clickable: true }}
//                             className="testimonial-swiper pb-5 text-center"
//                         >
//                             {testimonial.map((item, index) => (
//                                 <SwiperSlide key={index}>
//                                     <div className="testimonial-box">
//                                         <div className="mb-4">
//                                             <img
//                                                 src={item.avatar.src}
//                                                 alt={item.name}
//                                                 className="rounded-circle shadow-sm"
//                                                 style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                                             />
//                                         </div>
//                                         <h3 className="fw-bold mb-1">{item.name}</h3>
//                                         <span className="text-uppercase text-secondary small d-block mb-4">{item.jobTitle}</span>
//                                         <p className="lead fst-italic text-muted">"{item.description}"</p>
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonial;
