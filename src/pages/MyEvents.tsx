import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import HistoryIcon from "@mui/icons-material/History";
import ExploreIcon from "@mui/icons-material/Explore";
import { EventDetailModal } from "@/components/EventDetailModal";
import { toast } from "sonner";

type EventType = "running" | "cycling" | "walking";

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
  isPast?: boolean;
}

const MyEvents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);

  // Mock joined events data
  const joinedEvents: Event[] = [
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
      isPast: false,
    },
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
      isJoined: true,
      isPast: false,
    },
    {
      id: 7,
      title: "Weekend Cycling Tour",
      description: "Explore the city on two wheels with fellow cyclists!",
      type: "cycling",
      category: "user",
      date: "2024-03-16",
      time: "09:00 AM",
      location: "Brooklyn Bridge",
      distance: "2.3 km",
      distanceValue: 2.3,
      participants: 15,
      maxParticipants: 15,
      hostName: "Mike Chen",
      hostAvatar: "https://i.pravatar.cc/150?img=2",
      lat: 40.7061,
      lng: -73.9969,
      isJoined: true,
      isPast: true,
    },
    {
      id: 8,
      title: "Sunrise Walking Group",
      description: "Start your day with a peaceful walk and great company.",
      type: "walking",
      category: "user",
      date: "2024-03-10",
      time: "06:00 AM",
      location: "Riverside Park",
      distance: "0.8 km",
      distanceValue: 0.8,
      participants: 10,
      hostName: "Emma Davis",
      hostAvatar: "https://i.pravatar.cc/150?img=3",
      lat: 40.8018,
      lng: -73.9713,
      isJoined: true,
      isPast: true,
    },
    {
      id: 9,
      title: "Adidas Winter Challenge 2024",
      description: "Complete winter fitness challenge with amazing prizes!",
      type: "running",
      category: "sponsored",
      date: "2024-03-05",
      time: "08:00 AM",
      location: "Times Square",
      distance: "1.5 km",
      distanceValue: 1.5,
      participants: 300,
      maxParticipants: 300,
      sponsorLogo: "https://via.placeholder.com/100x100?text=Adidas",
      lat: 40.7580,
      lng: -73.9855,
      isJoined: true,
      isPast: true,
    },
  ];

  // Filter events by status
  const upcomingEvents = joinedEvents.filter((event) => !event.isPast);
  const pastEvents = joinedEvents.filter((event) => event.isPast);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  const handleLeaveEvent = (eventId: number) => {
    toast.success("You've left the event");
    // In real app, update backend and refresh data
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/80 backdrop-blur-md shadow-elevation-2 sticky top-0 z-20 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/events")}
              className="touch-target p-2 hover:bg-secondary rounded-xl transition-all duration-200"
            >
              <ArrowBackIcon style={{ fontSize: 28 }} />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold">My Events</h1>
              <p className="text-sm text-muted-foreground">
                {joinedEvents.length} event{joinedEvents.length !== 1 ? "s" : ""} joined
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/events")}
              className="hidden sm:flex h-10"
            >
              <ExploreIcon className="mr-2" style={{ fontSize: 20 }} />
              Explore Events
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto mb-6">
            <TabsTrigger
              value="upcoming"
              className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <UpcomingIcon className="mr-2" style={{ fontSize: 20 }} />
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <HistoryIcon className="mr-2" style={{ fontSize: 20 }} />
              Past ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-4">
            <AnimatePresence mode="wait">
              {upcomingEvents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-12 text-center shadow-elevation-2">
                    <UpcomingIcon
                      style={{ fontSize: 64 }}
                      className="text-muted-foreground/30 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">No Upcoming Events</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Join events to see them here
                    </p>
                    <Button onClick={() => navigate("/events")}>
                      <ExploreIcon className="mr-2" style={{ fontSize: 20 }} />
                      Explore Events
                    </Button>
                  </Card>
                </motion.div>
              ) : (
                upcomingEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onClick={() => handleEventClick(event)}
                    onLeave={() => handleLeaveEvent(event.id)}
                    getActivityIcon={getActivityIcon}
                    showLeaveButton
                  />
                ))
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past" className="space-y-4">
            <AnimatePresence mode="wait">
              {pastEvents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-12 text-center shadow-elevation-2">
                    <HistoryIcon
                      style={{ fontSize: 64 }}
                      className="text-muted-foreground/30 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">No Past Events</h3>
                    <p className="text-muted-foreground text-sm">
                      Your completed events will appear here
                    </p>
                  </Card>
                </motion.div>
              ) : (
                pastEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onClick={() => handleEventClick(event)}
                    onLeave={() => handleLeaveEvent(event.id)}
                    getActivityIcon={getActivityIcon}
                    isPast
                  />
                ))
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>

      {/* Event Detail Modal */}
      {showEventDetail && selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => {
            setShowEventDetail(false);
            setSelectedEvent(null);
          }}
          onJoin={handleLeaveEvent}
        />
      )}
    </div>
  );
};

// Event Card Component
interface EventCardProps {
  event: Event;
  index: number;
  onClick: () => void;
  onLeave: () => void;
  getActivityIcon: (type: EventType) => JSX.Element;
  showLeaveButton?: boolean;
  isPast?: boolean;
}

const EventCard = ({
  event,
  index,
  onClick,
  onLeave,
  getActivityIcon,
  showLeaveButton,
  isPast,
}: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card
        className={`overflow-hidden shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 border-2 border-border/50 hover:border-primary/30 ${
          isPast ? "opacity-75" : ""
        }`}
      >
        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {getActivityIcon(event.type)}
                <h3 className="font-bold text-lg truncate">{event.title}</h3>
                {isPast && (
                  <Badge variant="secondary" className="flex-shrink-0 bg-muted">
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
            </div>
            {event.category === "sponsored" && (
              <Badge
                variant="secondary"
                className="flex-shrink-0 bg-warning/10 text-warning border-warning/30"
              >
                <StarIcon style={{ fontSize: 14 }} className="mr-1" />
                Sponsored
              </Badge>
            )}
          </div>

          {/* Event Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <EventIcon style={{ fontSize: 18 }} />
              <span>
                {event.date} at {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <LocationOnIcon style={{ fontSize: 18 }} />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <PeopleIcon style={{ fontSize: 18 }} />
              <span>
                {event.participants}
                {event.maxParticipants ? ` / ${event.maxParticipants}` : ""} joined
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-success" style={{ fontSize: 20 }} />
              <span className="text-sm font-semibold text-success">
                {isPast ? "Event Completed" : "You're Joined"}
              </span>
            </div>
            {showLeaveButton && !isPast && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onLeave();
                }}
                variant="outline"
                size="sm"
                className="h-9"
              >
                Leave Event
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MyEvents;
