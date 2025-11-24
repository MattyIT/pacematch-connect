import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const Settings = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [username, setUsername] = useState("JohnDoe");
  const [email] = useState("john.doe@example.com");

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
    toast.success(isVisible ? "You're now invisible on the map" : "You're now visible on the map");
  };

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5">
      {/* Header */}
      <div className="bg-card shadow-elevation-1 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/map")}
            className="touch-target p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowBackIcon style={{ fontSize: 24 }} />
          </button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-6 pb-8">
        {/* Visibility Toggle - Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 shadow-elevation-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${isVisible ? "bg-success/10" : "bg-muted"}`}>
                  {isVisible ? (
                    <VisibilityIcon className="text-success" style={{ fontSize: 28 }} />
                  ) : (
                    <VisibilityOffIcon className="text-muted-foreground" style={{ fontSize: 28 }} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Show my location on map</h3>
                  <p className="text-sm text-muted-foreground">
                    {isVisible ? "Other users can see you" : "You're invisible to others"}
                  </p>
                </div>
              </div>
              <Switch checked={isVisible} onCheckedChange={handleVisibilityToggle} />
            </div>
          </Card>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-bold">Profile</h2>

            {/* Profile Photo */}
            <div className="flex items-center gap-4">
              <Avatar
                src="https://i.pravatar.cc/150?img=5"
                alt="Profile"
                sx={{ width: 80, height: 80 }}
              />
              <Button variant="outline">Change Photo</Button>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2 h-12 px-4 bg-muted rounded-lg">
                <EmailIcon className="text-muted-foreground" style={{ fontSize: 20 }} />
                <span className="text-sm text-muted-foreground">{email}</span>
              </div>
            </div>

            <Button onClick={handleSaveProfile} className="w-full h-12">
              Save Changes
            </Button>
          </Card>
        </motion.div>

        {/* Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Activity</h2>

            <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
              <div className="flex items-center gap-3">
                <DirectionsRunIcon className="text-success" style={{ fontSize: 28 }} />
                <div>
                  <p className="font-semibold">Running</p>
                  <p className="text-sm text-muted-foreground">Current activity</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </Card>
        </motion.div>

        {/* Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Privacy & Data</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition-colors cursor-pointer">
                <span className="text-sm">Location sharing</span>
                <span className="text-sm text-muted-foreground">On</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition-colors cursor-pointer">
                <span className="text-sm">Data usage</span>
                <span className="text-sm text-muted-foreground">Learn more</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition-colors cursor-pointer">
                <span className="text-sm">Privacy policy</span>
                <span className="text-sm text-muted-foreground">View</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Account</h2>

            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="w-full h-12"
            >
              <LogoutIcon className="mr-2" style={{ fontSize: 20 }} />
              Sign Out
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
