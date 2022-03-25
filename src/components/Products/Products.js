import Loading from '../Loading';
import Product from '../Product/Product';
import { Container, Row } from 'react-bootstrap'


import './Products.scss'

export default function Products(props) {
    const { products:
        { result, loading, error }
    } = props

    console.log(result);
    return (
        <Container>
            <Row>
                {!result || loading ? (
                    <Loading />
                ) : (
                    result.map((product, index) => <Product product={product} addProductCart={props.addProductCart} />)
                )}
            </Row>
        </Container>
    );
}