function ProductItem({ product }) {
  return (
    <div className="border-[1px] border-blue-400 p-1 rounded w-max mx-auto">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="h-auto w-[340px] mx-auto"
        />
      </div>
      <div className="border-l border-r border-b">
        <h1 className="mt-2 font-bold text-center text-xl">{product.name}</h1>
        <p className="text-left mt-1 mb-1 p-2">As low as: ${product.price}</p>
        <div className="bg-zinc-800">
          <p className="p-3 text-center text-white font-bold text-lg">
            DETAILS
          </p>
        </div>
      </div>
    </div>
  )
}
export default ProductItem
