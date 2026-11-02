export const CITIES = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "London, UK",
  "Berlin, DE",
  "Tokyo, JP"
];

export const CATEGORIES = [
  { id: "all", label: "All Events", icon: "Sparkles" },
  { id: "tech", label: "Tech & AI", icon: "Cpu" },
  { id: "music", label: "Music & Concerts", icon: "Music" },
  { id: "food", label: "Food & Wine", icon: "Utensils" },
  { id: "wellness", label: "Wellness & Fitness", icon: "Heart" },
  { id: "art", label: "Art & Design", icon: "Palette" },
  { id: "business", label: "Networking", icon: "Briefcase" }
];

export const INITIAL_EVENTS = [
  {
    id: "evt-101",
    title: "AI Developers & Innovators Summit 2026",
    category: "tech",
    date: "2026-08-20",
    time: "10:00 AM - 05:00 PM",
    city: "San Francisco, CA",
    locationName: "Metreon Convention Center",
    address: "135 4th St, San Francisco, CA 94103",
    price: 49,
    priceType: "paid",
    capacity: 250,
    registeredCount: 184,
    rating: 4.9,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Silicon Valley Tech Circle",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true
    },
    description: "Join over 200+ top engineers, researchers, and AI founders for a hands-on summit featuring live LLM demo sessions, agent architecture keynotes, and high-impact networking.",
    tickets: [
      { id: "t-gen", name: "General Admission", price: 49, perks: ["Full Day Access", "Swag Bag", "Lunch & Coffee Pass"] },
      { id: "t-vip", name: "VIP Developer Pass", price: 129, perks: ["Priority Front Row", "Private VIP Lounge", "1-on-1 Speaker Session", "After-party Access"] }
    ],
    schedule: [
      { time: "10:00 AM", topic: "Opening Keynote: Autonomous AI Systems" },
      { time: "12:30 PM", topic: "Networking Lunch & Poster Sessions" },
      { time: "02:30 PM", topic: "Hands-on Workshop: Building Multi-Agent Apps" },
      { time: "04:30 PM", topic: "Panel: The Future of Open-Source Models" }
    ]
  },
  {
    id: "evt-102",
    title: "Sunset Jazz & Craft Wine Festival",
    category: "music",
    date: "2026-08-22",
    time: "06:00 PM - 10:00 PM",
    city: "San Francisco, CA",
    locationName: "Pier 27 Waterfront Park",
    address: "The Embarcadero, San Francisco, CA 94111",
    price: 25,
    priceType: "paid",
    capacity: 400,
    registeredCount: 310,
    rating: 4.8,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Bay Area Music Collective",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      verified: true
    },
    description: "Experience an enchanting summer evening of live smooth jazz quartets under the sunset, paired with organic artisan wines and local gourmet food trucks.",
    tickets: [
      { id: "t-gen", name: "Entry & Wine Tasting Glass", price: 25, perks: ["Event Entry", "Commemorative Glass", "3 Wine Tasting Vouchers"] },
      { id: "t-vip", name: "Reserved Seating & Gourmet Board", price: 65, perks: ["Front Stage Reserved Table", "Unlimited Tastings", "Artisan Cheese & Charcuterie Board"] }
    ],
    schedule: [
      { time: "06:00 PM", topic: "Gates Open & Sunset Wine Welcome" },
      { time: "07:00 PM", topic: "The Pacific Jazz Quartet Live Set" },
      { time: "08:45 PM", topic: "Soul & Sax Ensemble Jam" }
    ]
  },
  {
    id: "evt-103",
    title: "Community Rooftop Yoga & Sound Bath",
    category: "wellness",
    date: "2026-08-23",
    time: "08:30 AM - 10:30 AM",
    city: "San Francisco, CA",
    locationName: "Skyline Terrace Rooftop",
    address: "450 Sutter Street, San Francisco, CA 94108",
    price: 0,
    priceType: "free",
    capacity: 80,
    registeredCount: 76,
    rating: 5.0,
    reviewsCount: 34,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Mindful City Initiative",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      verified: true
    },
    description: "Recharge your mind and body with a gentle morning vinyasa flow guided by master instructors, followed by a deeply relaxing Tibetan singing bowl sound bath session.",
    tickets: [
      { id: "t-free", name: "Free Community Pass", price: 0, perks: ["Rooftop Yoga Session", "Complimentary Fresh Cold-Pressed Juice", "Yoga Mat Rental Included"] }
    ],
    schedule: [
      { time: "08:30 AM", topic: "Arrival & Mat Setup" },
      { time: "09:00 AM", topic: "60-Min Sunrise Vinyasa Flow" },
      { time: "10:00 AM", topic: "30-Min Tibetan Sound Bath & Meditation" }
    ]
  },
  {
    id: "evt-104",
    title: "Global Street Food & Night Market",
    category: "food",
    date: "2026-08-28",
    time: "05:00 PM - 11:00 PM",
    city: "San Francisco, CA",
    locationName: "Fort Mason Center",
    address: "2 2nd St, San Francisco, CA 94123",
    price: 0,
    priceType: "free",
    capacity: 600,
    registeredCount: 420,
    rating: 4.7,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Street Bites SF",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      verified: true
    },
    description: "Explore 40+ authentic street food vendors representing flavors from East Asia, Latin America, Europe, and the Middle East alongside live DJ sets and artisan crafts.",
    tickets: [
      { id: "t-gen", name: "Free General Entry Pass", price: 0, perks: ["Access to Night Market & DJ Stage", "Express Line Entry"] }
    ],
    schedule: [
      { time: "05:00 PM", topic: "Market Gates Open" },
      { time: "07:00 PM", topic: "Live Chef Cooking Demonstration" },
      { time: "09:00 PM", topic: "Neon Night DJ Performance" }
    ]
  },
  {
    id: "evt-105",
    title: "Modern Interactive Digital Art Expo",
    category: "art",
    date: "2026-09-02",
    time: "11:00 AM - 07:00 PM",
    city: "San Francisco, CA",
    locationName: "Palace of Fine Arts Gallery",
    address: "3301 Lyon St, San Francisco, CA 94123",
    price: 18,
    priceType: "paid",
    capacity: 300,
    registeredCount: 145,
    rating: 4.9,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Lumina Digital Arts",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      verified: true
    },
    description: "Step into immersive projection tunnels, generative AI canvas installations, and interactive VR light sculptures created by visionary international digital artists.",
    tickets: [
      { id: "t-gen", name: "Standard Entry Ticket", price: 18, perks: ["Full Exhibition Access", "Interactive Sensor Glove Rental"] },
      { id: "t-vip", name: "Artist Q&A + Fast Track", price: 35, perks: ["Skip the Line", "Meet-the-Artists Panel Pass", "Digital NFT Collectible"] }
    ],
    schedule: [
      { time: "11:00 AM", topic: "Gallery Open for General Walkthrough" },
      { time: "02:00 PM", topic: "Generative Art Live Coding Session" },
      { time: "05:00 PM", topic: "Artist Talk: Algorithmic Aesthetics" }
    ]
  },
  {
    id: "evt-106",
    title: "Founders & Angel Investors Mixer",
    category: "business",
    date: "2026-09-05",
    time: "06:30 PM - 09:30 PM",
    city: "San Francisco, CA",
    locationName: "The Canopy Lounge",
    address: "595 Pacific Ave, San Francisco, CA 94133",
    price: 35,
    priceType: "paid",
    capacity: 120,
    registeredCount: 98,
    rating: 4.8,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "SF Founders Club",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      verified: true
    },
    description: "An exclusive, high-caliber evening for seed and Series-A startup founders to network directly with active angel investors, venture partners, and strategic advisors.",
    tickets: [
      { id: "t-gen", name: "Founder / Investor Admission", price: 35, perks: ["Craft Cocktails & Canapés", "Digital Attendee Roster Access", "Elevator Pitch Mic Session"] }
    ],
    schedule: [
      { time: "06:30 PM", topic: "Welcome Drinks & Speed Networking" },
      { time: "07:45 PM", topic: "60-Second Lightning Pitches" },
      { time: "08:30 PM", topic: "Open Lounge Discussions" }
    ]
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "BK-89210",
    eventId: "evt-101",
    eventTitle: "AI Developers & Innovators Summit 2026",
    ticketName: "General Admission",
    ticketPrice: 49,
    quantity: 1,
    totalPrice: 49,
    bookingDate: "2026-08-05T14:30:00Z",
    userName: "Alex Morgan",
    userPhone: "+1 (555) 392-1084",
    userEmail: "alex.morgan@tech.io",
    status: "Confirmed",
    qrCodeValue: "EVENTCIRCLE-BK-89210-EVT-101-ALEX",
    checkedIn: false
  }
];
