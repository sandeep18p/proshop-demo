import React from 'react';
import Product from '../components/Product.jsx';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/paginate.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';


const HomeScreen = () => {
  const { pageNumber, keyword }=useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    keepUnusedDataFor: 15000,
  });
//   console.log('Loading:', isLoading);
// console.log('Error:', error);
// console.log('Products:', products);
  return ( <>
       {!keyword ? (
        <ProductCarousel/>
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? ( <Loader/>
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : data.products && data.products.length > 0 ? (
        <>
       
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
        </>
      ) : (
        <p>No products available</p>
      )}
    </>
  );
};

export default HomeScreen;
