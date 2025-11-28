import React from 'react';
import Header from './Header';
import LibraryFeatures from './LibraryFeatures';
import image1 from '../assets/library-shelf1.jpg';
import image2 from '../assets/library-shelf2.jpeg';
import image3 from '../assets/library-shelf3.avif';
import book1 from  '../assets/Don Quixote.jpeg';
import book2 from  '../assets/Alice2.jpeg';
import book3 from  '../assets/The Adventures.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import GetStarted from './GetStarted';
import BookCarousel from './BookCarousel';
import LibraryDashboard from './LibraryDashboard'


const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
       <Header />

       
      <div className="relative mt-2">
      <Swiper
  spaceBetween={20}
  slidesPerView={3}
  loop={true}
  autoplay={{ delay: 1000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  navigation={true}
  className="w-full h-80 md:h-[400px]"
>
  <SwiperSlide>
    <img
      src={image1}
      alt="Library Shelf 1"
      className="w-full h-full  rounded-lg p-2"
    />
  </SwiperSlide>
  <SwiperSlide>
    <img
      src={image2}
      alt="Library Shelf 2"
      className="w-full h-full  rounded-lg p-2"
    />
  </SwiperSlide>
  <SwiperSlide>
    <img
      src={image3}
      alt="Library Shelf 3"
      className="w-full h-full rounded-lg mx-2"
    />
  </SwiperSlide>
</Swiper>

      </div>

      
      <BookCarousel/>
       {/* <LibraryDashboard /> */}
      <LibraryFeatures />
      <GetStarted />
    </div>
  );
};

export default Home;
