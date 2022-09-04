import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../features/Products/productSlice"
import ProductItem from "../Components/ProductItem"
import Spinner from "../Components/Spinner"
function Home() {
  const dispatch = useDispatch()
  const { products, isLoading } = useSelector(state => state.productReducer)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="xl:w-8/12 mx-auto">
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 mx-auto mt-4 gap-14 border-2">
        {products.map(product => {
          return <ProductItem product={product} key={product._id} />
        })}
      </div>
    </div>
  )
}
export default Home
