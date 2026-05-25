import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseInit";
import { useEffect } from "react";
import Input from "../utils/common/Input";
import ProductItem from "./ProductItem";
import Filter from "./Filter";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { GridLoader } from "react-spinners";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const {
    searchTerm,
    setSearchTerm,
    setProducts,
    filteredProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="max-w-sm mx-auto mt-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search By Name"
        />
      </div>
      <div className="h-[calc(100vh-80px)] flex">
        <Filter />

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <GridLoader
                color="#7064e5"
                loading={true}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {filteredProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
