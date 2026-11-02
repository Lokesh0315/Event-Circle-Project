# EventCircle — Local Public Event Discovery & Registration Platform

**Tagline:** *"Discover. Connect. Experience."*  
**Hero Tagline:** *"Discover Events That Bring People Together"*

EventCircle is a full-featured, modern, responsive frontend-only React web application built with Vite, Tailwind CSS, and React Router DOM. It features passwordless OTP mobile login, interactive event discovery with category and price filters, digital event ticket passes, and an Admin Console for managing public events and attendee rosters.

---

## 🌟 Key Features

### 👤 User Capabilities
- **Landing Page**: Showcase hero section, popular category chips, featured events, how it works, and why EventCircle.
- **Passwordless OTP Login**: Enter mobile number, receive simulated 6-digit OTP (`123456`), and authenticate instantly without passwords.
- **Event Discovery & Filters**: Filter by category (Technology, Music, Sports, Food, Arts, Workshop, Business, Community), city location, price (Free/Paid), and sort by date, rating, or price.
- **Event Details & Schedule**: High-res images, organizer badges, available seats progress bar, venue map info, agenda breakdown, and similar event recommendations.
- **Interactive Registration**: Select ticket quantity, validate inputs, view pricing breakdown, and generate instant digital booking passes.
- **Digital Pass Wallet (My Events)**: Filter upcoming, past, and cancelled passes, view booking reference IDs (`EVT-2026-XXXX`), download passes, or cancel bookings.
- **Favorites & Notifications**: Bookmark events with heart icons, view read/unread notification logs, and mark all as read.
- **User Profile**: View and edit user details (Name, Email, Mobile Number).
- **Light & Dark Mode**: Persistent theme toggle in navbar affecting all pages, tables, cards, and modals.

### 🛡️ Admin Capabilities
- **Admin Console Login**: Demo credentials (`admin@eventcircle.com` / `admin123`).
- **Dashboard Metrics**: Total Events, Total Registrations, Gross Revenue, and Upcoming vs Completed counts.
- **Event Management**: Create new events, edit details, update seat capacities, or delete listings with `localStorage` persistence.
- **Registrations Roster**: View all attendee registrations, search by name or registration ID, and filter by status (Confirmed/Cancelled).

---

## 🛠️ Tech Stack

- **Framework:** React.js (v18+)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (with `class`-based dark mode)
- **Routing:** React Router DOM (v6)
- **Icons:** Lucide React (`lucide-react`)
- **State & Persistence:** React Context API + `localStorage`

---

## 📁 Project Structure

```
event-circle/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/
    ├── context/
    │   ├── AuthContext.jsx
    │   └── ThemeContext.jsx
    ├── data/
    │   └── mockData.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── EventCard.jsx
    │   ├── EventGrid.jsx
    │   ├── SearchBar.jsx
    │   ├── FilterBar.jsx
    │   ├── Modal.jsx
    │   ├── Toast.jsx
    │   ├── Loading.jsx
    │   ├── EmptyState.jsx
    │   ├── ThemeToggle.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── AdminSidebar.jsx
    │   └── StatsCard.jsx
    └── pages/
        ├── Landing.jsx
        ├── Login.jsx
        ├── OTPVerification.jsx
        ├── Home.jsx
        ├── EventDetails.jsx
        ├── RegisterEvent.jsx
        ├── BookingConfirmation.jsx
        ├── MyEvents.jsx
        ├── Favorites.jsx
        ├── Notifications.jsx
        ├── Profile.jsx
        ├── AdminLogin.jsx
        ├── AdminDashboard.jsx
        ├── AdminEvents.jsx
        └── AdminRegistrations.jsx
```

---

## 🔑 Demo Credentials

### 📱 User Passwordless OTP Login
- **Mobile Number:** `+91 98765 43210` (or any 10-digit number)
- **Demo OTP:** `123456`

### 🛡️ Admin Login
- **Email:** `admin@eventcircle.com`
- **Password:** `admin123`

---

## 🚀 How to Run the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```

3. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 🔮 Future Improvements

- Integration with real SMS OTP API gateways (Twilio / Firebase Auth).
- Payment gateway integration (Razorpay / Stripe) for paid ticket purchases.
- Native calendar sync (.ics file generation for Google Calendar / Apple iCal).
