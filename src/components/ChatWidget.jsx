"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useRef, useEffect } from "react";


export default function ChatWidget() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open && userId) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/${userId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data || []))
        .catch(() => {});
    }
  }, [open, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim() || !userId) return;
    setInput("");
    setSuggestions([]);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsTyping(true);

    let assistantText = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: text }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");
        buffer = parts.pop();

        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const payload = JSON.parse(part.slice(6));

     if (payload.text) {
  assistantText += payload.text;
  setIsTyping(false);

  const markerIdx = assistantText.indexOf("<<<SUGGESTIONS>>>");
  const displayText = markerIdx !== -1 ? assistantText.slice(0, markerIdx).trim() : assistantText;

  setMessages((prev) => {
    const updated = [...prev];
    updated[updated.length - 1] = { role: "assistant", content: displayText };
    return updated;
  });
}

          if (payload.done) {
            setSuggestions(payload.suggestions || []);
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!userId) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 sm:w-96 h-[500px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
            <span className="text-sm font-bold text-white">Dish Dash Assistant</span>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white text-sm">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <p className="text-xs text-zinc-500">
                Ask me about recipes, cooking, or how to use Dish Dash.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-xl px-3 py-2 max-w-[85%] ${
                  m.role === "user"
                    ? "bg-orange-600 text-white ml-auto"
                    : "bg-zinc-900 text-zinc-200"
                }`}
              >
                {m.content}
              </div>
            ))}
            {isTyping && (
              <div className="bg-zinc-900 text-zinc-400 text-sm rounded-xl px-3 py-2 w-fit">
                <span className="animate-pulse">Typing…</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-xs rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-zinc-300 hover:text-white hover:border-zinc-700"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-zinc-900 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              className="flex-1 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-500"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-orange-600 w-14 h-14 flex items-center justify-center text-white text-2xl shadow-lg shadow-orange-500/20 hover:bg-orange-500"
        >
          💬
        </button>
      )}
    </div>
  );
}