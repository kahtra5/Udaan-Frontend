import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';

const API_URL = import.meta.env.VITE_API_KEY || 'http://localhost:3000';

const GetAll = () => {
  const [leads, setLeads] = useState([]);
  
  // Fetch leads data from the backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${API_URL}/getleads`, { credentials: 'include' });
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };
    fetchLeads();
  }, []);

  // Define main table columns for leads
  const columns = [
    {
      title: 'Restaurant Name',
      dataIndex: 'restaurantName',
      key: 'restaurantName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Lead Status',
      dataIndex: 'leadStatus',
      key: 'leadStatus',
    },
    {
      title: 'Orders',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Call Frequency (days)',
      dataIndex: 'callFrequency',
      key: 'callFrequency',
    },
  ];

  // Define POC table columns
  const pocColumns = [
    {
      title: 'POC Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  // Expanded row renderer for displaying POCs
  const expandedRowRender = (record) => (
    <>
      <Table
        dataSource={record.pocDetails}
        columns={pocColumns}
        pagination={false}
        rowKey="_id"
      />
    </>
  );

  return (
    <div>
      <Typography.Title level={3}>Leads Management</Typography.Title>
      <Table
        dataSource={leads}
        columns={columns}
        rowKey="_id"
        expandable={{
          expandedRowRender, // Use the nested table for POCs
          rowExpandable: (record) => record.pocDetails && record.pocDetails.length > 0,
        }}
      />
    </div>
  );
};

export default GetAll;
