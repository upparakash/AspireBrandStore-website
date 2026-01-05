import React, { useState, useEffect } from 'react';
import './Component.css'

const Component = () => {
const sandeep = [
    { text: "Cash On Delivery (COD) Available ✨" },
    { text: "Online Service 🆙" },
    { text: "Made In INDIA⚡" }
  ];
const [current, setCurrent] = useState(0);
useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sandeep.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sandeep.length]);

  return (
    <div className='premium-banner '>
      <p>{sandeep[current].text}</p>
    </div>
  );
};

export default Component;