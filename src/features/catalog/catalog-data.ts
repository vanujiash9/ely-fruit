export interface Product {
  code: string
  name: string
  price: string
  range: string
  image: string
  ingredients: string[]
  description: string
}

export const filters = ["Tất cả", "499K", "599K", "699K", "799K", "899K", "999K", "1.2M+"]

import productData from "./products.json"

export const products: Product[] = productData as Product[]

/* Legacy inline catalog retained below for reference during migration.
export const legacyProducts: Product[] = [
  {
    code: "EF-01",
    name: "Giỏ An Nhiên",
    price: "499.000đ",
    range: "499K",
    image: "https://images.unsplash.com/photo-1604398387669-2145e5ec8ad4?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Envy", "Nho xanh", "Cam Úc", "Lê Hàn Quốc", "Kiwi vàng"],
    description: "Tuyển chọn thanh vị, phù hợp làm quà thăm hỏi và tri ân.",
  },
  {
    code: "EF-02",
    name: "Giỏ Thanh Vân",
    price: "499.000đ",
    range: "499K",
    image: "https://images.unsplash.com/photo-1629905831323-c4d3a174d3fd?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Gala", "Nho đỏ", "Cam vàng", "Kiwi xanh", "Lê Nam Phi"],
  },
  {
    code: "EF-03",
    name: "Hộp Bình Minh",
    price: "499.000đ",
    range: "499K",
    image: "https://images.unsplash.com/photo-1573345233040-ab5e890bf231?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo đỏ Mỹ", "Quýt Úc", "Nho xanh", "Lê Hàn Quốc"],
  },
  {
    code: "EF-04",
    name: "Giỏ Phúc Lộc",
    price: "599.000đ",
    range: "599K",
    image: "https://images.unsplash.com/photo-1615053975722-4a14cf2538d6?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Envy", "Nho mẫu đơn", "Cam Úc", "Kiwi vàng", "Cherry đỏ"],
  },
  {
    code: "EF-05",
    name: "Hộp Lam Ngọc",
    price: "599.000đ",
    range: "599K",
    image: "https://images.unsplash.com/photo-1649928245542-f50d08b81266?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo xanh", "Lê Hàn Quốc", "Nho xanh", "Cam vàng", "Việt quất"],
  },
  {
    code: "EF-06",
    name: "Giỏ Tâm Giao",
    price: "599.000đ",
    range: "599K",
    image: "https://images.unsplash.com/photo-1576221506205-a1b45deb55a9?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Gala", "Nho đỏ", "Lê Nam Phi", "Kiwi xanh", "Cam Úc"],
  },
  {
    code: "EF-07",
    name: "Giỏ Như Ý",
    price: "699.000đ",
    range: "699K",
    image: "https://images.unsplash.com/photo-1635364387109-241cb2352393?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Envy", "Nho mẫu đơn", "Cherry", "Lê Hàn Quốc", "Kiwi vàng", "Cam Úc"],
  },
  {
    code: "EF-08",
    name: "Giỏ Mộc Lan",
    price: "699.000đ",
    range: "699K",
    image: "https://images.unsplash.com/photo-1790107064096-a1beb5e5fa47?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo xanh", "Nho xanh", "Lê Hàn Quốc", "Hoa tươi", "Kiwi vàng"],
  },
  {
    code: "EF-09",
    name: "Hộp Cát Tường",
    price: "699.000đ",
    range: "699K",
    image: "https://images.unsplash.com/photo-1649928275282-66a310586aa8?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Envy", "Cherry đỏ", "Cam Cara", "Nho đen", "Việt quất"],
  },
  {
    code: "EF-10",
    name: "Giỏ Hoàng Gia",
    price: "899.000đ",
    range: "899K",
    image: "https://images.unsplash.com/photo-1634617149911-82298c5b06f3?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Envy", "Nho mẫu đơn", "Cherry New Zealand", "Lê Hàn Quốc", "Kiwi vàng", "Hoa tươi"],
  },
  {
    code: "EF-11",
    name: "Giỏ Nguyệt Quế",
    price: "899.000đ",
    range: "899K",
    image: "https://images.unsplash.com/photo-1643863327941-1938d784997c?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Rockit", "Nho xanh", "Cam Úc", "Lê Hàn Quốc", "Dâu tây", "Hoa tươi"],
  },
  {
    code: "EF-12",
    name: "Hộp Kim Cương",
    price: "899.000đ",
    range: "899K",
    image: "https://images.unsplash.com/photo-1629905749096-4a5ae4b6aa59?auto=format&fit=crop&w=900&q=85",
    ingredients: ["Táo Envy", "Nho mẫu đơn", "Cherry", "Việt quất", "Kiwi vàng", "Lê Hàn Quốc"],
  },
]
*/
