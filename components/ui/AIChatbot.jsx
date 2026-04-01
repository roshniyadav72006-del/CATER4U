"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AIChatbot() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Hello! Main aapki catering assistant hoon 😊\n\nPlease language choose karein:",
      options: ["Hindi", "English"],
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("");
  const [step, setStep] = useState("language");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (option) => {
    sendMessage(option);
  };

  const sendMessage = (customInput) => {
    const userInput = customInput || input;
    if (!userInput.trim()) return;

    const userMsg = { role: "user", text: userInput };
    setMessages((prev) => [...prev, userMsg]);

    // 🔹 LANGUAGE STEP
    if (step === "language") {
      if (userInput.toLowerCase() === "hindi") {
        setLanguage("Hindi");
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              "👍 Great! Main aapki help karne ke liye yahan hoon 😊\n\nAap kya karna chahte hain?",
            options: [
              "Booking karni hai",
              "Form fill help",
              "Menu dekhna hai",
              "Contact karna hai",
            ],
          },
        ]);
        setStep("menu");
      } else if (userInput.toLowerCase() === "english") {
        setLanguage("English");
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              "👍 Great! I'm here to help you 😊\n\nWhat would you like to do?",
            options: [
              "Make a booking",
              "Help filling form",
              "View menu",
              "Contact us",
            ],
          },
        ]);
        setStep("menu");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "❗ Please choose Hindi or English.",
            options: ["Hindi", "English"],
          },
        ]);
      }
    }

    // 🔹 MENU STEP
    else if (step === "menu") {
      const text = userInput.toLowerCase();

      // ✅ BOOKING
      if (text.includes("booking")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              language === "Hindi"
                ? "Perfect 👍 Main aapko booking process samjha deti hoon:\n\n📌 Aapko kya karna hoga:\n• Event type select karein\n• Date choose karein\n• Guest count dalein\n• Address fill karein\n\nAb main aapko booking page par le ja rahi hoon..."
                : "Perfect 👍 Let me guide you:\n\n📌 Steps:\n• Select event type\n• Choose date\n• Enter guest count\n• Fill address\n\nNow I’m taking you to the booking page...",
          },
        ]);

        setTimeout(() => {
          router.push("/booking");
        }, 1200);
      }

      // ✅ FORM HELP (more detailed)
      else if (text.includes("form")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              language === "Hindi"
                ? "📝 Main aapko form fill karne me help karti hoon 😊\n\n🔹 Event Type → jaise Wedding, Birthday\n🔹 Date → hamesha future date select karein\n🔹 Guests → approx number (50, 100 etc)\n🔹 Address → proper location likhein\n🔹 Special Request → optional hai (custom food etc)\n\n👉 Tip: jitni accurate details denge, utni better service milegi!\n\nAgar phir bhi doubt ho to aap directly contact bhi kar sakte hain 👍"
                : "📝 Let me help you fill the form 😊\n\n🔹 Event Type → Wedding, Birthday etc\n🔹 Date → choose a future date\n🔹 Guests → approx number\n🔹 Address → proper location\n🔹 Special Request → optional\n\n👉 Tip: more accurate details = better service!\n\nStill confused? You can contact us anytime 👍",
          },
        ]);
      }

      // ✅ MENU
      else if (text.includes("menu")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              language === "Hindi"
                ? "🍽️ Great choice! Main aapko menu dikhaati hoon.\n\nYahan aapko veg aur non-veg dono options milenge 😊\n\nChaliye, main menu page open kar rahi hoon..."
                : "🍽️ Great choice! Let me show you the menu.\n\nYou’ll find veg & non-veg options 😊\n\nOpening menu page...",
          },
        ]);

        setTimeout(() => {
          router.push("/menu");
        }, 1200);
      }

      // ✅ CONTACT
      else if (text.includes("contact")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              language === "Hindi"
                ? "📞 Bilkul! Main aapko contact page par le ja rahi hoon.\n\nAap wahan se directly humse baat kar sakte hain 😊"
                : "📞 Sure! I’ll take you to the contact page.\n\nYou can directly reach out to us there 😊",
          },
        ]);

        setTimeout(() => {
          router.push("/contact");
        }, 1200);
      }

      else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              language === "Hindi"
                ? "😅 Thoda confuse ho gaye lagta hai. Koi baat nahi!\n\nPlease options me se choose karein 👇"
                : "😅 Seems like a mismatch. Please choose from the options 👇",
          },
        ]);
      }
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
              className="text-white text-lg font-bold"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm flex flex-col">
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-100 self-end ml-auto"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.options && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
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
              placeholder="Type here..."
            />

            <button
              onClick={() => sendMessage()}
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