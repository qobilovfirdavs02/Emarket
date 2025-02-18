import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Adminni localStorage dan tekshiramiz
    const admin = localStorage.getItem("admin");
    
    if (!admin) {
      router.push("/admin/login"); // Admin tizimda bo'lmasa, login sahifasiga yuboramiz
      return;
    }

    // Mahsulotlarni olish
    fetch("http://localhost:8000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Xatolik:", error));

    // Kategoriyalarni olish
    fetch("http://localhost:8000/categories/")
      .then((res) => res.json())
      .then((data) => {
        const categoriesObj = data.reduce((acc, category) => {
          acc[category.id] = category.name; // Har bir kategoriya uchun id va nomni saqlaymiz
          return acc;
        }, {});
        setCategories(categoriesObj);
      })
      .catch((error) => console.error("Kategoriya yuklashda xatolik:", error));

  }, [router]);

  const handleDelete = async (id) => {
    if (!confirm("Mahsulotni o‘chirishni tasdiqlaysizmi?")) return;

    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <Container>
      <h1>📦 Mahsulotlar</h1>
      <Link href="/admin/add_product">
        <StyledButton>➕ Yangi mahsulot qo‘shish</StyledButton>
      </Link>
      <Link href="/admin/add_category">
        <StyledButton style={{ background: "skyblue", marginRight: "50px" }}>
          ➕ Yangi kategoriya qo‘shish
        </StyledButton>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>Mahsulot</th>
            <th>Narx</th>
            <th>Ombordagi miqdor</th>
            <th>Kategoriya</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{categories[product.category_id] || "No kategoriya"}</td>
              <td>
                <Link href={`/admin/edit_product?id=${product.id}`}>
                  <StyledButton>Edit</StyledButton>
                </Link>
                <StyledButton onClick={() => handleDelete(product.id)} style={{ background: "red" }}>
                  🗑 O‘chirish
                </StyledButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

// ✅ STYLED COMPONENTS
const Container = styled.div`
  padding: 20px;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;

  &:hover {
    background-color: #218838;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
`;
