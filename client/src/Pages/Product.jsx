import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct, addtoCart } from "../features/Products/productSlice"
import StarRatings from "react-star-ratings"
import { useNavigate } from "react-router-dom"
import Spinner from "../Components/Spinner"
import { toast } from "react-toastify"
import { fetchProductReviews } from "../features/Reviews/reviewSlice"
function Product() {
  const slug = useParams().slug
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Access redux store
  const { product, isLoading, isSuccess, isError, message } = useSelector(
    state => state.productReducer
  )
  const [reviewAverage, setReviewAverage] = useState(0)
  const { user } = useSelector(state => state.userReducer)
  const { reviews } = useSelector(state => state.reviewReducer)
  useEffect(() => {
    dispatch(fetchProduct(slug))
    dispatch(fetchProductReviews(slug))

    if (product) {
      let sum = 0

      reviews.forEach(review => {
        sum += review.rating
      })
      setReviewAverage(sum / reviews.length)
    }
  }, [])

  // TODO
  // Possible fix for page not laoding
  // Add review title like Snowys and copy the design
  // UseEffect, await the product load, calculate the average rating, set it in local useState

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
            <hr className="mb-2 mt-1" />
            <div className="flex flex-row justify-center">
              <div className="">
                <StarRatings
                  rating={reviewAverage}
                  starRatedColor="rgb(230, 67, 47)"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="1px"
                />
              </div>
              <div className="px-4">
                {reviews.length > 0 ? (
                  <>
                    {reviews.length > 1 ? (
                      <>
                        {" "}
                        <p>{reviews.length} reviews</p>{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <p>{reviews.length} review</p>{" "}
                      </>
                    )}
                  </>
                ) : (
                  <p> No reviews yet </p>
                )}
              </div>
            </div>
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
            className="mx-2 bg-black hover:-translate-y-1  hover:bg-indigo-600 cursor-pointer duration-500"
            onClick={() => addItemToCart(product._id)}
          >
            <p className="p-2 mt-4 mb-2 px-4 w-full  text-white text-center">
              ADD TO CART
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center text-xl font-bold xl:mt-24 md:mt-14 mt-4 mb-2">
          Reviews
        </h1>
        <div className="grid  xl:grid-cols-2 md:grid-cols-2 ">
          <div className="xl:grid-cols-1 grid-cols-2">
            <div className="p-2 xl:w-[80%] w-full">
              {reviews.length > 0 ? (
                <>
                  {reviews.map(review => {
                    return (
                      <>
                        <div className="flex flex-row w-full">
                          <div>
                            <StarRatings
                              rating={review.rating}
                              starRatedColor="rgb(230, 67, 47)"
                              // changeRating={this.changeRating}
                              numberOfStars={5}
                              name="rating"
                              starDimension="20px"
                              starSpacing="1px"
                            />
                          </div>

                          <p className="px-2  p-1 text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString(
                              "AU"
                            )}{" "}
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-md mt-1">
                            {review.reviewTitle}
                          </p>
                          <p className="text-sm mt-1">{review.reviewDesc}</p>
                          <p className="text-sm mt-2 mb-1 text-gray-500">
                            Written by {review.userName}
                          </p>
                          <hr className="border-t-[0.5px] mt-1 mb-1 border-gray-400" />
                        </div>
                      </>
                    )
                  })}
                </>
              ) : (
                <>
                  <p className="text-center">No reviews yet</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product
