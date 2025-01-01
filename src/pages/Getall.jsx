import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button } from "antd";
const API_URL = import.meta.env.VITE_API_KEY || 'http://localhost:3000';
import { Table } from 'antd';


  
const GetAll = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchpage = async () => {
        try {
            const response = await fetch(`${API_URL}/getleads`, {credentials: 'include'});
            const data = await response.json();
            setLeads(data);
  
            
        } catch (error) {
            console.log(error);
        }
    };
    fetchpage();
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
    key: 'status',
  },
];


    return (
      <div>
        <Table dataSource={leads} columns={columns} rowKey="_id" />
      </div>
    );
};


export default GetAll;
