import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ReactComponent as CarrritoVacio } from '../../assets/img/cart-empty.svg'
import { ReactComponent as CarrritoLleno } from '../../assets/img/cart-full.svg'
import { ReactComponent as Close } from '../../assets/img/close.svg'
import { ReactComponent as Basura } from '../../assets/img/garbage.svg'
import { removeArrayDuplicates, contadorDuplicatesItemArray, removeItemArray } from '../../utils/arrayFunc'
import { BASE_PATH } from '../../utils/constants'



import './Carrito.scss'


export default function Carrito(props) {

    const { productsCarrito, getProductCarrito, products } = props
    const [carritoOpen, setCarritoOpen] = useState(false)
    const widthCarrito = carritoOpen ? 400 : 0;
    const [productoNoRepetidosCarrito, setProductoNoRepetidosCarrito] = useState([])
    const [carritoTotalPrice, setCarritoTotalPrice] = useState(0)

    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCarrito)
        setProductoNoRepetidosCarrito(allProductsId)
    }, [productsCarrito])

    useEffect(() => {
        //Total price
        const productData = [];
        let totalPrice = 0;

        const allProductsId = removeArrayDuplicates(productsCarrito)
        allProductsId.forEach(productId => {
            const quantity = contadorDuplicatesItemArray(productId, productsCarrito)
            const productValue = {
                id: productId,
                quantity: quantity
            }
            productData.push(productValue)
        })

        if (!products.loading && products.result) {
            products.result.forEach(product => {
                productData.forEach(item => {
                    if (product.id == item.id) {
                        const totalValue = product.price * item.quantity;
                        totalPrice = totalPrice + totalValue
                    }
                })
            })
        }

        setCarritoTotalPrice(totalPrice)
    }, [productsCarrito, products])

    const openCarrito = () => {
        setCarritoOpen(true)
        document.body.style.overflow = "hidden"
    }
    const closeCarrito = () => {
        setCarritoOpen(false);
        document.body.style.overflow = "scroll"
    }
    const increaseQuantity = (id) => {
        const arrayItemCarrito = productsCarrito;
        arrayItemCarrito.push(id);
        localStorage.setItem('product_cart', arrayItemCarrito)
        getProductCarrito()

    }
    const decrementQuantity = (id) => {
        const result = removeItemArray(productsCarrito, id.toString())
        localStorage.setItem('product_cart', result)
        getProductCarrito()

    }

    return (
        <>
            <Button variant='link' className='carrito'>{productsCarrito.length > 0 ? <CarrritoLleno onClick={openCarrito} /> : <CarrritoVacio onClick={openCarrito} />}</Button>
            {carritoOpen == true &&
                <div className='carrito-content' style={{ width: widthCarrito }}
                >
                    <CarritoContentHeader
                        closeCarrito={closeCarrito}
                        getProductCarrito={getProductCarrito}
                    />
                    <div className='carrito-content__body'>
                        {productoNoRepetidosCarrito.map((iDproducto, index) => (
                            <CarritoContentBody
                                key={index}
                                products={products}
                                idsProductos={productsCarrito}
                                iDproducto={iDproducto}
                                increaseQuantity={increaseQuantity}
                                decrementQuantity={decrementQuantity}
                            />
                        ))}
                    </div>
                    <CarritoContentFooter carritoTotalPrice={carritoTotalPrice} />
                </div>

            }
        </>
    )
}

function CarritoContentHeader(props) {
    const { closeCarrito, getProductCarrito } = props;
    const emptyCarrito = () => {
        localStorage.removeItem('product_cart')
        getProductCarrito()
    }
    return (
        <>
            <div className='carrito-content__header'>
                <div>
                    <Close onClick={closeCarrito} />
                    <h2>Carrito</h2>
                </div>
                <Button variant='link' onClick={emptyCarrito}>Vaciar<Basura /></Button>
            </div>
        </>

    )
}

function CarritoContentBody(props) {

    const { products: { loading, result },
        idsProductos,
        iDproducto,
        increaseQuantity,
        decrementQuantity } = props

    if (!loading && result) {
        return result.map((product, index) => {
            if (iDproducto == product.id) {
                const quantity = contadorDuplicatesItemArray(product.id, idsProductos);
                return (
                    <RenderProducto
                        key={index}
                        product={product}
                        quantity={quantity}
                        increaseQuantity={increaseQuantity}
                        decrementQuantity={decrementQuantity}
                    />
                )
            }
        })
    }
    else return null;
}

function RenderProducto(props) {
    const { product, quantity, increaseQuantity, decrementQuantity } = props
    console.log('quanty', quantity);

    return (
        <div className='carrito-content__product'>
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name}></img>
            <div className='carrito-content__product-info'>
                <div>
                    <h3>{product.name.substr(0, 25)}...</h3>
                    <p>{product.price.toFixed(2)} € / ud.</p>
                </div>
                <div>
                    <p>En carri: {quantity} ud.</p>
                    <div>
                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                        <button onClick={() => decrementQuantity(product.id)}>-</button>

                    </div>
                </div>

            </div>
        </div>
    )
}

function CarritoContentFooter(props) {
    const { carritoTotalPrice } = props

    return (
        <div className='cart-content__footer'>
            <div>
                <p>Total aproximado:</p>
                <p>{carritoTotalPrice.toFixed(2)} €</p>
            </div>
            <button>Tramitar pedido</button>
        </div>
    )
}