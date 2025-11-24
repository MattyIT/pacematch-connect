import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-In
    // For now, navigate to profile setup
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo and branding */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-primary rounded-full p-6 shadow-elevation-3">
              <DirectionsRunIcon className="text-primary-foreground" style={{ fontSize: 48 }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-foreground">PaceMatch</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Connect with active people nearby
            </p>
          </motion.div>
        </div>

        {/* Sign-in button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={handleGoogleSignIn}
            className="w-full h-14 text-base font-medium shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 bg-white text-foreground border-2 border-border hover:bg-secondary"
          >
            <GoogleIcon className="mr-3" style={{ fontSize: 24 }} />
            Sign in with Google
          </Button>

          <p className="text-xs text-center text-muted-foreground px-4">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </p>
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-3 gap-4 pt-8"
        >
          <div className="text-center space-y-2">
            <div className="bg-success/10 rounded-full p-3 mx-auto w-fit">
              <DirectionsRunIcon className="text-success" style={{ fontSize: 24 }} />
            </div>
            <p className="text-xs text-muted-foreground">Track Activities</p>
          </div>
          <div className="text-center space-y-2">
            <div className="bg-primary/10 rounded-full p-3 mx-auto w-fit">
              <GoogleIcon className="text-primary" style={{ fontSize: 24 }} />
            </div>
            <p className="text-xs text-muted-foreground">Find Nearby</p>
          </div>
          <div className="text-center space-y-2">
            <div className="bg-warning/10 rounded-full p-3 mx-auto w-fit">
              <DirectionsRunIcon className="text-warning" style={{ fontSize: 24 }} />
            </div>
            <p className="text-xs text-muted-foreground">Match & Meet</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
