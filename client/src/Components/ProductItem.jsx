import { Link } from "react-router-dom"
function ProductItem({ product }) {
  return (
    <div className="border-[1px] border-indigo-600 p-1 rounded mx-auto mb-2">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className=" mx-auto xl:w-[400px] lg:w-[350px] md:w-[250px] w-[250px]"
        />
      </div>
      <div className="border-l border-r border-b">
        <h1 className="mt-2 font-bold text-center text-xl">{product.name}</h1>
        <p className="mt-1 text-center text-sm">{product.series}</p>
        <p className="font-bold p-2 text-center">${product.price}</p>
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
