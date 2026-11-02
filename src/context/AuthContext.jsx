import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS, INITIAL_REGISTRATIONS, INITIAL_NOTIFICATIONS, INITIAL_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Current User
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eventcircle_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Admin Session
  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = localStorage.getItem('eventcircle_admin');
    return saved === 'true';
  });

  // Events State
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('eventcircle_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  // Registrations State
  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('eventcircle_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  // Favorites State (array of event IDs)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('eventcircle_favorites');
    return saved ? JSON.parse(saved) : [1, 2];
  });

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('eventcircle_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Persistence Effects
  useEffect(() => {
    if (user) {
      localStorage.setItem('eventcircle_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eventcircle_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('eventcircle_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('eventcircle_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventcircle_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('eventcircle_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('eventcircle_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Auth Operations
  const verifyOTP = (phone, code) => {
    if (code === '123456' || code.length === 6) {
      const existingUser = INITIAL_USERS.find(u => u.phone === phone) || {
        id: Date.now(),
        name: `User ${phone.slice(-4)}`,
        phone: phone,
        email: `user_${phone.slice(-4)}@example.com`,
        role: 'user'
      };
      setUser(existingUser);
      showToast(`Welcome back, ${existingUser.name}!`, 'success');
      return true;
    }
    return false;
  };

  const loginAdmin = (email, password) => {
    if (email.toLowerCase() === 'admin@eventcircle.com' && password === 'admin123') {
      const adminUser = {
        id: 999,
        name: 'EventCircle Admin',
        email: 'admin@eventcircle.com',
        phone: '+91 90000 00000',
        role: 'admin'
      };
      setUser(adminUser);
      setIsAdmin(true);
      showToast('Logged in to Admin Dashboard.', 'success');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    showToast('Logged out successfully.', 'info');
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    const newProfile = { ...user, ...updatedData };
    setUser(newProfile);
    showToast('Profile updated successfully!', 'success');
  };

  // Favorite toggle
  const toggleFavorite = (eventId) => {
    setFavorites(prev => {
      const exists = prev.includes(eventId);
      const updated = exists ? prev.filter(id => id !== eventId) : [...prev, eventId];
      showToast(exists ? 'Removed from Favorites' : 'Added to Favorites', exists ? 'info' : 'success');
      return updated;
    });
  };

  // Event Registration
  const registerForEvent = (eventId, ticketsCount, name, email, phone) => {
    const targetEvent = events.find(e => e.id === Number(eventId));
    if (!targetEvent) return null;

    if (targetEvent.availableSeats < ticketsCount) {
      showToast('Not enough available seats!', 'error');
      return null;
    }

    const regId = `EVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = targetEvent.price * ticketsCount;

    const newReg = {
      id: regId,
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      userName: name || user?.name || "Guest Attendee",
      userEmail: email || user?.email || "guest@example.com",
      userPhone: phone || user?.phone || "+91 98765 43210",
      tickets: Number(ticketsCount),
      amount: totalAmount,
      bookingDate: new Date().toISOString().split('T')[0],
      status: "Confirmed"
    };

    // Update Registrations
    setRegistrations(prev => [newReg, ...prev]);

    // Decrease Seats
    setEvents(prev => prev.map(e => {
      if (e.id === Number(eventId)) {
        return {
          ...e,
          availableSeats: Math.max(0, e.availableSeats - Number(ticketsCount)),
          attendees: e.attendees + Number(ticketsCount)
        };
      }
      return e;
    }));

    // Add Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Registration Confirmed",
      message: `Your booking for "${targetEvent.title}" (${regId}) is confirmed!`,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Registration Confirmed! Reference: ${regId}`, 'success');
    return newReg;
  };

  // Cancel Registration
  const cancelRegistration = (registrationId) => {
    const targetReg = registrations.find(r => r.id === registrationId);
    if (!targetReg) return;

    // Restore seats
    setEvents(prev => prev.map(e => {
      if (e.id === targetReg.eventId) {
        return {
          ...e,
          availableSeats: e.availableSeats + targetReg.tickets,
          attendees: Math.max(0, e.attendees - targetReg.tickets)
        };
      }
      return e;
    }));

    // Update status
    setRegistrations(prev => prev.map(r => r.id === registrationId ? { ...r, status: 'Cancelled' } : r));
    showToast(`Booking ${registrationId} has been cancelled.`, 'info');
  };

  // Admin Event Management
  const addEvent = (eventData) => {
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    const created = {
      ...eventData,
      id: newId,
      availableSeats: Number(eventData.totalSeats),
      status: "Upcoming",
      rating: 5.0,
      attendees: 0,
      price: Number(eventData.price),
      totalSeats: Number(eventData.totalSeats)
    };
    setEvents(prev => [created, ...prev]);
    showToast(`Event "${created.title}" published successfully!`, 'success');
  };

  const editEvent = (eventId, updatedFields) => {
    setEvents(prev => prev.map(e => e.id === Number(eventId) ? { ...e, ...updatedFields } : e));
    showToast(`Event updated successfully!`, 'success');
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== Number(eventId)));
    showToast(`Event removed successfully.`, 'info');
  };

  // Notification Actions
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        events,
        registrations,
        favorites,
        notifications,
        toast,
        showToast,
        verifyOTP,
        loginAdmin,
        logout,
        updateProfile,
        toggleFavorite,
        registerForEvent,
        cancelRegistration,
        addEvent,
        editEvent,
        deleteEvent,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
