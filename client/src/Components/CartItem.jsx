function CartItem({ product }) {
  return (
    <>
      <div class="mt-8 xl:w-6/12 mx-auto">
        <div class="flow-root">
          <ul role="list" class="-my-6 divide-y divide-gray-200">
            <li class="flex py-6">
              <div class="h-60 w-40  rounded-md border border-gray-200">
                <img
                  src={product.image}
                  alt={product.description}
                  class="object-fit object-cover"
                />
              </div>
              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#"> {product.name} </a>
                    </h3>
                    <p class="ml-4">$90.00</p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">{product.series}</p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                  <p class="text-gray-500">Qty 1</p>

                  <div class="flex">
                    <button
                      type="button"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <hr />
          </ul>
        </div>
      </div>
    </>
  )
}
export default CartItem
