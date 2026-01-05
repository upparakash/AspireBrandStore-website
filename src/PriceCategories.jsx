import { Link } from "react-router-dom";
import Under1 from './images/Under1.jpg';
import Under2 from './images/Under2.jpg';
import Under3 from './images/Under3.jpg';
import Under4 from './images/Under4.jpeg';
import "./PriceCategories.css";

const categories = [
  {
    id: 1,
    title: "Under 300",
    image: Under1,
    link: "/collections/under-399",
  },
  {
    id: 2,
    title: "Under 500 ",
    image: Under2,
    link: "/collections/under-500",
  },
  {
    id: 3,
    title: "Under 800",
    image: Under3,
    link: "/collections/under-800",
  },
  {
    id: 4,
    title: "Under 1299",
    image: Under4,
    link: "/collections/under-1299",
  },
];


const PriceCategories = () => {
  return (
    <section className="price-section">
      <div className="price-grid">
        {categories.map((item) => (
          <Link to={item.link} key={item.id} className="price-card">
            <img src={item.image} alt={item.title} />
            <div className="price-content">
              <h3>{item.title}</h3>
              Shop Now
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PriceCategories;