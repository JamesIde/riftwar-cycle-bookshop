import { FaStar } from "react-icons/fa"
function Star({ filled, onClick }) {
  return (
    <FaStar color={filled ? "red" : "lightgray"} onClick={onClick} size={19} />
  )
}
export default Star
