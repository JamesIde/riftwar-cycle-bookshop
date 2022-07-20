function Footer() {
  return (
    <>
      <div className="p-2  border-t w-full mt-auto">
        <h1 className="text-center mt-4 mb-2">
          Copyright © 2022 The Riftwar Cycle Bookshop
        </h1>

        <div className="mx-auto text-center">
          <label
            for="my-modal"
            class="modal-button hover:text-cyan-500 cursor-pointer duration-500"
          >
            Learn More
          </label>
        </div>
      </div>

      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">The Riftwar Cycle Bookshop</h3>
          <p class="py-2">
            An ecommerce store dedicated to the author Raymond E. Feist. The
            collection of novels that formed the Riftwar Cycle remain some of
            the best fiction of the century.
          </p>
          <p className="py-2">
            This project was created using the MERN Stack. React on the
            frontend, connected by an API written using Express with NodeJS, and
            MongoDB (with mongoose) for data storage.
          </p>
          <p className="py-2">
            This project was an opportunity for me to understand the concepts
            and logic of a shopping cart, and improve my overall fullstack
            development through trying new things like using React Query, Redux
            and Express. Some styling was done with TailwindCSS and DaisyUI
            components.
          </p>
          <p className="py-2">
            You can find the source code by clicking on this
            <a
              href="https://github.com/JamesIde/riftwar-cycle-bookshop"
              target="_#"
              className="pl-1 font-bold"
            >
              link
            </a>
            .
          </p>
          <p className="py-2">
            You can find more information about me on this
            <a
              href="https://jamesaide.com/"
              target="_#"
              className="font-bold pl-1"
            >
              website
            </a>
            , or connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/james-ide-a92368180/"
              className="font-bold"
              target="_#"
            >
              Linkedin
            </a>
            .
          </p>
          <div class="modal-action">
            <label for="my-modal" class="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
export default Footer
