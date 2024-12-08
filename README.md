# SoulScouts - Empowering Employee Wellness

## Overview

SoulScouts is a platform designed to foster mental and emotional well-being in the workplace. It enables companies to track and manage employee wellness while providing tools for HR, Coaches, Employees, and Admins to collaborate effectively. With a focus on ease of use and seamless functionality, SoulScouts ensures everyone can contribute to a healthier work environment.

Our platform features a robust authentication system, flexible user management, and insightful analytics, all built with a secure backend using MongoDB and JWT for session management.

---

## Features by User Type

### HR (Human Resources)

- **Signup:**
  - HR can create their account with essential details like name, email, company, and password.
  - HR is responsible for registering their company on the platform.

- **Login:**
  - HR users can log in with their credentials.

- **Dashboard:**
  - View company mood trends as graphs categorized by roles (e.g., engineering, sales, marketing).

- **Employee Management:**
  - Add new employees with a placeholder password.
  - Assign coaches to employees.
  - View employees as horizontal cards with filtering options by role.
  - Edit or delete employee details.
  - Notify employees of account creation via email with a default password and a link to the login page.

- **Settings:**
- Update profile details such as name, phone number, and password.
- Company and email fields are uneditable.

---

### Admin

- **Login:**
- Admin can log in with predefined credentials (`admin@soulscouts.com`).

- **Company Management:**
- Manage companies on the platform.

- **Coach Management:**
- Assign coaches to specific companies.
- View the list of coaches and companies assigned to them.
- Delete coaches if necessary.

- **Library Management:**
- View, add, edit, and delete resources in the resource library.

---

### Employee

- **Login:**
- Employees can log in using credentials they have registered with.

- **Dashboard:**
- Submit daily mood tracker surveys (physical, mental, work-life balance ratings).
- View weekly and monthly mood analytics as graphs.

- **Settings:**
- Update personal details such as name and phone number.
- Change password.

- **Resource Library:**
- View resources like videos and articles for mindfulness, relaxation, and focus.

- **Journal:**
- Add private journal entries with a title and content.
- View and delete previous entries.

---

### Coach

- **Login:**
- Coaches can log in using credentials shared by Admin.

- **Dashboard:**
- View trends and analytics for assigned employees.
- Filter analytics by employee.

- **Resource Library:**
- View resources for employees.

- **Settings:**
- Update profile details such as name and phone number.
- Change password.

---

## Key Features and Implementation Highlights

### Authentication and Session Management

- **JWT Token:**
- Sessions are secured with JWT, stored in the backend for validation.
- Token expiration is set for 15 minutes.
- Refresh functionality can be added in future iterations.
- Users are restricted to a single active session at a time, ensuring security.

- **Session Storage:**
- Each login session is stored with the user type, ID, and token.
- Expired tokens are automatically removed when a new session starts.

### Protected Routes

- All sensitive routes (e.g., `/employee/update`, `/coach/assign-company`) are protected and require a valid token for access.


### Dynamic Relationships

- Employees are linked to their respective companies and coaches using `MongoDB` references.
- Coaches are assigned to companies, enabling seamless data querying across collections.

---

## Technologies Used

- **Frontend:**
- React.js
- React Router
- Bootstrap
- Chart.js (for analytics and graph visualization)

- **Backend:**
- Node.js
- Express.js

- **Database:**
- MongoDB (NoSQL)

- **Authentication:**
- JWT for session management

- **Other Tools:**
- Postman for API testing

---

