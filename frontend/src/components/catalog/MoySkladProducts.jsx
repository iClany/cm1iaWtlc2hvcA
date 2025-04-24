// src/components/MoyskladProducts.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from '../../api/products';

const MoyskladProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { current, pageSize } = pagination;
      const response = await api.get('/moysklad/products', {
        params: {
          search,
          limit: pageSize,
          offset: (current - 1) * pageSize
        }
      });
      
      setProducts(response.data.rows);
      setPagination({
        ...pagination,
        total: response.data.meta.size
      });
    } catch (error) {
      message.error('Ошибка при загрузке товаров');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.current, search]);

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Артикул',
      dataIndex: 'article',
      key: 'article'
    },
    {
      title: 'Цена',
      dataIndex: 'salePrices',
      key: 'price',
      render: prices => `${prices?.[0]?.value / 100 || 0} руб.`
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => handleImport(record)}
        >
          Импортировать
        </Button>
      )
    }
  ];

  const handleImport = async (product) => {
    try {
      await api.post('/products/import-from-moysklad', product);
      message.success('Товар успешно импортирован');
    } catch (error) {
      message.error('Ошибка при импорте товара');
    }
  };

  return (
    <div>
      <Input
        placeholder="Поиск товаров..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPagination({ ...pagination, current: 1 });
        }}
        style={{ width: 300, marginBottom: 16 }}
      />
      
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={(pagination) => setPagination(pagination)}
      />
    </div>
  );
};

export default MoyskladProducts;