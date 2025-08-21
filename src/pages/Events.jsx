import React, { useState } from "react";
import {
  MapPin,
  Clock,
  CalendarDays,
  RefreshCw,
  AlertCircle,
  Filter,
  X,
  Upload,
} from "lucide-react";
import { useEvents } from "../hooks/useEvent";
import EventService from "../api/services/eventServices";

const EventsPage = () => {
  const { events, loading, error, filter, refetchEvents, changeFilter } =
    useEvents();
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "physical",
    audience: "restricted",
    startTime: "",
    endTime: "",
    size: "",
    priceType: "free",
    link: "",
    location: "",
    event: null, // This will be the uploaded file
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      // Only convert to number for number inputs, not textarea
      if (type === "number") {
        return { ...prev, [name]: Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  // Separate handler for file inputs
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: file,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "physical",
      audience: "restricted",
      startTime: "",
      endTime: "",
      size: "",
      priceType: "free",
      link: "",
      location: "",
      event: null,
    });
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Validate first
      EventService.validateEventData(formData);

      // Create the event using the service - we'll use the result if needed
      await EventService.createEvent(formData);

      // Close modal and reset form
      setShowAddEventModal(false);
      resetForm();

      // Refresh events list
      refetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      setSubmitError(
        error.message || "Failed to create event. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const AddEventModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        // Prevent modal background from stealing focus
        if (e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#C42323]">Add New Event</h3>
            <button
              onClick={() => {
                setShowAddEventModal(false);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                placeholder="Enter event title"
                autoComplete="off"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                placeholder="Enter event description"
                autoComplete="off"
              />
            </div>

            {/* Type and Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                >
                  <option value="physical">Physical</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audience *
                </label>
                <select
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                >
                  <option value="restricted">Restricted</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </div>

            {/* Start Time and End Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time *
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                />
              </div>
            </div>

            {/* Size and Price Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Size *
                </label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                  placeholder="Maximum attendees"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Type *
                </label>
                <select
                  name="priceType"
                  value={formData.priceType}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Link{" "}
                <span className="text-sm text-gray-500">(Optional)</span>
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                placeholder="https://example.com/event"
                autoComplete="off"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C42323]"
                placeholder="Enter event location"
                autoComplete="off"
              />
            </div>

            {/* Event Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Image{" "}
                <span className="text-sm text-gray-500">(Optional)</span>
              </label>
              <label
                htmlFor="event-image"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#C42323] transition-colors"
              >
                {formData.event ? (
                  <>
                    <img
                      src={URL.createObjectURL(formData.event)}
                      alt="Preview"
                      className="h-32 w-full object-contain mb-2"
                    />
                    <p className="text-sm text-gray-600">
                      {formData.event.name}
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload event image (JPEG, PNG)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 800x450px
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                name="event"
                id="event-image"
                onChange={handleFileChange}
                accept="image/jpeg, image/png"
                className="hidden"
              />
              {formData.event && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, event: null }))
                  }
                  className="mt-2 text-sm text-[#C42323] hover:underline"
                >
                  Remove image
                </button>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {submitError}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddEventModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#C42323] text-white px-4 py-3 rounded-lg hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-8 md:p-12 bg-gray-50 min-h-screen px-8">
        <h2 className="text-3xl font-bold mb-6 text-[#C42323]">
          Upcoming Events
        </h2>
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C42323]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 md:p-12 bg-gray-50 min-h-screen px-8">
        <h2 className="text-3xl font-bold mb-6 text-[#C42323]">
          Upcoming Events
        </h2>
        <div className="flex flex-col items-center justify-center min-h-64 bg-white rounded-xl shadow-md p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to Load Events
          </h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={refetchEvents}
            className="bg-[#C42323] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 bg-gray-50 min-h-screen px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-[#C42323]">
          {filter === "created-by-us"
            ? "Events Created By Us"
            : "Upcoming Events"}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowAddEventModal(true)}
            className="text-white bg-[#C42323] px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center gap-2 hover:bg-red-700"
          >
            Add Event +
          </button>

          <div className="flex bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => changeFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center gap-2 ${
                filter === "all"
                  ? "bg-[#C42323] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <Filter className="w-4 h-4" />
              All Events
            </button>

            <button
              onClick={() => changeFilter("created-by-us")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center gap-2 ${
                filter === "created-by-us"
                  ? "bg-[#C42323] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Created by Us
            </button>
          </div>

          <button
            onClick={refetchEvents}
            className="bg-[#2C8C91] text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-64 bg-white rounded-xl shadow-md p-8">
          <CalendarDays className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {filter === "created-by-us"
              ? "No Events Created Yet"
              : "No Events Available"}
          </h3>
          <p className="text-gray-600 text-center">
            {filter === "created-by-us"
              ? "You haven't created any events yet. Start by creating your first event!"
              : "There are currently no upcoming events to display."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events
            .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
            .map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/images/event-placeholder.jpg";
                    }}
                  />
                  {filter === "created-by-us" && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#C42323] text-white px-2 py-1 text-xs rounded-full font-medium">
                        Created by Us
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-[#2C8C91]">
                      {event.title}
                    </h3>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          event.priceType === "free"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {event.priceType === "free" ? "Free" : "Paid"}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          event.type === "physical"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {event.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{event.description}</p>

                  <div className="flex items-center text-sm text-gray-700 gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-[#C42323]" />
                    {event.location}
                  </div>

                  <div className="flex items-center text-sm text-gray-700 gap-2">
                    <CalendarDays className="w-4 h-4 text-[#C42323]" />
                    {new Date(event.startTime).toLocaleDateString()}
                  </div>

                  <div className="flex items-center text-sm text-gray-700 gap-2">
                    <Clock className="w-4 h-4 text-[#C42323]" />
                    {event.timeSlot}
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>
                        Slots: {event.slotsLeft}/{event.size}
                      </span>
                      <span
                        className={`font-medium ${
                          event.isActive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {event.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      
      {showAddEventModal && <AddEventModal />}
    </div>
  );
};

export default EventsPage;
