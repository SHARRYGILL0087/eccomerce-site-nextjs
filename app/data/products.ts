
interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string;
  stock: number;
  isCart: boolean;
  isWishList: boolean;
}

const productsList = (): ProductData[] => {
  return [
    {
      _id: "1",
      name: "EvoFox Katana S Mini Wireless Mechanical Keyboard | Tri-Mode (3X BT, 2.4GHz & Wired) Connectivity | Hot-Swappable Red Switches | 68-Key Compact Layout | Rainbow Backlight | Rechargeable Battery",
      description: "Noise-cancelling over-ear headphones with 40 hours battery life.",
      price: 2999,
      category: "Electronics",
      brand: "SoundMax",
      images: "https://m.media-amazon.com/images/I/61bFfzSUVSL._SX522_.jpg",
      stock: 15,
      isCart: false,
      isWishList: false
    },
    {
      _id: "2",
      name: "Men's Casual Sneakers",
      description: "Comfortable and stylish sneakers for everyday wear.",
      price: 1499,
      category: "Fashion",
      brand: "UrbanWalk",
      images: "https://picsum.photos/seed/picsum/200/300",
      stock: 25,
      isCart: false,
      isWishList: false
    },
    {
      _id: "3",
      name: "Smart Fitness Watch",
      description: "Track your workouts, heart rate, and sleep with a sleek design.",
      price: 4999,
      category: "Electronics",
      brand: "FitPro",
      images: "https://picsum.photos/seed/picsum/200/300",
      stock: 10,
      isCart: false,
      isWishList: false
    },
    {
      _id: "4",
      name: "Ergonomic Office Chair",
      description: "Adjustable chair with lumbar support for long working hours.",
      price: 7999,
      category: "Furniture",
      brand: "WorkEase",
      images: "https://picsum.photos/seed/picsum/200/300",
      stock: 8,
      isCart: false,
      isWishList: false
    },
    {
      _id: "5",
      name: "Ceramic Dinner Set - 16 Pieces",
      description: "Elegant dinnerware set perfect for family meals and guests.",
      price: 2599,
      category: "Home & Kitchen",
      brand: "ServeWell",
      images: "https://picsum.photos/seed/picsum/200/300",
      stock: 20,
      isCart: false,
      isWishList: false
    },
    {
      _id: "6",
      name: "Women's Striped Sleeveless Romper",
      description: "Casual sleeveless romper featuring multicolor vertical stripes, drawstring waist, and a relaxed fit. Perfect for summer outings and vacations.",
      price: 39.99,
      category: "Women's Clothing",
      brand: "TrendyWear",
      images: "/women-cloths/17.png",
      stock: 120,
      isCart: false,
      isWishList: false
    }
  ];
};

export default productsList;
