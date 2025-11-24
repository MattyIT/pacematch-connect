import { motion } from "framer-motion";
import { useNotificationContext } from "@/contexts/NotificationContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { toast } from "sonner";

export const NotificationTestButton = () => {
  const { addNotification } = useNotificationContext();

  const mockUsers = [
    { id: 1, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Mike Chen", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Emma Davis", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "James Wilson", avatar: "https://i.pravatar.cc/150?img=4" },
  ];

  const testMessages = [
    "Hi! Want to workout together?",
    "Great to see another runner nearby!",
    "Would you like to join me for a run?",
    "That sounds great! What time works?",
  ];

  const sendTestNotification = () => {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)];
    const types: ("message" | "friend_request" | "friend_accepted")[] = [
      "message",
      "friend_request", 
      "friend_accepted"
    ];
    const randomType = types[Math.floor(Math.random() * types.length)];

    addNotification({
      type: randomType,
      userId: randomUser.id,
      userName: randomUser.name,
      userAvatar: randomUser.avatar,
      message: randomType === "message" ? randomMessage : undefined,
    });

    toast.success("Test notification sent!");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={sendTestNotification}
      className="fixed bottom-24 left-4 z-20 touch-target bg-warning text-warning-foreground rounded-full shadow-elevation-4 border-2 border-warning-foreground/20"
      style={{ width: 56, height: 56 }}
      title="Send test notification"
    >
      <NotificationsIcon style={{ fontSize: 28 }} />
    </motion.button>
  );
};
