🩸 BloodConnect – Blood Donation Application

# Live Links

Frontend: Live Site Link..
Backend: Server Link..

# Project Overview

BloodConnect is a MERN stack based blood donation platform designed to connect blood donors with patients who urgently need blood.

The main goal of this project is to make blood donation easier and faster by creating a platform where donors can register, search for blood requests, and respond quickly during emergencies.

This project also includes role-based access for Donors, Volunteers, and Admins to manage the entire system efficiently.


# Main Features

# User Authentication

Secure registration and login using Firebase Authentication
Protected routes for private pages
Firebase token verification for secured APIs

# Donor Features

Create donor profile with blood group and location
Search donors by blood group, district, and upazila
Create blood donation requests
Manage personal donation requests
Update profile information

# Admin Features

View all users
Block and unblock users
Change user roles (Donor → Volunteer/Admin)
Manage all donation requests
View dashboard statistics including:
Total donors
Total blood requests
Total funding

# Volunteer Features

View all blood donation requests
Update request status

# Donation Request Management

Create requests
Edit requests
Delete requests
Update request status:
Pending
In Progress
Done
Canceled

# Funding System

Stripe payment integration
Users can donate funds
Funding history tracking

# Extra Features

Responsive design for mobile, tablet, and desktop
Pagination and filtering
Interactive dashboard charts using Recharts


# Technologies Used

Frontend

React
React Router
Tailwind CSS
DaisyUI
Axios
TanStack Query
Recharts
SweetAlert2
React Icons

Backend

Node.js
Express.js
MongoDB
Firebase Admin SDK

# NPM Packages Used

Client Side

react
react-router
axios
@tanstack/react-query
recharts
sweetalert2
react-icons
tailwindcss
daisyui

Server Side

express
cors
dotenv
mongodb
firebase-admin
stripe
