import { motion } from "framer-motion";
import { Radio, User, Globe } from "lucide-react";
import { AuthMode } from "@/hooks/useRadioStations";

interface AuthPromptProps {
  onChoose: (mode: AuthMode) => void;
}

export function AuthPrompt({ onChoose }: AuthPromptProps) {
  return (
    <div className="fixed inset-0 z-50 gradient-mesh flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 glow-primary"
          >
            <Radio className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">MyRadio</h1>
          <p className="text-muted-foreground">Your personal radio station collection</p>
        </div>

        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => onChoose("guest")}
            className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all card-hover flex items-center gap-4 text-left group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Try as Guest</p>
              <p className="text-sm text-muted-foreground">Saved locally on your browser</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => onChoose("account")}
            className="w-full p-4 rounded-xl bg-card border border-border hover:border-accent/40 transition-all card-hover flex items-center gap-4 text-left group"
          >
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
              <User className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Create Account</p>
              <p className="text-sm text-muted-foreground">Sync across devices</p>
            </div>
          </motion.button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Guest data will transfer to your account when you sign up
        </p>
      </motion.div>
    </div>
  );
}
