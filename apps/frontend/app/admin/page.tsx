"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAICommand } from "@/hooks/useAICommand";
import { unlockAudio } from "@/modules/core/voice/voiceUnlocked";
import { Card } from "@/components/ui/card";

export default function AITestChat() {
  const [message, setMessage] = useState("");
  const { runCommand } = useAICommand();

  const onSend = async () => {
    if (!message.trim()) return;

    await unlockAudio();

    await runCommand(message);
    setMessage("");
  };

  return (
    <div className="flex gap-2 p-4 border rounded-md">
      <Card className="w-full">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напиши команду AI…"
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
        />
        <Button onClick={onSend}>Send</Button>
      </Card>
    </div>
  );
}
