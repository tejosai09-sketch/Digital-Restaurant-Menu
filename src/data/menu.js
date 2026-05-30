import FoodCard from "./FoodCard";

const menuItems = [
  {
    id: 1,
    category: "Noodles",
    name: "Veg Noodles",
    price: 69,
    image: "image-url"
  },
  {
    id: 2,
    category: "Noodles",
    name: "Veg Manchurian Noodles",
    price: 79,
    image: "image-url"
  },
  {
    id: 3,
    category: "Noodles",
    name: "Veg Schezwan Noodles",
    price: 79,
    image: "image-url"
  },
  {
    id: 4,
    category: "Noodles",
    name: "Paneer Noodles",
    price: 89,
    image: "image-url"
  },
  {
    id: 5,
    category: "Noodles",
    name: "Egg Noodles",
    price: 79,
    image: "image-url"
  },
  {
    id: 6,
    category: "Noodles",
    name: "Chicken Noodles",
    price: 89,
    image: "image-url"
  },
  {
    id: 7,
    category: "Noodles",
    name: "Chicken Schezwan Noodles",
    price: 110,
    image: "image-url"
  },
  {
    id: 8,
    category: "Noodles",
    name: "Double egg  Double chicken noodles",
    price: 120,
    image: "image-url"
  },

  {
    id: 9,
    category: "Fried Rice",
    name: "Veg Fried Rice",
    price: 69,
    image: "image-url"
  },
  {
    id: 10,
    category: "Fried Rice",
    name: "Jeera Rice",
    price: 69,
    image: "image-url"
  },
  {
    id: 11,
    category: "Fried Rice",
    name: "Kaju Rice",
    price: 99,
    image: "image-url"
  },
  {
    id: 12,
    category: "Fried Rice",
    name: "Veg Schezwan Rice",
    price: 89,
    image: "image-url"
  },
  {
    id: 13,
    category: "Fried Rice",
    name: "Veg Manchurian Rice",
    price: 79,
    image: "image-url"
  },
  {
    id: 14,
    category: "Fried Rice",
    name: "Paneer Fried Rice",
    price: 99,
    image: "image-url"
  },
  {
    id: 15,
    category: "Fried Rice",
    name: "Egg Rice",
    price: 79,
    image: "image-url"
  },
  {
    id: 16,
    category: "Fried Rice",
    name: "Double Egg",
    price: 89,
    image: "image-url"
  },
  {
    id: 17,
    category: "Fried Rice",
    name: "Chicken  Rice",
    price: 89,
    image: "image-url"
  },
  {
    id: 18,
    category: "Fried Rice",
    name: "Double Egg Chicken Rice",
    price: 109,
    image: "image-url"
  },
  {
    id: 19,
    category: "Fried Rice",
    name: "Chicken Schezwan Rice",
    price: 99,
    image: "image-url"
  },
  {
    id: 20,
    category: "Fried Rice",
    name: "Double Egg Double Chicken Rice",
    price: 120,
    image: "image-url"
  },

  {
    id: 21,
    category: "Biryanis",
    name: "Chicken Dum Biryani",
    price: 120,
    image: "image-url"
  },
  {
    id: 22,
    category: "Biryanis",
    name: "Fry Piece Biryani",
    price: 140,
    image: "image-url"
  },
  {
    id: 23,
    category: "Biryanis",
    name: "Chicken 65 Biryani",
    price: 150,
    image: "image-url"
  },
  {
    id: 24,
    category: "Biryanis",
    name: "Chicken lolipop Biryani",
    price: 160,
    image: "image-url"
  },
  {
    id: 25,
    category: "Biryanis",
    name: "Family pack",
    price: 499,
    image: "image-url"
  },

  {
    id: 26,
    category: "Starters",
    name: "Veg Manchurian",
    price: 69,
    image: "image-url"
  },
  {
    id: 27,
    category: "Starters",
    name: "Veg 65 Manchurian",
    price: 79,
    image: "image-url"
  },
  {
    id: 28,
    category: "Starters",
    name: "Veg chilli garlic Manchurian",
    price: 89,
    image: "image-url"
  },
  {
    id: 29,
    category: "Starters",
    name: "paneer Manchurian",
    price: 99,
    image: "image-url"
  },
  {
    id: 30,
    category: "Starters",
    name: "paneer 65",
    price: 110,
    image: "image-url"
  },
  {
    id: 31,
    category: "Starters",
    name: "Chilli paneer ",
    price: 99,
    image: "image-url"
  },
  {
    id: 32,
    category: "Starters",
    name: "Paneer Majestic",
    price: 119,
    image: "image-url"
  },
  {
    id: 33,
    category: "Starters",
    name: "Egg Omlet",
    price: 20,
    image: "image-url"
  },
  {
    id: 34,
    category: "Starters",
    name: "Bolied Egg ",
    price: 15,
    image: "image-url"
  },
  {
    id: 35,
    category: "Starters",
    name: "Bolied Egg Fry ",
    price: 40,
    image: "image-url"
  },
  {
    id: 36,
    category: "Starters",
    name: "Egg Bhurji ",
    price: 49,
    image: "image-url"
  },
  {
    id: 37,
    category: "Starters",
    name: "Chicken manchuria",
    price: 119,
    image: "image-url"
  },
  {
    id: 38,
    category: "Starters",
    name: "Chicken 65",
    price: 119,
    image: "image-url"
  },
  {
    id: 39,
    category: "Starters",
    name: "Chilli garlic Chicken ",
    price: 129,
    image: "image-url"
  },
  {
    id: 40,
    category: "Starters",
    name: "Chilli Chicken ",
    price: 129,
    image: "image-url"
  },
  {
    id: 41,
    category: "Starters",
    name: "Chicken lollipop ",
    price: 139,
    image: "image-url"
  },
  {
    id: 42,
    category: "Starters",
    name: "Chicken Majestic ",
    price: 149,
    image: "image-url"
  },
  {
    id: 43,
    category: "Starters",
    name: "Sagwan chicken ",
    price: 129,
    image: "image-url"
  }
];

export default menuItems;