import React, { useState, useEffect } from 'react';
import VideoReels from './VideoReels';
import './Home.css';
import WhatsappButton from './WhatsappButton';
import PriceCategories from './PriceCategories';
import GenderCollections from './GenderCollections';
import Categories from './Categories';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const Home = () => {
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  console.log(import.meta.env.VITE_BASE_URL);


  // 🔹 Detect window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔹 Fetch banners from API
  useEffect(() => {
    fetch(`${BASE_URL}/api/banner/all`)
      .then(res => res.json())
      .then(data => {
        const websiteBanners = data
          .filter(item => item.platform === 'website')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const mobileBanners = data
          .filter(item => item.platform === 'mobile')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setDesktopImages(websiteBanners);
        setMobileImages(mobileBanners);
      })
      .catch(err => console.error('Banner API error:', err));
  }, []);

  // 🔹 Auto slide every 3 seconds
  useEffect(() => {
    const images = isMobile ? mobileImages : desktopImages;
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isMobile, desktopImages, mobileImages]);

  const activeImages = isMobile ? mobileImages : desktopImages;

  return (
    <>
      <div className="secondImage">
        {activeImages.length > 0 && (
          <img
            src={activeImages[current].bannerImage}
            alt={activeImages[current].title}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              transition: '0.6s ease-in-out',
            }}
          />
        )}
      </div>

      {/* <div className="marquee-container">
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="9"
          className="marquee-text"
        >
          Limited Stock Available ––– Order Now! &nbsp; ✨ Flat 80% Discount ✨
        </marquee>
      </div> */}

      {/* <div>
        <p className="text">✨ Factory Price Only ✨</p>
      </div> */}

      {/* Video Reels section */}
      <Categories />
      <GenderCollections />
      <PriceCategories />
      <WhatsappButton />
    </>
  );
};

export default Home;
