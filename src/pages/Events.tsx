import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { EventDetailModal } from "@/components/EventDetailModal";
import { CreateEventModal } from "@/components/CreateEventModal";
import BottomNavigation from "@/components/BottomNavigation";

type EventType = "running" | "cycling" | "walking";
type EventCategory = "all" | "user" | "sponsored";

interface Event {
  id: number;
  title: string;
  description: string;
  type: EventType;
  category: "user" | "sponsored";
  date: string;
  time: string;
  location: string;
  distance: string;
  distanceValue: number;
  participants: number;
  maxParticipants?: number;
  hostName?: string;
  hostAvatar?: string;
  sponsorLogo?: string;
  lat: number;
  lng: number;
  isJoined?: boolean;
}

const Events = () => {
  const navigate = useNavigate();
  const [activityFilter, setActivityFilter] = useState<EventType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<EventCategory>("all");
  const [distanceFilter, setDistanceFilter] = useState<"all" | "near" | "far">("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week">("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock events data
  const events: Event[] = [
    {
      id: 1,
      title: "Morning Run in Central Park",
      description: "Join us for a refreshing morning run! All levels welcome.",
      type: "running",
      category: "user",
      date: "2024-03-25",
      time: "07:00 AM",
      location: "Central Park, NY",
      distance: "0.5 km",
      distanceValue: 0.5,
      participants: 12,
      maxParticipants: 20,
      hostName: "Sarah Johnson",
      hostAvatar: "https://i.pravatar.cc/150?img=1",
      lat: 40.7829,
      lng: -73.9654,
      isJoined: false,
    },
    {
      id: 2,
      title: "Nike City Marathon 2024",
      description: "Annual city marathon sponsored by Nike. Register now!",
      type: "running",
      category: "sponsored",
      date: "2024-04-15",
      time: "06:00 AM",
      location: "City Center",
      distance: "1.2 km",
      distanceValue: 1.2,
      participants: 450,
      maxParticipants: 500,
      sponsorLogo: "https://via.placeholder.com/100x100?text=Nike",
      lat: 40.7580,
      lng: -73.9855,
      isJoined: true,
    },
    {
      id: 3,
      title: "Weekend Cycling Tour",
      description: "Explore the city on two wheels with fellow cyclists!",
      type: "cycling",
      category: "user",
      date: "2024-03-23",
      time: "09:00 AM",
      location: "Brooklyn Bridge",
      distance: "2.3 km",
      distanceValue: 2.3,
      participants: 8,
      maxParticipants: 15,
      hostName: "Mike Chen",
      hostAvatar: "https://i.pravatar.cc/150?img=2",
      lat: 40.7061,
      lng: -73.9969,
      isJoined: false,
    },
    {
      id: 4,
      title: "Wellness Walking Group",
      description: "A relaxing walk through scenic paths. Bring your friends!",
      type: "walking",
      category: "user",
      date: "2024-03-22",
      time: "05:00 PM",
      location: "Riverside Park",
      distance: "0.8 km",
      distanceValue: 0.8,
      participants: 15,
      hostName: "Emma Davis",
      hostAvatar: "https://i.pravatar.cc/150?img=3",
      lat: 40.8018,
      lng: -73.9713,
      isJoined: false,
    },
    {
      id: 5,
      title: "Adidas Urban Challenge",
      description: "Test your limits in this urban fitness challenge!",
      type: "running",
      category: "sponsored",
      date: "2024-04-01",
      time: "08:00 AM",
      location: "Times Square",
      distance: "1.5 km",
      distanceValue: 1.5,
      participants: 280,
      maxParticipants: 300,
      sponsorLogo: "https://via.placeholder.com/100x100?text=Adidas",
      lat: 40.7580,
      lng: -73.9855,
      isJoined: false,
    },
  ];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesActivity = activityFilter === "all" || event.type === activityFilter;
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    return matchesActivity && matchesCategory;
  });

  // Sort by distance
  const sortedEvents = [...filteredEvents].sort((a, b) => a.distanceValue - b.distanceValue);

  const handleJoinEvent = (eventId: number) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      event.isJoined = !event.isJoined;
      toast.success(event.isJoined ? `You've joined "${event.title}"!` : `You've left "${event.title}"`);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  const handleCreateEvent = (eventData: any) => {
    // In real implementation, this would save to backend
    console.log("Creating event:", eventData);
    
    // Create a new event object
    const newEvent: Event = {
      id: events.length + 1,
      title: eventData.title,
      description: eventData.description,
      type: eventData.activityType,
      category: "user",
      date: new Date(eventData.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }),
      time: eventData.time,
      location: eventData.location,
      distance: "0.0 km",
      distanceValue: 0,
      participants: 1,
      maxParticipants: eventData.maxParticipants,
      hostName: "You",
      hostAvatar: "https://i.pravatar.cc/150?img=10",
      lat: 40.7829,
      lng: -73.9654,
      isJoined: true,
    };

    // Add to events (in real app, would update state from backend response)
    events.unshift(newEvent);
    toast.success("Event created successfully!");
  };

  const getActivityIcon = (type: EventType) => {
    switch (type) {
      case "running":
        return <DirectionsRunIcon className="text-success" style={{ fontSize: 20 }} />;
      case "cycling":
        return <DirectionsBikeIcon className="text-primary" style={{ fontSize: 20 }} />;
      case "walking":
        return <DirectionsWalkIcon className="text-warning" style={{ fontSize: 20 }} />;
    }
  };

  const getActivityColor = (type: EventType) => {
    switch (type) {
      case "running":
        return "success";
      case "cycling":
        return "primary";
      case "walking":
        return "warning";
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-success/20">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-73.9712,40.7831,11/1200x800?access_token=pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTBkZ2N6OHgwM2JrMmxzYzgzcXAxcHRoIn0.0')] bg-cover bg-center blur-sm"></div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="relative z-30 p-4 space-y-3">
        {/* Location & Battery */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-foreground/80">
            <LocationOnIcon style={{ fontSize: 20 }} />
            <span className="font-medium">Nearby Events</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/my-events")}
            className="text-foreground/80"
          >
            <BookmarkIcon style={{ fontSize: 20 }} />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 bg-card/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-elevation-2 border border-border/50">
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <DirectionsRunIcon className="text-warning" style={{ fontSize: 24 }} />
              <KeyboardArrowDownIcon style={{ fontSize: 20 }} />
            </Button>
            <Input
              placeholder="Search locations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-base"
            />
          </div>
          <Button
            variant="ghost"
            className="bg-card/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-elevation-2 border border-border/50"
          >
            Saved
          </Button>
        </div>

        {/* Horizontal Scrolling Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivityFilter(activityFilter === "all" ? "running" : "all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
              activityFilter !== "all"
                ? "bg-warning text-warning-foreground shadow-elevation-2 border-warning"
                : "bg-card/80 backdrop-blur-sm border-border/50 text-foreground"
            }`}
          >
            Activity
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDistanceFilter(distanceFilter === "all" ? "near" : "all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
              distanceFilter !== "all"
                ? "bg-warning text-warning-foreground shadow-elevation-2 border-warning"
                : "bg-card/80 backdrop-blur-sm border-border/50 text-foreground"
            }`}
          >
            Distance
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDateFilter(dateFilter === "all" ? "today" : "all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
              dateFilter !== "all"
                ? "bg-warning text-warning-foreground shadow-elevation-2 border-warning"
                : "bg-card/80 backdrop-blur-sm border-border/50 text-foreground"
            }`}
          >
            Date
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategoryFilter(categoryFilter === "all" ? "sponsored" : "all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
              categoryFilter !== "all"
                ? "bg-warning text-warning-foreground shadow-elevation-2 border-warning"
                : "bg-card/80 backdrop-blur-sm border-border/50 text-foreground"
            }`}
          >
            Category
          </motion.button>
        </div>
      </div>

      {/* Floating Create Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="fixed bottom-32 right-6 z-40"
      >
        <Button
          onClick={() => setShowCreateEvent(true)}
          className="bg-card/95 backdrop-blur-md text-foreground hover:bg-card shadow-elevation-4 rounded-2xl px-6 py-6 border border-border/50"
        >
          <EditIcon className="mr-2" style={{ fontSize: 20 }} />
          <span className="font-semibold">Create Event</span>
        </Button>
      </motion.div>

      {/* Bottom Drawer */}
      <motion.div
        initial={{ y: "60%" }}
        animate={{ y: "0%" }}
        transition={{ delay: 0.2, type: "spring", damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-b from-card/95 to-card backdrop-blur-xl rounded-t-3xl shadow-elevation-4 border-t border-border/50 pb-20"
      >
        {/* Drawer Handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full"></div>
        </div>

        {/* Drawer Content */}
        <div className="px-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Title Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Discover Events</h2>
            <p className="text-muted-foreground text-sm">
              {sortedEvents.length} event{sortedEvents.length !== 1 ? "s" : ""} near you
            </p>
          </div>

          {/* Events List */}
          {sortedEvents.length === 0 ? (
            <Card className="p-8 text-center bg-muted/30">
              <EventIcon style={{ fontSize: 48 }} className="text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="text-base font-semibold mb-1">No events found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your filters
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {sortedEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  onJoin={handleJoinEvent}
                  onClick={() => handleEventClick(event)}
                  getActivityIcon={getActivityIcon}
                  getActivityColor={getActivityColor}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showEventDetail && selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={() => setShowEventDetail(false)}
            onJoin={handleJoinEvent}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateEvent && (
          <CreateEventModal
            onClose={() => setShowCreateEvent(false)}
            onCreateEvent={handleCreateEvent}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

// Event Card Component
interface EventCardProps {
  event: Event;
  index: number;
  onJoin: (id: number) => void;
  onClick: () => void;
  getActivityIcon: (type: EventType) => JSX.Element;
  getActivityColor: (type: EventType) => string;
}

const EventCard = ({ event, index, onJoin, onClick, getActivityIcon, getActivityColor }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden hover:shadow-elevation-2 transition-all duration-200 border border-border/50 hover:border-primary/50 bg-card/80 backdrop-blur-sm">
        <div className="flex gap-3 p-3">
          {/* Event Image Placeholder */}
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-success/20 flex-shrink-0 flex items-center justify-center">
            {getActivityIcon(event.type)}
          </div>

          {/* Event Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="font-bold text-base line-clamp-1">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant="outline" 
                className="text-xs border-warning/50 text-warning bg-warning/10"
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {event.distance} · {event.participants} going
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <LocationOnIcon style={{ fontSize: 14 }} />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Join Button */}
          <div className="flex items-center">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onJoin(event.id);
              }}
              className={`${
                event.isJoined
                  ? "bg-success/20 text-success border border-success/50 hover:bg-success/30"
                  : "bg-warning text-warning-foreground hover:bg-warning/90"
              }`}
              variant={event.isJoined ? "outline" : "default"}
            >
              {event.isJoined ? "✓" : "Join"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Events;
