import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleIcon from "@mui/icons-material/People";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SettingsIcon from "@mui/icons-material/Settings";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { Drawer } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { toast } from "sonner";

const MapScreen = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const [showPeopleDrawer, setShowPeopleDrawer] = useState(false);
  const [pointsTracked, setPointsTracked] = useState(0);

  // Mock data for nearby users
  const nearbyUsers = [
    { id: 1, name: "Sarah Johnson", distance: "0.3 km", activity: "Running", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Mike Chen", distance: "0.5 km", activity: "Cycling", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Emma Davis", distance: "0.8 km", activity: "Walking", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  const handleStartStop = () => {
    if (!isActive) {
      toast.success("Activity started! GPS tracking enabled.");
      setIsActive(true);
    } else {
      toast.success("Activity stopped. Great workout!");
      setIsActive(false);
      setPointsTracked(0);
    }
  };

  const handleToggle3D = () => {
    setIs3DMode(!is3DMode);
    toast.info(is3DMode ? "Switched to 2D view" : "Switched to 3D view");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-muted">
      {/* Map Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-success/10 to-warning/20">
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4 p-8 bg-card/90 backdrop-blur-sm rounded-2xl shadow-elevation-3">
            <ExploreIcon className="text-primary mx-auto" style={{ fontSize: 64 }} />
            <h2 className="text-2xl font-bold">Map View</h2>
            <p className="text-muted-foreground max-w-xs">
              Google Maps integration will display here. This shows your location, nearby users, and activity trails.
            </p>
          </div>
        </div>
      </div>

      {/* Top Bar - Right Side Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
        {/* 3D View Toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle3D}
          className={`
            touch-target rounded-full shadow-elevation-3 transition-all duration-300
            ${is3DMode ? "bg-purple text-purple-foreground" : "bg-primary text-primary-foreground"}
          `}
          style={{ width: 56, height: 56 }}
        >
          <ThreeDRotationIcon style={{ fontSize: 28 }} />
        </motion.button>

        {/* Compass/Reset (3D mode only) */}
        <AnimatePresence>
          {is3DMode && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.95 }}
              className="touch-target bg-warning text-warning-foreground rounded-full shadow-elevation-3"
              style={{ width: 56, height: 56 }}
            >
              <ExploreIcon style={{ fontSize: 28 }} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* People List */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPeopleDrawer(true)}
          className="relative touch-target bg-primary text-primary-foreground rounded-full shadow-elevation-3"
          style={{ width: 56, height: 56 }}
        >
          <PeopleIcon style={{ fontSize: 28 }} />
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {nearbyUsers.length}
          </span>
        </motion.button>

        {/* My Location */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="touch-target bg-card text-primary rounded-full shadow-elevation-3 border-2 border-primary"
          style={{ width: 56, height: 56 }}
        >
          <MyLocationIcon style={{ fontSize: 28 }} />
        </motion.button>

        {/* Settings */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/settings")}
          className="touch-target bg-card text-foreground rounded-full shadow-elevation-3"
          style={{ width: 56, height: 56 }}
        >
          <SettingsIcon style={{ fontSize: 28 }} />
        </motion.button>
      </div>

      {/* Activity Badge (Top Left) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-4 left-4 bg-success text-success-foreground px-4 py-3 rounded-full shadow-elevation-3 flex items-center gap-2 z-10"
          >
            <DirectionsRunIcon className="animate-pulse-slow" style={{ fontSize: 24 }} />
            <div className="flex flex-col">
              <span className="text-xs font-bold">Activity Active</span>
              <span className="text-xs opacity-90">{pointsTracked} points tracked</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        {/* 3D Controls (3D mode only) */}
        <AnimatePresence>
          {is3DMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-4 bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-elevation-3"
            >
              <p className="text-sm font-medium mb-2">3D Controls</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Tilt ↕</Button>
                <Button variant="outline" size="sm">Rotate ↺</Button>
                <Button variant="outline" size="sm">Reset</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start/Stop Activity Button */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleStartStop}
            className={`
              w-full h-16 text-lg font-bold shadow-elevation-4 transition-all duration-300
              ${
                isActive
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-success text-success-foreground hover:bg-success/90"
              }
            `}
          >
            {isActive ? (
              <>
                <StopIcon className="mr-2" style={{ fontSize: 28 }} />
                Stop Activity
              </>
            ) : (
              <>
                <PlayArrowIcon className="mr-2" style={{ fontSize: 28 }} />
                Start Activity
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* People Drawer */}
      <Drawer
        anchor="bottom"
        open={showPeopleDrawer}
        onClose={() => setShowPeopleDrawer(false)}
        PaperProps={{
          style: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "70vh",
          },
        }}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Nearby People</h2>
            <button
              onClick={() => setShowPeopleDrawer(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            {nearbyUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300"
              >
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 56, height: 56 }} />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.distance} away • {user.activity}</p>
                </div>
                <Button variant="outline" size="sm">
                  <MyLocationIcon style={{ fontSize: 20 }} className="mr-1" />
                  Center
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MapScreen;
