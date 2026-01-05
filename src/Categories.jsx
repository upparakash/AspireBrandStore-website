import React from "react";
import Necklacecategories from '../src/images/Necklaces.webp';
import CoupleNecklaces from '../src/images/Couple necklaces.webp';
import Bracelets from '../src/images/Bracelets.jpg';
import Rings from '../src/images/Ringscategory.png';
import Earrings from '../src/images/Earringscategory.png';
import LetterPendant from '../src/images/Letter Pendents.jpg';
import "./Categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Necklaces", img: Necklacecategories, link: "/products/Necklaces"  },
  { name: "Couple Necklaces", img:CoupleNecklaces, link:"/products/Necklaces" },
  { name: "Bracelets", img:Bracelets, link: "/products/Bracelets"},
  { name: "Rings", img: Rings, link:"/products/Rings"},
  { name: "Earrings", img:Earrings, link: "/products/Earrings" },
  { name: "Letter Pendant", img: LetterPendant, },

];

const Categories = () => {

    const navigate = useNavigate();

  return (
    <section className="categories-section">
      {/* Heading */}
      <div className="categories-heading">
        <span className="line"></span>
        <h2>Shop by Categories</h2>
        <span className="line"></span>
      </div>

      {/* Categories */}
      <div className="categories-list">
        {categories.map((cat, index) => (
          <div className="category-item" onClick={()=> navigate(cat.link)} key={index}>
            <div className="category-img">
              <img src={cat.img} alt={cat.name} />
            </div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
