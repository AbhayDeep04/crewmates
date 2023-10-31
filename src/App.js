import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Row, Col, Button, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductCard from './productCard';
import CrewmateInfo from './CrewmateInfo';
import { supabase } from './supabaseClient';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data, error } = await supabase.from('products').select('*').limit(10);
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: name,
          description: description,
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Router>
      <Navbar>
        <Container>
          <Navbar.Brand>CrewMates</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={
            <>
              <Row>
                <Col xs={12} md={8}>
                  <h3>Create new Crewmate</h3>
                  <Form.Label>CrewMate Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Label>Crewmate Description</Form.Label>
                  <Form.Control
                    type="text"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br></br>
                  <Button onClick={() => createProduct()}>Create Crewmate</Button>
                </Col>
              </Row>
              <hr></hr>
              <h3>Current Crewmates</h3>
              <Row xs={1} lg={3} className="g-4">
                {products.map((product) => (
                  <Col key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </>
          } />
          <Route path="/crewmate/:crewmateId" element={<CrewmateInfo />} />
          <Route path="/:crewmateId" element={<CrewmateInfo />} />
          {/* New route to display all crewmates */}
          <Route path="/all" element={
            <>
              <h3>All Crewmates</h3>
              <Row xs={1} lg={3} className="g-4">
                {products.map((product) => (
                  <Col key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </>
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
