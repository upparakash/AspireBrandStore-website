import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Products.css";
const BASE_URL = import.meta.env.VITE_BASE_URL; // ✅ from .env

function Products() {
    const { category } = useParams(); // Necklaces, Rings, etc.
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
              ` ${BASE_URL}/api/subcategories`
            );

            // 🔥 Filter based on URL category
            const filtered = res.data.filter(
                (item) =>
                    item.productCategory?.toLowerCase() === category.toLowerCase()
            );

            setProducts(filtered);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <h3>Loading products...</h3>;

    return (
        <div className="necklaces-page">
            <h2>
                Export Quality {category} — Direct from factory to you ✨
            </h2>

            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={{
                                id: item.id,
                                name: item.subCategaryname,
                                brand: item.brand,
                                price: item.price,
                                image: item.image_1,
                                description: item.description,
                                images: [
                                    item.image_1,
                                    item.image_2,
                                    item.image_3,
                                    item.image_4,
                                ],
                            }}
                        />

                    ))
                ) : (
                    <p>No products found for this category.</p>
                )}
            </div> 


        </div>
    );
}

export default Products;
