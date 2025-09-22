# Parcel Delivery Service

This is a Parcel Delivery Service web application with role-based dashboards for senders, receivers, and administrators. It provides functionalities such as parcel tracking, parcel delivery requests, user authentication, and role-based navigation.

## 📌 Technologies Used

### Frontend:
- **React** — A JavaScript library for building user interfaces
- **React Router** — For navigation and routing
- **Redux Toolkit & RTK Query** — For state management and data fetching
- **TypeScript** — A typed superset of JavaScript
- **Tailwind CSS** — A utility-first CSS framework for styling

### Backend:
- **Node.js & Express** — For building RESTful API
- **MongoDB & Mongoose** — For data modeling and storage
- **JWT & bcrypt** — For secure authentication and password hashing

## 📌 Minimum Functional Requirements

### 1️⃣ Public Landing Section
- **Home Page** — Landing page introducing the parcel delivery service.
- **About Page** — Service description, mission, and team information.
- **Contact Page** — Inquiry form for users to submit inquiries (simulated submission).

### 2️⃣ Authentication
- **Login Form** — JWT-based authentication.
- **Registration Form** — Users can register with role selection (Sender or Receiver).
- **Role-based Redirection** — After login, users are redirected based on their role.
- **Persisted Authentication State** — The app remains logged in after refresh.
- **Logout Functionality** — Users can log out from their sessions.

### 3️⃣ Sender Dashboard
- **Create Parcel Delivery Requests** — Senders can create new parcel delivery requests.
- **Cancel Parcel** — Senders can cancel parcels if they haven't been dispatched yet.
- **View Created Parcels** — Senders can view all their created parcels with their status logs.

### 4️⃣ Receiver Dashboard
- **View Incoming Parcels** — Receivers can view parcels assigned to them.
- **Confirm Parcel Delivery** — Receivers can confirm the delivery of parcels.
- **View Delivery History** — Receivers can view the history of deliveries.

### 5️⃣ Admin Dashboard
- **Manage Users** — Admins can block/unblock users.
- **Manage Parcels** — Admins can update parcel status, and block/unblock parcels.
- **Assign Delivery Personnel** — Admins can optionally assign delivery personnel to parcels.

### 6️⃣ Parcel Tracking
- **Unique Tracking ID** — Each parcel has a unique tracking ID.
- **Search by Tracking ID** — Public and authenticated users can search parcels by their tracking ID.
- **Parcel Details** — Parcel details include status logs (status, timestamp, updatedBy, note).

### 7️⃣ General Features
- **Role-based Navigation Menu** — Different navigation menus for senders, receivers, and admins.
- **Loading Indicators & Global Error Handling** — UI feedback on loading or error states.
- **Form Validations** — Ensure required fields, numeric checks, and positive amounts.
- **Advanced Filtering & Pagination** — Pagination for long lists and advanced filtering options.
- **Toast Notifications** — Show success or error messages with a toast notification package.
- **Dashboard & Data Visualization**:
    - **Overview Cards**: Display the total parcels, delivered parcels, parcels in transit, and pending/cancelled.
    - **Charts**: Visualize parcel trends, delivery status distribution, and monthly shipments using bar/pie charts.
    - **Parcel Table**: A searchable, filterable, and paginated table with actions (View, Cancel, Confirm).
    - **Status Timeline**: A visual history of parcel updates with timestamps and notes.
    - **Role-Specific Views**: Senders see their parcels, receivers see received parcels, and admins see all.
    - **Responsive Design**: Ensure a fully responsive design for a variety of devices.

### 8️⃣ UI/UX Considerations:
- **Fully Responsive Design**: Optimized for all screen sizes, from mobile to desktop.
- **Consistent Margins & Spacing**: Clear and balanced UI for a smooth experience.
- **Accessible Color Contrasts**: Ensure readability and visual appeal.
- **Performance Improvements**: Implement lazy loading or skeleton loaders for enhanced performance.
- **Real Data**: Use real or realistic data for a professional finish.

## 📌 Getting Started

### 1. Clone the Repository
```bash
git clone <repo-url>
cd parcel-delivery-service
