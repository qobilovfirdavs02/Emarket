import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

// 📌 Styled Components yaratamiz
const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 80px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #0056b3;
  }
`;

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Kategoriyalarni olish
  useEffect(() => {
    fetch("http://localhost:8000/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Kategoriya olishda xatolik:", error));
  }, []);

  // Mahsulot ma'lumotlarini olish
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setStock(data.stock);
          setImageUrl(data.image_url);
          setCategory(data.category_id);
        })
        .catch((error) => console.error("Xatolik:", error));
    }
  }, [id]);

  // Yangilash funksiyasi
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image_url: imageUrl,
      category_id: parseInt(category),
    };

    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        router.push("/admin/product");
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <Container>
      <Title>✏️ Mahsulotni Tahrirlash</Title>
      <Form onSubmit={handleUpdate}>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextArea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <Input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        {/* Kategoriya tanlash */}
        <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">🔽 Kategoriya tanlang</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Button type="submit">✅ Yangilash</Button>
      </Form>
    </Container>
  );
}


// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";

// export default function EditProduct() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [category, setCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [imageFile, setImageFile] = useState(null);  // Yangi rasm fayli
//   const [error, setError] = useState("");

//   // Kategoriyalarni olish
//   useEffect(() => {
//     fetch("http://localhost:8000/categories/")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error("Kategoriya olishda xatolik:", error));
//   }, []);

//   // Mahsulot ma'lumotlarini olish
//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:8000/products/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setName(data.name);
//           setDescription(data.description);
//           setPrice(data.price);
//           setStock(data.stock);
//           setImageUrl(data.image_url);  // Mahsulot rasmini oldin ko'rsatish
//           setCategory(data.category_id);
//         })
//         .catch((error) => console.error("Xatolik:", error));
//     }
//   }, [id]);

//   // Mahsulotni yangilash
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     // FormData yaratamiz
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("stock", stock);
//     formData.append("category_id", category);

//     // Agar rasm yuklansa, uni ham FormData'ga qo'shamiz
//     if (imageFile) {
//       formData.append("image", imageFile);
//     }

//     try {
//       const response = await fetch(`http://localhost:8000/products/${id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (response.ok) {
//         router.push("/admin/product");
//       } else {
//         throw new Error("Mahsulotni yangilashda xatolik yuz berdi");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>✏️ Mahsulotni Tahrirlash</h1>
//       <form onSubmit={handleUpdate}>
//         <div>
//           <label htmlFor="name">Mahsulot nomi</label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="description">Tavsif</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="price">Narx</label>
//           <input
//             id="price"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="stock">Ombordagi miqdor</label>
//           <input
//             id="stock"
//             type="number"
//             value={stock}
//             onChange={(e) => setStock(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="image">Rasm (agar kerak bo'lsa)</label>
//           <input
//             id="image"
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files[0])}
//           />
//         </div>

//         <div>
//           <label htmlFor="category">Kategoriya</label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           >
//             <option value="">🔽 Kategoriya tanlang</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <button type="submit">✅ Yangilash</button>
//       </form>

//       <Link href="/admin/product">
//         <button style={{ marginTop: "10px" }}>Orqaga</button>
//       </Link>
//     </div>
//   );
// }
