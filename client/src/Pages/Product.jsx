import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct, addtoCart } from "../features/Products/productSlice"
import Spinner from "../Components/Spinner"
import ProductItem from "../Components/ProductItem"
function Product() {
  const slug = useParams().slug
  const dispatch = useDispatch()
  const { product, isLoading, isSuccess, isError, message } = useSelector(
    state => state.productReducer
  )
  useEffect(() => {
    dispatch(fetchProduct(slug))
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  const addItemToCart = productId => {
    dispatch(addtoCart(productId))
  }

  return (
    <div className="w-6/12 mx-auto">
      <div className="w-full bg-neutral-800">
        <h1 className="p-4 text-left text-white uppercase leading-relaxed ">
          {product.name}
        </h1>
      </div>
      <div className="grid grid-cols-2">
        {/* Image Grid */}
        <div className="grid-cols-1  w-[80%]">
          <img src={product.image} alt="" />
        </div>
        <div className="grid-cols-1">
          <div className="w-full">
            <p className="text-xl font-bold text-center mb-1 mt-4">
              About {product.name}
            </p>
            <p className="text-center font-sm">Part of {product.series}</p>
            <hr className="mb-4 mt-1" />
            <p className="p-2 leading-normal">{product.description}</p>
          </div>
          <div className="mx-2">
            {" "}
            <p>
              <strong>ISBN: </strong>
              {product.isbn}
            </p>
            <p className="">
              {" "}
              <strong>Published: </strong>
              {product.published}
            </p>
          </div>
          <div
            className="mx-2 bg-black hover:bg-neutral-800 cursor-pointer duration-500"
            onClick={() => addItemToCart(product._id)}
          >
            <p className="p-2 mt-4 mb-2 px-4 w-full  text-white text-center">
              Add to Cart
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product
