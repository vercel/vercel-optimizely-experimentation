export const products: {
  id: string;
  slug: string;
  title: string;
  summary: string;
  details: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
}[] = [
  {
    id: "1",
    slug: "hoodie",
    title: "Acme Hoodie",
    price: 19.99,
    imageSrc: "/product-images/hoodie-1.png",
    imageAlt: "Acme hoodie",
    summary: "The ultimate comfort meets style hoodie",
    details: `Crafted for the modern trendsetter, this hoodie blends ultra-soft, breathable fabric with a sleek, minimalist design, perfect for both a relaxed day at home or a stylish outing. Featuring adjustable drawstrings and a spacious kangaroo pocket, it offers both comfort and convenience. The durable material ensures it can withstand the rigors of daily wear while maintaining its form and color after multiple washes.`,
  },
  {
    id: "2",
    slug: "mug",
    title: "Acme Ceramic Mug",
    price: 4.99,
    imageSrc: "/product-images/mug-1.png",
    imageAlt: "Acme ceramic mug",
    summary: "Sip in style: your everyday coffee companion",
    details: `The Acme Ceramic Mug is crafted from high-quality ceramic materials, ensuring durability and resistance to daily wear and tear. Its ergonomic design features a comfortably large handle that provides a secure grip, making it ideal for sipping your favorite hot beverages.`,
  },
  {
    id: "3",
    slug: "hat",
    title: "Acme Baseball Hat",
    price: 9.99,
    imageSrc: "/product-images/hat-1.png",
    imageAlt: "Acme baseball hat",
    summary: "The ultimate everyday cap",
    details: `The Acme Baseball Hat is designed for both fashion and functionality, making it the perfect accessory for your daily adventures. Crafted from premium fabric, this hat offers a durable and breathable fit, suitable for any weather condition. Its adjustable strap ensures a comfortable, custom fit for all head sizes, while the pre-curved visor provides excellent sun protection.`,
  },
  {
    id: "4",
    slug: "cup",
    title: "Acme Black Cup",
    price: 1.99,
    imageSrc: "/product-images/cup-black.png",
    imageAlt: "Acme black cup",
    summary: "The acme black cup for every occasion",
    details:
      "The Acme Black Cup is a testament to minimalist design, perfectly suited for your modern lifestyle. Crafted from high-quality ceramic, this cup features a matte black finish that adds a touch of sophistication to your coffee table or desk.",
  },
];
