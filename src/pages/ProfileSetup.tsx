import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import Avatar from "@mui/material/Avatar";
import { toast } from "sonner";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [activity, setActivity] = useState<"running" | "cycling" | "walking">("running");
  const [gender, setGender] = useState("");

  const handleComplete = () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    // TODO: Save profile data
    toast.success("Profile created successfully!");
    navigate("/map");
  };

  const activities = [
    { id: "running", label: "Running", icon: DirectionsRunIcon, color: "success" },
    { id: "cycling", label: "Cycling", icon: DirectionsBikeIcon, color: "primary" },
    { id: "walking", label: "Walking", icon: DirectionsWalkIcon, color: "warning" },
  ];

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Complete Your Profile</h1>
          <p className="text-sm text-muted-foreground">Step 1 of 1</p>
        </div>

        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-center"
        >
          <Avatar
            sx={{ width: 96, height: 96 }}
            alt="Profile"
            src="https://via.placeholder.com/96"
          />
        </motion.div>

        {/* Username Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-2"
        >
          <Label htmlFor="username" className="text-base">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 text-base"
          />
        </motion.div>

        {/* Activity Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-3"
        >
          <Label className="text-base">Preferred Activity</Label>
          <div className="grid grid-cols-3 gap-3">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={() => setActivity(act.id as typeof activity)}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-300
                    ${
                      activity === act.id
                        ? `border-${act.color} bg-${act.color}/10`
                        : "border-border bg-card hover:bg-secondary"
                    }
                  `}
                >
                  <Icon
                    className={activity === act.id ? `text-${act.color}` : "text-muted-foreground"}
                    style={{ fontSize: 32 }}
                  />
                  <span className={`text-xs mt-2 font-medium ${activity === act.id ? `text-${act.color}` : "text-muted-foreground"}`}>
                    {act.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Gender Selection (Optional) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="space-y-3"
        >
          <Label className="text-base">Gender (Optional)</Label>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option}
                onClick={() => setGender(option)}
                className={`
                  p-3 rounded-lg border-2 text-sm font-medium transition-all duration-300
                  ${
                    gender === option
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground hover:bg-secondary"
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Complete Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Button
            onClick={handleComplete}
            className="w-full h-14 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300"
          >
            Complete Setup
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
