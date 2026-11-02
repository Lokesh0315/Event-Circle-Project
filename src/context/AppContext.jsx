import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS, INITIAL_BOOKINGS, CITIES } from '../data/mockEvents';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. User Auth State (OTP based)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eventcircle_user');
    return saved ? JSON.parse(saved) : null; // null or { phoneOrEmail, name, role: 'user'|'admin' }
  });

  // 2. Events List State
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('eventcircle_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  // 3. Bookings List State
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('eventcircle_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // 4. View Routing State ('explore' | 'event-detail' | 'my-bookings' | 'admin')
  const [currentView, setCurrentView] = useState('explore');
  const [selectedEventId, setSelectedEventId] = useState(null);

  // 5. Filters State
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'free' | 'paid'

  // 6. Modals & Notifications State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('eventcircle_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eventcircle_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('eventcircle_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventcircle_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Toast Helper
  const showToast = (message, type = 'info', code = null) => {
    setToast({ message, type, code });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Auth Operations (OTP validation without password)
  const loginWithOTP = (contactInput) => {
    const isEmail = contactInput.includes('@');
    const generatedName = isEmail 
      ? contactInput.split('@')[0].replace(/[^a-zA-Z]/g, ' ') 
      : `User ${contactInput.slice(-4)}`;
    
    const loggedUser = {
      id: `usr-${Date.now()}`,
      contact: contactInput,
      name: generatedName.charAt(0).toUpperCase() + generatedName.slice(1),
      role: contactInput.toLowerCase().includes('admin') ? 'admin' : 'user',
      loggedInAt: new Date().toISOString()
    };
    setUser(loggedUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${loggedUser.name}! Logged in successfully.`, 'success');
  };

  const logout = () => {
    setUser(null);
    setCurrentView('explore');
    showToast('Logged out of EventCircle.', 'info');
  };

  // View Navigation Helpers
  const navigateToEvent = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentView('event-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create Event (Admin)
  const addEvent = (newEventData) => {
    const createdEvent = {
      ...newEventData,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
      rating: 5.0,
      reviewsCount: 1,
      priceType: Number(newEventData.price) === 0 ? 'free' : 'paid',
      organizer: {
        name: user?.name || "Event Circle Host",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        verified: true
      }
    };

    setEvents(prev => [createdEvent, ...prev]);
    setIsCreateEventOpen(false);
    showToast(`Event "${createdEvent.title}" published successfully!`, 'success');
  };

  // Delete Event (Admin)
  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    showToast('Event removed successfully.', 'info');
  };

  // Book Ticket Operation
  const bookTicket = (eventObj, ticketObj, quantity = 1, attendeeContact) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return false;
    }

    const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      id: bookingId,
      eventId: eventObj.id,
      eventTitle: eventObj.title,
      eventDate: eventObj.date,
      eventTime: eventObj.time,
      locationName: eventObj.locationName,
      address: eventObj.address,
      ticketName: ticketObj.name,
      ticketPrice: ticketObj.price,
      quantity,
      totalPrice: ticketObj.price * quantity,
      bookingDate: new Date().toISOString(),
      userName: user.name,
      userContact: attendeeContact || user.contact,
      status: "Confirmed",
      qrCodeValue: `EVENTCIRCLE-${bookingId}-${eventObj.id}-${user.name.toUpperCase().replace(/\s+/g, '')}`,
      checkedIn: false
    };

    // Update Bookings List
    setBookings(prev => [newBooking, ...prev]);

    // Update Registered Count in Event
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventObj.id) {
        return {
          ...evt,
          registeredCount: evt.registeredCount + quantity
        };
      }
      return evt;
    }));

    showToast(`Registration Confirmed! Ticket Reference: ${bookingId}`, 'success');
    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    if (!targetBooking) return;

    // Reduce registration count
    setEvents(prev => prev.map(evt => {
      if (evt.id === targetBooking.eventId) {
        return {
          ...evt,
          registeredCount: Math.max(0, evt.registeredCount - targetBooking.quantity)
        };
      }
      return evt;
    }));

    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast(`Booking ${bookingId} cancelled.`, 'info');
  };

  // Admin Check-in Attendee at Venue
  const checkInAttendee = (bookingId) => {
    const bookingIndex = bookings.findIndex(b => b.id.toLowerCase() === bookingId.toLowerCase() || b.qrCodeValue.toLowerCase() === bookingId.toLowerCase());
    
    if (bookingIndex === -1) {
      showToast('Invalid Ticket Code or Booking ID not found.', 'error');
      return false;
    }

    const updated = [...bookings];
    if (updated[bookingIndex].checkedIn) {
      showToast(`Already Checked In! ${updated[bookingIndex].userName} was checked in earlier.`, 'warning');
      return false;
    }

    updated[bookingIndex].checkedIn = true;
    updated[bookingIndex].checkedInTime = new Date().toLocaleTimeString();
    setBookings(updated);
    showToast(`SUCCESS: ${updated[bookingIndex].userName} checked in for ${updated[bookingIndex].eventTitle}!`, 'success');
    return true;
  };

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];
  const userBookings = bookings.filter(b => user && (b.userContact === user.contact || b.userName === user.name));

  return (
    <AppContext.Provider
      value={{
        user,
        events,
        bookings,
        currentView,
        selectedEvent,
        selectedEventId,
        selectedCity,
        setSelectedCity,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        priceFilter,
        setPriceFilter,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCreateEventOpen,
        setIsCreateEventOpen,
        toast,
        showToast,
        loginWithOTP,
        logout,
        navigateToEvent,
        navigateTo,
        addEvent,
        deleteEvent,
        bookTicket,
        cancelBooking,
        checkInAttendee,
        userBookings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
