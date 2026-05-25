import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import {
  MENS_CLOTHING,
  WOMENS_CLOTHING,
  JEWELRY,
  ELECTRONICS,
} from "../utils/constants/enums";

const Filter = () => {
  const {
    price,
    setPrice,
    selectedCategories,
    setSelectedCategories,
  } = useContext(ProductContext);

  const setCategory = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== id),
      );
    }
  };

  return (
    <div className="sticky top-4 mt-10 shrink-0 rounded shadow p-4 bg-white h-fit">
      <h1 className="text-xl font-bold text-center mb-3 text-[#224957]">
        Filter
      </h1>
      <div className="flex flex-col">
        <label className="text-center" htmlFor="price">
          Price: {price}
        </label>
        <input
          id="price"
          type="range"
          min="0"
          max="20000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <h1 className="text-xl font-bold text-center mb-3 mt-3 text-[#224957]">
        Category
      </h1>
      <ul>
        <li className="flex gap-2">
          <input
            type="checkbox"
            id={MENS_CLOTHING}
            checked={selectedCategories.includes(MENS_CLOTHING)}
            onChange={(e) => setCategory(e)}
          />
          <label htmlFor={MENS_CLOTHING}>Men's Clothing</label>
        </li>
        <li className="flex gap-2">
          <input
            type="checkbox"
            id={WOMENS_CLOTHING}
            checked={selectedCategories.includes(WOMENS_CLOTHING)}
            onChange={(e) => setCategory(e)}
          />
          <label htmlFor={WOMENS_CLOTHING}>Women's Clothing</label>
        </li>
        <li className="flex gap-2">
          <input
            type="checkbox"
            id={JEWELRY}
            checked={selectedCategories.includes(JEWELRY)}
            onChange={(e) => setCategory(e)}
          />
          <label htmlFor={JEWELRY}>Jewelry</label>
        </li>
        <li className="flex gap-2">
          <input
            type="checkbox"
            id={ELECTRONICS}
            checked={selectedCategories.includes(ELECTRONICS)}
            onChange={(e) => setCategory(e)}
          />
          <label htmlFor={ELECTRONICS}>Electronics</label>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
