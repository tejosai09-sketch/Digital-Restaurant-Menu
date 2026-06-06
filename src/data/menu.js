
const menuItems = [
  {
    id: 1,
    category: "Noodles",
    name: "Veg Noodles",
    price: 69,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780128895/images_jnaitb.jpg"

  },
  {
    id: 2,
    category: "Noodles",
    name: "Veg Manchurian Noodles",
    price: 79,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780128996/SKU-3277_0-1755078182348_dfor2v.webp"
  },
  {
    id: 3,
    category: "Noodles",
    name: "Veg Schezwan Noodles",
    price: 79,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780129149/Schezwan-Noodles-1_ljsznw.jpg"
  },
  {
    id: 4,
    category: "Noodles",
    name: "Paneer Noodles",
    price: 89,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780129227/paneer-schezwan-hakka-noodles_yc3cyh.png"
  },
  {
    id: 5,
    category: "Noodles",
    name: "Egg Noodles",
    price: 79,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780130353/images_nysphr.jpg"
  },
  {
    id: 6,
    category: "Noodles",
    name: "Chicken Noodles",
    price: 89,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780130612/chicken-hakka-noodles-bowl-on-600nw-2310202585_yuhpav.jpg"
  },
  {
    id: 7,
    category: "Noodles",
    name: "Chicken Schezwan Noodles",
    price: 110,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780130794/images_c0xvzt.jpg"
  },
  {
    id: 8,
    category: "Noodles",
    name: "Double egg  Double chicken noodles",
    price: 120,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780130976/chicken_and_egg_noodles_recipes_77fe5667-b8b0-4084-8d53-0ad28f439a1e_1200x_y8y69x.jpg"
  },

  {
    id: 9,
    category: "Fried Rice",
    name: "Veg Fried Rice",
    price: 69,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780127597/veg1_m9cvqt.jpg"
  },
  {
    id: 10,
    category: "Fried Rice",
    name: "Jeera Rice",
    price: 69,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780128023/images_rzvqdv.jpg"
  },
  {
    id: 11,
    category: "Fried Rice",
    name: "Kaju Rice",
    price: 99,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780128206/images_gtkxcs.jpg"
  },
  {
    id: 12,
    category: "Fried Rice",
    name: "Veg Schezwan Rice",
    price: 89,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780128312/Schezwan-Rice-0955_dowwmv.jpg"
  },
  {
    id: 13,
    category: "Fried Rice",
    name: "Veg Manchurian Rice",
    price: 79,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780128508/veg_manchurian_fried_rice_w6pagp.png"
  },
  {
    id: 14,
    category: "Fried Rice",
    name: "Paneer Fried Rice",
    price: 99,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780128627/images_u4on7o.jpg"
  },
  {
    id: 15,
    category: "Fried Rice",
    name: "Egg Rice",
    price: 79,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780131291/53991927_vtusyi.jpg"
  },
  {
    id: 16,
    category: "Fried Rice",
    name: "Double Egg",
    price: 89,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780131291/53991927_vtusyi.jpg"
  },
  {
    id: 17,
    category: "Fried Rice",
    name: "Chicken  Rice",
    price: 89,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780131670/images_xltumc.jpg"
  },
  {
    id: 18,
    category: "Fried Rice",
    name: "Double Egg Chicken Rice",
    price: 109,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780132099/street-style-chicken-rice-recipe-1-3_hxsk52.webp"
  },
  {
    id: 19,
    category: "Fried Rice",
    name: "Chicken Schezwan Rice",
    price: 99,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780131769/images_y1amf6.jpg"
  },
  {
    id: 20,
    category: "Fried Rice",
    name: "Double Egg Double Chicken Rice",
    price: 120,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780132099/street-style-chicken-rice-recipe-1-3_hxsk52.webp"
  },

  {
    id: 21,
    category: "Biryanis",
    name: "Chicken Dum Biryani",
    price: 120,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780129419/image-3982-1770195634_s7vale.jpg"
  },
  {
    id: 22,
    category: "Biryanis",
    name: "Fry Piece Biryani",
    price: 140,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780129690/images_gaxkcs.jpg"
  },
  {
    id: 23,
    category: "Biryanis",
    name: "Chicken 65 Biryani",
    price: 150,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780129910/Hyderabadi-boneless-chicken-65-biryani_kyeigm.png"
  },
  {
    id: 24,
    category: "Biryanis",
    name: "Chicken lolipop Biryani",
    price: 160,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780129993/6945023c-f417-4b3e-8cce-63ad43727877_5504cbe2-1e95-4ae3-9e84-d27628bd0810_umd6wl.jpg"
  },
  {
    id: 25,
    category: "Biryanis",
    name: "Family pack",
    price: 499,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780130135/image-1561-1776501814_dsbnqq.jpg"
  },

  {
    id: 26,
    category: "Starters",
    name: "Veg Manchurian",
    price: 69,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780132327/360_F_911211840_Js0NUvp9P4BaVfYbHfvWyGsIMcBwZUhN_bztpfo.jpg"
  },
  {
    id: 27,
    category: "Starters",
    name: "Veg 65 Manchurian",
    price: 79,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780132602/images-22_yumrue.jpg"
  },
  {
    id: 28,
    category: "Starters",
    name: "Veg chilli garlic Manchurian",
    price: 89,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780132933/images_trhohk.jpg"
  },
  {
    id: 29,
    category: "Starters",
    name: "paneer Manchurian",
    price: 99,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780133084/image-167_thjoar.png"
  },
  {
    id: 30,
    category: "Starters",
    name: "paneer 65",
    price: 110,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780133249/images_ahvykw.jpg"
  },
  {
    id: 31,
    category: "Starters",
    name: "Chilli paneer ",
    price: 99,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780133368/2_trlewz.jpg"
  },
  {
    id: 32,
    category: "Starters",
    name: "Paneer Majestic",
    price: 119,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780133495/majestic-paneer-served-hot-on-260nw-2709979385_lptaqn.jpg"
  },
  {
    id: 33,
    category: "Starters",
    name: "Egg Omlet",
    price: 20,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780134749/Masala-Omelette-4_mlfbcv.jpg"
  },
  {
    id: 34,
    category: "Starters",
    name: "Bolied Egg ",
    price: 15,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780134961/Boil_fry_kyrtra.jpg"
  },
  {
    id: 35,
    category: "Starters",
    name: "Bolied Egg Fry ",
    price: 40,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780135063/hq720_g0xpi2.jpg"
  },
  {
    id: 36,
    category: "Starters",
    name: "Egg Bhurji ",
    price: 49,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780135159/images_of3rdw.jpg"
  },
  {
    id: 37,
    category: "Starters",
    name: "Chicken manchuria",
    price: 119,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780133776/delicious-sesame-chicken-bowl_191095-77866_epqflb.jpg"
  },
  {
    id: 38,
    category: "Starters",
    name: "Chicken 65",
    price: 119,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780133928/Chicken-65-Spicy-Crispy-4_vu1wvl.jpg"
  },
  {
    id: 39,
    category: "Starters",
    name: "Chilli garlic Chicken ",
    price: 129,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780134014/Chilli-Garlic-Chicken_gwgxwo.jpg"
  },
  {
    id: 40,
    category: "Starters",
    name: "Chilli Chicken ",
    price: 129,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780134202/shutterstock_1498639676-min_lbvcnk.jpg"
  },
  {
    id: 41,
    category: "Starters",
    name: "Chicken lollipop ",
    price: 139,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780134292/images_mniec3.jpg"
  },
  {
    id: 42,
    category: "Starters",
    name: "Chicken Majestic ",
    price: 149,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780134415/9236788671_29b8425b58_z_na6tzh.jpg"
  },
  {
    id: 43,
    category: "Starters",
    name: "Sagwan chicken ",
    price: 129,
    image: "https://res.cloudinary.com/dts1dv53j/image/upload/q_auto/f_auto/v1780134511/SchezwanChicken3_jdq8zn.jpg"
  }
];

export default menuItems;