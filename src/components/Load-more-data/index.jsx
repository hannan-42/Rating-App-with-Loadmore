import { useState, useEffect } from 'react';
import './styles.css';

export default function LoadMoreData() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.escuelajs.co/api/v1/products?offset=${count * 20}&limit=20`
            );
            const result = await response.json();

            if (result && result.length) {
                setProducts(prev => [...prev, ...result]);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [count]);

    if (loading && products.length === 0) {
        return <div className="loading-spinner">Loading...</div>;
    }

    return (
        <div className="product-container">
            <h1 className="page-title">HAULMART</h1>

            <div className="image-columns">
                {[0, 1, 2].map((col) => (
                    <div className="image-column" key={col}>
                        {products
                            .filter((_, index) => index % 3 === col)
                            .map((item, idx) => (
                                <div className="image-card" key={item.id}>
                                    <img
                                        src={item.images?.[0]}
                                        alt={item.title}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300';
                                            e.target.className = 'placeholder-image';
                                        }}
                                    />
                                    <div className="image-info">
                                        <h3>{item.title}</h3>
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>

            <button
                className='load-more-btn'
                onClick={() => setCount(prev => prev + 1)}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Load More Products'}
            </button>
        </div>
    );
}