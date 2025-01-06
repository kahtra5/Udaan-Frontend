# Udaan Lead Management System

## Introduction

The Udaan Lead Management System is a robust platform designed for Key Account Managers (KAMs) to efficiently track and manage leads, interactions, and account performance. This system streamlines lead management, contact organization, interaction tracking, and performance monitoring, enabling KAMs to focus on nurturing relationships with large restaurant accounts.

## Features

### Core Features

#### Lead Management

- Add new restaurant leads.

- Store and manage basic restaurant information.

- Track lead status (e.g., NEW, CONTACTED, CONVERTED).

#### Contact Management

- Support multiple Points of Contact (POCs) per restaurant.

- Store contact details, including name, role, and contact information.

- Manage multiple POCs with different roles.

#### Interaction Tracking

- Record all calls made to leads.

- Track orders placed by leads.

- Store interaction dates and details.

#### Call Planning

- Set call frequency for each lead.

- Display leads requiring calls on the current day.

#### Performance Tracking

- Identify and track well-performing accounts.

- Monitor ordering patterns and frequency.

### Technical Features

#### Data Models

- Efficient database schema design.

- Entity relationship management for seamless data integration.

#### API Design

- RESTful APIs for CRUD operations.

- Robust error handling.

- Authentication and authorization using JWT tokens.

#### Business Logic

- Logic to determine leads requiring calls today.

- Metrics for account performance calculation.

- State management for lead status transitions.

## Implementation

### System Design

- **Architecture**: Built using a Node.js backend with Express.js, MongoDB for the database, and React (with Vite) for the frontend.

- **Scalability**: Designed with modular components and a scalable database structure.

- **Security**: JWT tokens secure API endpoints and user sessions.

### Data Modeling

- **Database**: MongoDB is used for its flexibility and scalability.

- **Schema**:

- **Leads**: Stores restaurant details like name, status, and call frequency.

- **KAM**: Stores information of every Key Account Manager.

- **Interactions**: Tracks calls and order histories.

- **POC**: Store information of POCs of particular restaurant.

### Application Pages

- **Login Page**: Authenticate users and provide access to the dashboard.

- **Dashboard**: Central hub with navigation to features such as:

- Get All Leads

- Create New Lead

- Create New Interaction

- Create New POC

- Show Pending Calls

- Track Order Patterns

## Setup and Installation

### Prerequisites

- Node.js (v14 or above)

- MongoDB (v4.4 or above)

- React with Vite

### Steps to Run the Project

1.  **Clone the Repositories**

Clone both the frontend and backend repositories and create separate folders for each.

```bash

git clone https://github.com/kahtra5/Udaan-Frontend frontend

git clone https://github.com/kahtra5/Udaan-Backend backend

```

2.  **Install Backend Dependencies**

```bash

cd backend

npm install

```

3.  **Install Frontend Dependencies**

```bash

cd ../frontend

npm install

```

4.  **Set Up Environment Variables**

- Create a `.env` file in the backend folder.

- Add the following variables:

```env

MONGODB_URI='mongodb+srv://sarthakjain6260:CLKhKjm4MW3P1dMK@cluster0.fhywb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

```

5.  **Run the Backend Server**

```bash

cd backend

npm run start

```

6.  **Run the Frontend Server**

```bash

cd ../frontend

npm run build

npm start

```

7.  **Access the Application**

- Open your browser and navigate to the site shown in terminal.

- Alternatively, access the hosted version at [https://udaan-frontend1.onrender.com](https://udaan-frontend1.onrender.com).

- You can signup by creating a new Key Account Manager or Use the following dummy credentials to test the application:

- **Username**: `testuser`

- **Password**: `password123`

## Usage

- Login using your credentials.

- Use the dashboard navigation bar to:

- View and manage leads.

- Create new leads and interactions.

- Track order performance for specific restaurants.

- View pending calls for the day.

## Future Enhancements

- Add advanced analytics for order trends.

- Implement notifications for upcoming or missed calls.

- Support for exporting data to CSV or Excel.

## Contact

- **Name**: Sarthak Jain

- **College**: IIT Madras

- **Email**: sarthakjain6260\@gmail.com

- **Phone No.**: +91-6260801463

---

Thank you for using the Udaan Lead Management System!enter code here
