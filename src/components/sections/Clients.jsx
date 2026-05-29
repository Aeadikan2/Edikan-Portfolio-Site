// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import { extractedData } from '../../data';

// import 'swiper/css';

// const Clients = () => {
//     const { clients } = extractedData.Clients_Data;

//     return (
//         <section id="clients" className="section py-5">
//             <div className="container">
//                 <Swiper
//                     modules={[Autoplay]}
//                     spaceBetween={30}
//                     slidesPerView={2}
//                     breakpoints={{
//                         576: { slidesPerView: 3 },
//                         768: { slidesPerView: 4 },
//                         992: { slidesPerView: 5 },
//                     }}
//                     autoplay={{
//                         delay: 2000,
//                         disableOnInteraction: false,
//                     }}
//                     loop={true}
//                     className="clients-swiper align-items-center"
//                 >
//                     {clients.map((client, index) => (
//                         <SwiperSlide key={index}>
//                             <div className="client-box text-center opacity-50 hover-opacity-100 transition-opacity">
//                                 <a href={client.url}>
//                                     <img
//                                         src={client.logo.src}
//                                         alt={`Client ${index + 1}`}
//                                         className="img-fluid"
//                                         style={{ maxHeight: '60px', filter: 'grayscale(100%)' }} // Optional grayscale
//                                     />
//                                 </a>
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//         </section>
//     );
// };

// export default Clients;
