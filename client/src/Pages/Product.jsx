import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct, addtoCart } from "../features/Products/productSlice"
import StarRatings from "react-star-ratings"
import { useNavigate } from "react-router-dom"
import Spinner from "../Components/Spinner"
import { toast } from "react-toastify"
import {
  fetchProductReviews,
  fetchAverageRating,
  createReview,
} from "../features/Reviews/reviewSlice"
import Star from "../Components/Star"
function Product() {
  const slug = useParams().slug
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Local State
  const [rating, setRating] = useState(0)
  const changeRating = newRating => {
    setRating(newRating)
  }

  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewDescription, setReviewDescription] = useState("")
  // REDUX
  const { product, isLoading, isSuccess, isError, message } = useSelector(
    state => state.productReducer
  )
  const { user } = useSelector(state => state.userReducer)
  const { reviews, averageRating } = useSelector(state => state.reviewReducer)
  useEffect(() => {
    dispatch(fetchProduct(slug))
    dispatch(fetchProductReviews(slug))
    dispatch(fetchAverageRating(slug))
  }, [dispatch])

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

  const handleSubmit = e => {
    e.preventDefault()
    if (!reviewDescription || !reviewTitle || !rating) {
      toast.error("Please fill in all fields")
    } else {
      const reviewData = {
        slug,
        reviewDesc: reviewDescription,
        reviewTitle: reviewTitle,
        rating,
      }

      // Dispatch to backend
      dispatch(createReview(reviewData))
      dispatch(fetchAverageRating(slug))
      dispatch(fetchProduct(slug))

      // Clear local state
      setReviewDescription("")
      setReviewTitle("")
      setRating(0)

      // Alert User
      toast.success("Thanks for your review!")
    }
  }

  return (
    <div className="xl:w-6/12 mx-auto">
      <div className="w-full bg-zinc-700">
        <h1 className="p-4 text-left text-white text-xl font-bold uppercase leading-relaxed">
          {product.name}
        </h1>
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
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
              <div className="px-4">
                {reviews.length > 0 ? (
                  <>
                    <div className="flex flex-row ">
                      <div className="pr-3">
                        <StarRatings
                          rating={averageRating.average}
                          starRatedColor="rgb(230, 67, 47)"
                          numberOfStars={5}
                          name="rating"
                          starDimension="18px"
                          starSpacing="1px"
                        />
                      </div>
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
                    </div>
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
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
          <div className="p-2 w-full">
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
                          {new Date(review.createdAt).toLocaleDateString("AU")}{" "}
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
              <>{/* <p className="text-center">No reviews yet</p> */}</>
            )}
          </div>
          <div className="xl:pl-8 lg:pl-8 md:pl-8 p-2">
            {user ? (
              <>
                <h1 className="text-center font-bold text-md">
                  Read {product.name}?
                </h1>
                <p className="text-center">Leave a review!</p>
                <form onSubmit={handleSubmit}>
                  <div>
                    <span className="flex flex-row">
                      {[1, 2, 3, 4, 5].map(value => (
                        <Star
                          key={value}
                          filled={value <= rating}
                          onClick={() => changeRating(value)}
                        />
                      ))}
                    </span>
                    <p className="text-sm text-gray-500 mt-1 mb-1">
                      Star rating
                    </p>
                  </div>
                  <label htmlFor="title" className="w-full text-sm mt-1 mb-1">
                    Review Title
                  </label>
                  <input
                    type="text"
                    className="w-full border-[1px] border-gray-500 rounded p-1"
                    placeholder="Give it a title!"
                    onChange={e => setReviewTitle(e.target.value)}
                  />
                  <label htmlFor="description" className="text-sm mt-1 mb-1 ">
                    Review Description
                  </label>
                  <textarea
                    name=""
                    id=""
                    className="w-full border-[1px] border-gray-500 rounded p-2"
                    placeholder="What did you like about this book?"
                    onChange={e => setReviewDescription(e.target.value)}
                  ></textarea>
                  <button type="submit" className="p-2 bg-indigo-500 rounded">
                    <p className="text-white font-bold text-md">Submit</p>
                  </button>
                </form>
              </>
            ) : (
              <h1 className="text-center font-bold text-md">
                Please{" "}
                <a href="/login" className="text-indigo-500">
                  log in
                </a>{" "}
                to leave a review!
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product
