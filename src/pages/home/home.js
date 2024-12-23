import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import ProductService from '../../services/ProductService';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import renderPaginationItems from '../../utils/renderPaginationItems';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data, error, isLoading } = useQuery(['products', currentPage], () => 
    ProductService.getProducts(currentPage, itemsPerPage), {
    keepPreviousData: true,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  const products = data?.data?.products || [];
  const totalPages = data?.data?.totalPages || 10;

  return (
    <Container className="mt-5">
      <h1 className="text-center">Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">
        {renderPaginationItems(currentPage, totalPages, handlePageChange)}
      </Pagination>
    </Container>
  );
}