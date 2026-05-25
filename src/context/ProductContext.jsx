import { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPrice = product.price <= price;

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return matchesSearchTerm && matchesPrice && matchesCategory;
  });

  return (
    <ProductContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        products,
        setProducts,
        filteredProducts,
        price,
        setPrice,
        selectedCategories,
        setSelectedCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
