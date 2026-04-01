"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const COOKIE_FORM = "booking_form";
const COOKIE_STEP = "booking_step";
const COOKIE_MENU = "booking_menu";

const REQUIRED_STEP1_FIELDS = [
  "eventType",
  "eventDate",
  "eventTime",
  "guests",
  "venueType",
  "venueAddress",
  "specialRequests",
];

const COOKIE_OPTIONS = { expires: 1 };

const clearBookingCookies = () => {
  Cookies.remove(COOKIE_FORM);
  Cookies.remove(COOKIE_STEP);
  Cookies.remove(COOKIE_MENU);
};

// ✅ Aaj ki date "YYYY-MM-DD" format mein
const today = new Date().toISOString().split("T")[0];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarWrapperRef = useRef(null);
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const validateStep2 = () => {
    if (!formData.selectedMenu || formData.selectedMenu.length < 5) {
      toast.error("Please select at least 5 menu items");
      return false;
    }
   return true;
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [availabilityData, setAvailabilityData] = useState([]);
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [authChecked, setAuthChecked] = useState(false);

  // ✅ Click outside se calendar band ho
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarWrapperRef.current && !calendarWrapperRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book an event");
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, []);
  const fetchAvailability = async () => {
     const month = selectedDate.toISOString().slice(0, 7);

     const res = await fetch(`/api/availability?month=${month}`);
     const data = await res.json();

     setAvailabilityData(data);
    };
  useEffect(() => {   
   fetchAvailability();
  }, [selectedDate]);
  const getCountForDate = (date) => {
    const d = formatDate(date) ;    
    const found = availabilityData.find(
      (item) =>
        formatDate(new Date(item._id)) === d // ✅ FIXED
    );
    return found ? found.count : 0;
  };
  const getInitialState = () => {
    try {
      const savedForm = JSON.parse(Cookies.get(COOKIE_FORM) || "{}");
      const savedMenu = JSON.parse(Cookies.get(COOKIE_MENU) || "[]");
      const savedStep = parseInt(Cookies.get(COOKIE_STEP) || "1");

      const step1Complete = REQUIRED_STEP1_FIELDS.every(
        (field) => savedForm[field] && String(savedForm[field]).trim() !== ""
      );

      const resolvedStep = savedStep > 1 && !step1Complete ? 1 : savedStep;

      if (resolvedStep !== savedStep) {
        Cookies.set(COOKIE_STEP, "1", COOKIE_OPTIONS);
      }

      return {
        step: resolvedStep,
        formData: {
          eventType: "",
          eventDate: "",
          eventTime: "",
          guests: "",
          venueType: "",
          venueAddress: "",
          specialRequests: "",
          totalPrice: 0,
          fullName: "",
          email: "",
          phone: "",
          ...savedForm,
          selectedMenu: savedMenu,
        },
      };
    } catch {
      return {
        step: 1,
        formData: {
          eventType: "",
          eventDate: "",
          eventTime: "",
          guests: "",
          venueType: "",
          venueAddress: "",
          specialRequests: "",
          selectedMenu: [],
          totalPrice: 0,
          fullName: "",
          email: "",
          phone: "",
        },
      };
    }
  };

  const initial = getInitialState();
  const [step, setStep] = useState(initial.step);
  const [formData, setFormData] = useState(initial.formData);

  useEffect(() => {
    const { selectedMenu, ...rest } = formData;
    Cookies.set(COOKIE_FORM, JSON.stringify(rest), COOKIE_OPTIONS);
    Cookies.set(COOKIE_MENU, JSON.stringify(selectedMenu), COOKIE_OPTIONS);
  }, [formData]);

  const goToStep = (newStep) => {
     if (newStep === 3) {
      if (!formData.selectedMenu || formData.selectedMenu.length < 5) {
        toast.error("Select at least 5 menu items before proceeding");
        return; 
      }
    }

    setStep(newStep);
    Cookies.set(COOKIE_STEP, String(newStep), COOKIE_OPTIONS);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const removeMenuItem = (index) => {
    const updated = formData.selectedMenu.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, selectedMenu: updated }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.eventType) newErrors.eventType = "Event type is required";
    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    } else if (formData.eventDate < today) {
      // ✅ Extra safety — agar koi manually type kare past date toh bhi reject karo
      newErrors.eventDate = "Event date cannot be in the past";
    }
    if (!formData.eventTime) newErrors.eventTime = "Event time is required";
    if (!formData.guests || Number(formData.guests) <= 0)
      newErrors.guests = "Number of guests is required";
    if (!formData.venueType) newErrors.venueType = "Venue type is required";
    if (!formData.venueAddress) newErrors.venueAddress = "Venue address is required";
    if (!formData.specialRequests)
      newErrors.specialRequests = "Please enter any special requests or write 'None'";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter a valid Indian mobile number (10 digits, starting with 6-9)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Next = () => {
    if (validateStep1()) goToStep(2);
  };

  const handleStep3Submit = async () => {
    if (!validateStep3()) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        router.replace("/login");
        return;
      }

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          eventDate: new Date(formData.eventDate),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
         if (data.message === "Date full") {
          await fetchAvailability(); // 🔥🔥🔥 MAIN FIX
        }
        toast.error(data.message);
        return;
      }

      clearBookingCookies();
      toast.success("Your booking has been submitted! Please wait for confirmation.");
      await fetchAvailability(); // 🔥 update calendar
      router.push("/booking-success");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
    ) : null;

  const inputStyle = (field) => ({
    borderColor: errors[field] ? "#ef4444" : "#b5c4a1",
  });

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F0DC" }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-4 animate-spin"
            style={{ borderColor: "#2D5016", borderTopColor: "transparent" }}
          />
          <p style={{ color: "#2D5016", fontSize: "0.9rem" }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen" style={{ backgroundColor: "#F5F0DC" }}>

      {/* HEADER */}
      <div className="py-14 text-center">
        <div className="w-16 h-1 mx-auto mb-6 rounded-full" style={{ backgroundColor: "#C9A84C" }}></div>
        <h1 className="text-4xl font-bold mb-3" style={{ color: "#2D5016" }}>Book Your Event</h1>
        <p style={{ color: "#5a5a5a" }}>Let us make your event memorable with our catering services</p>

        {/* STEPPER */}
        <div className="flex justify-center items-center gap-2 md:gap-10 mt-6 md:mt-8 flex-wrap">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-4">
              <div
                className="w-11 h-11 flex items-center justify-center rounded-full font-bold transition-all"
                style={{
                  backgroundColor: step >= num ? "#2D5016" : "transparent",
                  color: step >= num ? "#ffffff" : "#2D5016",
                  border: `2px solid ${step >= num ? "#2D5016" : "#b5c4a1"}`,
                }}
              >
                {step > num ? "✓" : num}
              </div>
              {num !== 3 && (
                <div className="w-20 h-[3px] rounded-full"
                  style={{ backgroundColor: step > num ? "#2D5016" : "#b5c4a1" }}></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-24 mt-3 text-sm font-medium">
          <span style={{ color: step === 1 ? "#2D5016" : "#888" }}>Event Details</span>
          <span style={{ color: step === 2 ? "#2D5016" : "#888" }}>Menu Selection</span>
          <span style={{ color: step === 3 ? "#2D5016" : "#888" }}>Review</span>
        </div>
      </div>

      <div className="px-6 pb-20">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-6 md:p-12">
            <h2 className="text-2xl font-semibold mb-8" style={{ color: "#2D5016" }}>Event Details</h2>

            {formData.selectedMenu.length > 0 && (
              <div className="mb-6 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2"
                style={{ backgroundColor: "#edf5e1", color: "#2D5016", border: "1px solid #b5c4a1" }}>
                ✅ {formData.selectedMenu.length} menu item(s) already selected. Please fill in event details to continue.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

              <div>
                <label className="block mb-2 text-gray-600">Event Type <span className="text-red-500">*</span></label>
                <select name="eventType" value={formData.eventType} onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none" style={inputStyle("eventType")}>
                  <option value="">Select event type</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                  <option>Engagement</option>
                </select>
                <ErrorMsg field="eventType" />
              </div>

              {/* ✅ Calendar Dropdown — Mobile + Desktop dono ke liye responsive */}
              <div ref={calendarWrapperRef} style={{ position: "relative" }}>
                <label className="block mb-2 text-gray-600">Event Date <span className="text-red-500">*</span></label>
                <input
                 type="text"
                 readOnly
                 value={formData.eventDate}
                 placeholder="Select Date"
                 onClick={() => setShowCalendar(!showCalendar)}
                 className="w-full border rounded-lg p-3 mb-2 cursor-pointer"
                 style={inputStyle("eventDate")}
              />
             {/* Drop Down Calendar */}
                {showCalendar &&(
                   <div style={{
                     position: "absolute",
                     zIndex: 9999,
                     top: "100%",
                     left: 0,
                     right: 0,
                     backgroundColor: "#fff",
                     boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                     borderRadius: "12px",
                     padding: "12px",
                     width: "100%",
                     maxWidth: "360px",
                   }}>
                     <Calendar
                        onChange={(date) => {
                          setSelectedDate(date);
                          setShowCalendar(false);
                          setFormData((prev) => ({
                            ...prev,                          
                            eventDate: formatDate(date),
                          }));
                        }}
                        value={selectedDate}
                        minDate={new Date()} // ❌ past disable
                        tileContent={({ date }) => {
                          const count = getCountForDate(date);
                          let color = "green";
                          if (count >= 5){ color = "red";}
                          else if (count >= 4) {color = "orange";}
                          return(
                            <div                    
                              style={{
                                width:6,
                                height: 6,
                                borderRadius: "50%",
                                margin: "auto",
                                marginTop: 2,
                                backgroundColor: color,
                              }}
                            />
                          );
                        }}
                      /> 
                     {/* Legend */}
                     <div style={{ display: "flex", gap: "12px", marginTop: "10px", fontSize: "12px", padding: "0 4px 4px", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>                      
                          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "green", display: "inline-block", flexShrink: 0 }}></span>
                          Available
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}> 
                          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "orange", display: "inline-block", flexShrink: 0 }}></span>
                          Few slots left
                        </div>       
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "red", display: "inline-block", flexShrink: 0 }}></span>
                          Fully booked
                        </div>
                     </div>                   
                   </div>
                 )}
                 <ErrorMsg field="eventDate"/>
                  
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Event Time <span className="text-red-500">*</span></label>
                <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none" style={inputStyle("eventTime")} />
                <ErrorMsg field="eventTime" />
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Number of Guests <span className="text-red-500">*</span></label>
                <input type="number" name="guests" value={formData.guests} onChange={handleChange}
                  placeholder="50" min="1"
                  className="w-full border rounded-lg p-3 focus:outline-none" style={inputStyle("guests")} />
                <ErrorMsg field="guests" />
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Venue Type <span className="text-red-500">*</span></label>
                <select name="venueType" value={formData.venueType} onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none" style={inputStyle("venueType")}>
                  <option value="">Select venue</option>
                  <option>Indoor</option>
                  <option>Outdoor</option>
                  <option>Home/Residence</option>
                  <option>Office/Corporate</option>
                  
                </select>
                <ErrorMsg field="venueType" />
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Venue Address <span className="text-red-500">*</span></label>
                <input type="text" name="venueAddress" value={formData.venueAddress} onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full border rounded-lg p-3 focus:outline-none" style={inputStyle("venueAddress")} />
                <ErrorMsg field="venueAddress" />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-600">
                  Special Requests or Dietary Requirements <span className="text-red-500">*</span>
                </label>
                <textarea rows="4" name="specialRequests" value={formData.specialRequests} onChange={handleChange}
                  placeholder="Any allergies, dietary restrictions, or special requests... (write 'None' if not applicable)"
                  className="w-full border rounded-lg p-3 resize-none focus:outline-none"
                  style={inputStyle("specialRequests")}></textarea>
                <ErrorMsg field="specialRequests" />
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <button onClick={handleStep1Next}
                className="px-10 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2D5016" }}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-6 md:p-12">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold" style={{ color: "#2D5016" }}>Menu Selection</h2>
              <button
                onClick={() => { Cookies.set(COOKIE_STEP, "2", COOKIE_OPTIONS); router.push("/menu"); }}
                className="px-6 py-3 rounded-full text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#22420c" }}>
                + Add Menu Items
              </button>
            </div>

            {formData.selectedMenu.length === 0 ? (
              <div className="text-center text-gray-500 py-16 border-2 border-dashed rounded-2xl"
                style={{ borderColor: "#b5c4a1" }}>
                <p className="text-lg mb-2">No menu items selected yet</p>
                <p className="text-sm text-red-500 mb-2">Minimum 5 menu item required</p>
                <p className="text-sm">Click "Add Menu Items" to browse our menu</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-500 mb-4">{formData.selectedMenu.length} item(s) selected</p>
                {formData.selectedMenu.map((item, index) => (
                  <div key={index} className="flex items-center justify-between px-5 py-4 rounded-xl border"
                    style={{ borderColor: "#b5c4a1", backgroundColor: "#F5F0DC" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#2D5016" }}></div>
                      <span className="font-medium" style={{ color: "#2D5016" }}>{item.itemName}</span>
                      {item.quantity && item.quantity > 1 && (
                        <span className="text-sm text-gray-500">x {item.quantity}</span>
                      )}
                    </div>
                    <button onClick={() => removeMenuItem(index)}
                      className="text-red-400 hover:text-red-600 font-bold text-lg transition-colors">✕</button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-10">
              <button onClick={() => goToStep(1)}
                className="px-6 py-3 rounded-lg border font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#2D5016", color: "#2D5016" }}>Back</button>
              <button onClick={() => {
                if (validateStep2())
                  goToStep(3);
                }
              }
                className="px-10 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2D5016" }}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-6 md:p-12">
            <h2 className="text-3xl font-semibold mb-10" style={{ color: "#2D5016" }}>Review & Confirm</h2>

            <div className="rounded-2xl p-8 mb-10" style={{ backgroundColor: "#F5F0DC" }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: "#2D5016" }}>Event Details</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="font-medium">Event Type:</p><p>{formData.eventType}</p>
                  <p className="mt-4 font-medium">Guests:</p><p>{formData.guests} people</p>
                  <p className="mt-4 font-medium">Address:</p><p>{formData.venueAddress}</p>
                  <p className="mt-4 font-medium">Special Requests:</p><p>{formData.specialRequests}</p>
                </div>
                <div>
                  <p className="font-medium">Date & Time:</p>
                  <p>{formData.eventDate} at {formData.eventTime}</p>
                  <p className="mt-4 font-medium">Venue:</p><p>{formData.venueType}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-8 mb-10" style={{ backgroundColor: "#F5F0DC" }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: "#2D5016" }}>Selected Menu</h3>
              {formData.selectedMenu.length === 0 ? (
                <p className="text-gray-500">No menu selected</p>

              ) : (
                formData.selectedMenu.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-[#3D4F1C] font-medium">
                      {item.itemName}
                      {item.quantity && item.quantity > 1 && (
                        <span className="text-gray-500 font-normal"> x {item.quantity}</span>
                      )}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="rounded-2xl p-8 mb-10" style={{ backgroundColor: "#F5F0DC" }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: "#2D5016" }}>Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block mb-2 text-gray-600">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:outline-none" style={inputStyle("fullName")} />
                  <ErrorMsg field="fullName" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-600">Email <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:outline-none" style={inputStyle("email")} />
                  <ErrorMsg field="email" />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-gray-600">Phone Number <span className="text-red-500">*</span></label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="10-digit Indian mobile number"
                    className="w-full border rounded-lg p-3 focus:outline-none" style={inputStyle("phone")} />
                  <ErrorMsg field="phone" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => goToStep(2)}
                className="px-6 py-3 rounded-lg border font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#2D5016", color: "#2D5016" }}>Back</button>
              <button onClick={handleStep3Submit}
                className="px-10 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2D5016" }}>Submit Booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}