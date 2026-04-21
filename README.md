# 📘 College Appointment Booking System (Backend)

A backend system that enables students to book appointments with professors based on their availability. The system ensures secure authentication, role-based access control, prevents double booking, and maintains data consistency.

---

# 🎥 Demo Videos

- 📌 Code Overview Video: [See Code Overview](https://drive.google.com/file/d/1izZZTOFzyt1FD9BJzQT2iezCMpcTVRVk/view?usp=sharing) 
- 📌 Postman Workflow Demo: [SeePostman Workflow Demo](https://drive.google.com/file/d/1XPv-leYlEbuzD2ZYrXFihHuNHN_oB90H/view?usp=sharing)  

# 🚀 Summary

This project implements a real-world appointment scheduling system where:

- 👨‍🎓 Students can view and book available slots
- 👨‍🏫 Professors can define availability and manage appointments
- 🔐 JWT-based authentication ensures secure access
- ⚙️ Role-based authorization restricts access to APIs
- 📅 Slot-based scheduling system supports multiple time slots
- ❌ Prevents double booking of slots
- 🔄 Maintains consistency during booking and cancellation

---

# 🛠️ Tech Stack

- Backend: Node.js, Express.js  
- Database: MongoDB Atlas  
- ODM: Mongoose  
- Authentication: JSON Web Tokens (JWT)  
- Security: bcrypt.js  
- Environment Variables: dotenv  
- API Testing: Postman  

---

# 🧱 Architecture

```
src/
 ├── config/         # Database connection
 ├── controllers/    # Business logic
 ├── models/         # Mongoose schemas
 ├── routes/         # API routes
 ├── middleware/     # Authentication & authorization
 └── app.js          # Application entry point
```

### Core Components

- **User Model:** Stores student/professor details and roles  
- **Availability Model:** Stores professor availability with multiple slots  
- **Appointment Model:** Links student and professor with booking details  

---

# 🔐 Authentication & Authorization

- JWT-based authentication system  
- Passwords securely hashed using bcrypt  
- Auth middleware verifies token and extracts user info  
- Role-based middleware restricts access:
  - Professors → add availability, cancel appointments  
  - Students → view slots, book appointments  

---

# 🔄 Workflow

1. User Registration  
   - Students and professors register with roles  

2. Login  
   - JWT token is generated for authentication  

3. Professor Adds Availability  
   - Defines date and multiple time slots  
   - Each slot contains startTime, endTime, and isBooked flag  

4. Student Views Slots  
   - Fetches only unbooked slots for a specific professor  

5. Booking Appointment  
   - Validates slot availability  
   - Marks slot as booked  
   - Creates appointment record  

6. Prevent Double Booking  
   - Already booked slot cannot be booked again  

7. Cancellation  
   - Professor cancels appointment  
   - Appointment status updated  
   - Slot becomes available again  

8. Student Appointment Check  
   - Only active (booked) appointments are shown  

---

# 📡 API Endpoints

## 🔐 Authentication
- POST /api/auth/register  
- POST /api/auth/login  

## 👨‍🏫 Professor
- POST /api/professor/availability  
- DELETE /api/professor/appointments/:appointmentId  

## 👨‍🎓 Student
- GET /api/student/availability/:professorId  
- POST /api/student/book  
- GET /api/student/my-appointments  

---

# 📊 Database Design

### Users
- name  
- email  
- password  
- role (student / professor)  

### Availability
- professorId  
- date  
- slots:
  - startTime  
  - endTime  
  - isBooked  

### Appointments
- studentId  
- professorId  
- date  
- startTime  
- endTime  
- status (booked / cancelled)  

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```
git clone [GitRepo](https://github.com/Suhail-8800/College-Appointment-System.git)
cd college-appointment-system
```

## 2. Install Dependencies

```
npm install
```

## 3. Setup Environment Variables

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## 4. Run Server

```
npm run dev
```

## 5. Test APIs

Use Postman to test all endpoints.

---

# 🧪 Sample Testing Flow

1. Register 2 students and 2 professors  
2. Login all users and store tokens  
3. Professor adds availability  
4. Student views available slots  
5. Student books a slot  
6. Another student books a different slot  
7. Professor cancels an appointment  
8. Student verifies no active appointments  

---

# 🧠 Key Highlights

- Prevents double booking  
- Maintains consistency across collections  
- Clean and modular architecture  
- Secure role-based API design  
- Handles real-world edge cases  

---

# 📌 Future Improvements

- Frontend integration (React)  
- Email notifications  
- Pagination & filtering  
- Timezone support  
- Admin dashboard  

---

# 👤 Author

Suhail Rajput  
GitHub: [See Github Profile](https://github.com/Suhail-8800)  
LinkedIn: [See LinkedIn](https://www.linkedin.com/in/suhail-rajput-64158722b/)
Portfolio: [See Portfolio](https://suhail-8800.github.io/suhail_rajput_portfolio)

---

# ⭐ Conclusion

This project demonstrates a complete backend system with authentication, scheduling, booking, and cancellation while maintaining data integrity and handling real-world scenarios effectively.