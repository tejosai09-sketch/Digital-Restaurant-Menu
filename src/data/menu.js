import FoodCard from "./FoodCard";

const Menu = ({ menuItems, selectedCategory }) => {
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {filteredItems.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Menu;