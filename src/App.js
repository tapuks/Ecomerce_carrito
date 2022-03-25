import { useEffect, useState } from 'react';
import TopMenu from './components/TopMenu'
import useFetch from './hooks/useFetch';
import { urlApiProducts } from '../src/utils/constants'
import Products from './components/Products/Products';
import { ToastContainer, toast } from 'react-toastify';




function App() {

  const products = useFetch(urlApiProducts)
  const [productsCarrito, setproductsCarrito] = useState([])


  useEffect(() => {
    getProductCarrito()
  }, [])

  const getProductCarrito = () => {
    if (localStorage.getItem('product_cart')) {
      setproductsCarrito(localStorage.getItem('product_cart').split(","))
    }
    else setproductsCarrito([])
  }

  const addProductCart = (id, name) => {
    const idProducts = productsCarrito;
    idProducts.push(id)
    setproductsCarrito(idProducts)
    localStorage.setItem('product_cart', productsCarrito)
    getProductCarrito();
    //activamos el toast
    toast.success(`${name} añadido al carrito correctamente.`, {
      theme: "colored"
    })
  }



  return (
    <>
      <TopMenu productsCarrito={productsCarrito} getProductCarrito={getProductCarrito} products={products}></TopMenu>
      <Products products={products} addProductCart={addProductCart}></Products>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>

  )


}

export default App;
