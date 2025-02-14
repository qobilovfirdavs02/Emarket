export default function ProductCard({ product }) {
    const handleAddToCart = async () => {
      await fetch("http://localhost:8000/cart/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });
      alert("Mahsulot savatchaga qo‘shildi!");
    };
  
    return (
      <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p><b>${product.price}</b></p>
        <button onClick={handleAddToCart}>🛒 Savatchaga qo‘shish</button>
      </div>
    );
  }
  