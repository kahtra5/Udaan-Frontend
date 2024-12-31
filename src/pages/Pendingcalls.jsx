import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import Navbar from "./Navbar.jsx";

const API_URL = "http://localhost:3000";

const PendingCalls = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchTodayLeads = async () => {
      try {
        const response = await fetch(`${API_URL}/leads/today`, {
          method: 'GET',
          credentials: 'include', // Ensures cookies are included in the request
        });
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error("Error fetching today's leads:", error);
      }
    };

    fetchTodayLeads();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'restaurantName',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'leadStatus',
      key: 'status',
    },
    {
      title: 'Orders',
      dataIndex: 'order',
      key: 'orders',
    },
  ];

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <Table dataSource={leads} columns={columns} rowKey="_id" />
      </div>
    </div>
  );
};

export default PendingCalls;
