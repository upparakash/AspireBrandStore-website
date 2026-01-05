import React from "react";
import { useNavigate } from "react-router-dom";
import HIM from "../src/images/HIM.png";
import HER from "../src/images/HER.png";
import Anniversary from "../src/images/Anniversary.png";
import Couples from "../src/images/Couples.png";
import "./GenderCollections.css";

const GenderCollections = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 🔹 GIFTING GUIDE CONTENT */}
      <div className="gifting-content">
        <h1>Gifting  Ideas</h1>
        <p>
          With our carefully curated gifting Ideas, find the perfect gift for
          that perfect person. Thoughtful designs for every moment and every
          relationship.
        </p>
      </div>

      {/* 🔹 GENDER COLLECTIONS */}
      <div className="gender-section">
        {/* FOR HER */}
        <div className="gender-card">
          <div className="gender-text">
            <img
              src={HER}
              alt="For Her"
              className="gender-img"
              onClick={() => navigate("/collections/her")}
              style={{ cursor: "pointer" }}
            />
            <h2
              onClick={() => navigate("/collections/her")}
              style={{ cursor: "pointer" }}
            >
              HER
            </h2>
          </div>
        </div>

        {/* FOR HIM */}
        <div className="gender-card">
          <div className="gender-text">
            <img
              src={HIM}
              alt="For Him"
              className="gender-img"
              onClick={() => navigate("/collections/him")}
              style={{ cursor: "pointer" }}
            />
            <h2
              onClick={() => navigate("/collections/him")}
              style={{ cursor: "pointer" }}
            >
              HIM
            </h2>
          </div>
        </div>

        {/* FOR COUPLES */}
        <div className="gender-card">
          <div className="gender-text">
            <img
              src={Couples}
              alt="For Couples"
              className="gender-img"
              onClick={() => navigate("/collections/couples")}
              style={{ cursor: "pointer" }}
            />
            <h2
              onClick={() => navigate("/collections/couples")}
              style={{ cursor: "pointer" }}
            >
              COUPLES
            </h2>
          </div>
        </div>

        {/* ANNIVERSARY */}
        <div className="gender-card">
          <div className="gender-text">
            <img
              src={Anniversary}
              alt="Anniversary"
              className="gender-img"
              onClick={() => navigate("/collections/anniversary")}
              style={{ cursor: "pointer" }}
            />
            <h2
              onClick={() => navigate("/collections/anniversary")}
              style={{ cursor: "pointer" }}
            >
              ANNIVERSARY
            </h2>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default GenderCollections;

