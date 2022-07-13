import { Link } from "react-router-dom"
function ProductItem({ product }) {
  return (
    <div className="border-[1px] border-indigo-600 p-1 rounded w-max mx-auto mb-2">
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
        <Link to={`/${product.slug}`}>
          <div className="bg-zinc-800 hover:cursor-pointer">
            <p className="p-3 text-center text-white font-bold text-lg">
              DETAILS
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default ProductItem
