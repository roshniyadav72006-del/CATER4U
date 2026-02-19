"use client";

import { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Hello! Please select language:\n1️⃣ Hindi\n2️⃣ English",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("");
  const [step, setStep] = useState("language");

  const messagesEndRef = useRef(null);

  // ✅ Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    if (step === "language") {
      if (input === "1") {
        setLanguage("Hindi");
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "👍 Aapne Hindi choose ki hai.\nAapse kaise madad kar sakti hoon?",
          },
        ]);
        setStep("chat");
      } else if (input === "2") {
        setLanguage("English");
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "👍 You selected English.\nHow can I assist you today?",
          },
        ]);
        setStep("chat");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "❗ Please type 1 for Hindi or 2 for English.",
          },
        ]);
      }
    } else {
      const reply =
        language === "Hindi"
          ? "Dhanyavaad! Kripya apna event type batayein."
          : "Thank you! Please tell me your event type.";

      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-xl hover:bg-blue-700 transition z-50"
      >
        🤖
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[450px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">
          
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span>Catering Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-bold hover:opacity-70"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm flex flex-col">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t p-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type here..."
            />

            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
