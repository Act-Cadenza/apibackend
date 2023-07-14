import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Crud = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductDetail, setEditProductDetail] = useState('');
  const [createProductName, setCreateProductName] = useState('');
  const [createProductDetail, setCreateProductDetail] = useState('');
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = cookies.user.data.token;
        console.log('Token:', token);

        const response = await axios.get('http://127.0.0.1:8000/api/products/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [cookies.user.data.token]);

  const handleEdit = async (productId) => {
    try {
      // Fetch product data by ID
      console.log(productId);
      const token = cookies.user.data.token;
      console.log('Token:', token);
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      }, );
          
      const productData = response.data;
      console.log(productData);
      console.log(productData.id);
      // console.log(productData.name);
      // Set the product data in the state
      setEditProductId(productData.id);
      setEditProductName(productData.name);
      setEditProductDetail(productData.detail);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = cookies.user.data.token;
      // Update
      const updatedProductData = {
        name: editProductName,
        detail: editProductDetail,
      };

      // Endpoint
      // await axios.put(`http://127.0.0.1:8000/api/products/${editProductId}`,  updatedProductData);
      await axios.put(
        `http://127.0.0.1:8000/api/products/${editProductId}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${cookies.user.data.token}`,
          },
        }
      );

      setEditProductId(null);
      setEditProductName('');
      setEditProductDetail('');

      const response = await axios.get('http://127.0.0.1:8000/api/products/', {
        headers: {
          Authorization: `Bearer ${cookies.user.data.token}`, // Include the token in the request headers
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const newProductData = {
        name: createProductName,
        detail: createProductDetail,
      };

      await axios.post('http://127.0.0.1:8000/api/products/', newProductData, {
        headers: {
          Authorization: `Bearer ${cookies.user.data.token}`, // Include the token in the request headers
        },
      });

      setCreateProductName('');
      setCreateProductDetail('');

      const response = await axios.get('http://127.0.0.1:8000/api/products/', {
        headers: {
          Authorization: `Bearer ${cookies.user.data.token}`, // Include the token in the request headers
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${cookies.user.data.token}`, // Include the token in the request headers
        },
      });

      const response = await axios.get('http://127.0.0.1:8000/api/products/', {
        headers: {
          Authorization: `Bearer ${cookies.user.data.token}`, // Include the token in the request headers
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Detail</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {editProductId === product.id ? (
                  <input
                    type="text"
                    value={editProductName}
                    onChange={(e) => setEditProductName(e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input
                    type="text"
                    value={editProductDetail}
                    onChange={(e) => setEditProductDetail(e.target.value)}
                  />
                ) : (
                  product.detail
                )}
              </td>
              <td>{product.created_at}</td>
              <td>{product.updated_at}</td>
              <td>
                {editProductId === product.id ? (
                  <React.Fragment>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditProductId(null)}>Cancel</button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button onClick={() => handleEdit(product.id)}>Edit</button>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create Product</h2>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={createProductName}
          onChange={(e) => setCreateProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Detail"
          value={createProductDetail}
          onChange={(e) => setCreateProductDetail(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default Crud;
