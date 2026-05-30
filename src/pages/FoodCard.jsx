const FoodCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {item.name}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <p className="font-bold text-orange-500">
            ₹{item.price}
          </p>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;