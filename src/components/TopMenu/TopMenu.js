import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../../assets/img/logo.svg'
import Carrito from '../Carrito'

import './TopMenu.scss'

export default function TopMenu(props) {
    return (

        <Navbar bg="dark" variant="dark" className='top-menu'>
            <Container>
                <BrandNav />
                {/* <MenuNav/> */}
                <Carrito productsCarrito={props.productsCarrito} getProductCarrito={props.getProductCarrito} products={props.products} />
            </Container>
        </Navbar>


    )
}

function BrandNav() {
    return (
        <Navbar.Brand>
            <img
                alt=""
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
            />
            <h2>La casa de los helados</h2>
        </Navbar.Brand>

    )
}

function MenuNav() {
    return (
        <Nav className="me-auto">
            <Nav.Link href="#home">Aperitivos</Nav.Link>
            <Nav.Link href="#features">Helados</Nav.Link>
            <Nav.Link href="#pricing">Mascotas</Nav.Link>
        </Nav>
    )
}