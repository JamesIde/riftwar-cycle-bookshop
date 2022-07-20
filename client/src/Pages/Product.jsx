import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct, addtoCart } from "../features/Products/productSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../Components/Spinner"
import { toast } from "react-toastify"
function Product() {
  const slug = useParams().slug
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { product, isLoading, isSuccess, isError, message } = useSelector(
    state => state.productReducer
  )
  const { user } = useSelector(state => state.userReducer)
  useEffect(() => {
    dispatch(fetchProduct(slug))
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  const addItemToCart = productId => {
    // Check if there is a user, navigate to login if not
    if (!user) {
      navigate("/login")
    } else {
      toast.success("Item added to cart!")
      dispatch(addtoCart(productId))
    }
  }

  return (
    <div className="xl:w-6/12 mx-auto">
      <div className="w-full bg-zinc-700">
        <h1 className="p-4 text-left text-white text-xl font-bold uppercase leading-relaxed ">
          {product.name}
        </h1>
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
        {/* Image Grid */}
        <div className="xl:grid-cols-1 xl:w-[80%] lg:w-[70%] md:w-[80%] w-[100%]  xl:p-0 p-2">
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
          <div className="flex flex-row justify-between">
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
            <div>
              <p className="text-3xl px-2">${product.price}</p>
            </div>
          </div>
          <div
            className="mx-2 bg-black hover:bg-neutral-800 cursor-pointer duration-500"
            onClick={() => addItemToCart(product._id)}
          >
            <p className="p-2 mt-4 mb-2 px-4 w-full  text-white text-center">
              ADD TO CART
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product
