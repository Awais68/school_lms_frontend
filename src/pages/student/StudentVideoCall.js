import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentVideoCall = () => {
  const { user } = useAuth();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const scheduledClasses = [
    {
      id: 1,
      subject: "Mathematics",
      teacher: "Dr. Smith",
      time: "10:00 AM - 11:00 AM",
      date: "Today",
      status: "Live Now",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      subject: "Physics",
      teacher: "Prof. Johnson",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      status: "Upcoming",
      meetingLink: "https://meet.google.com/xyz-uvwx-rst",
    },
    {
      id: 3,
      subject: "Chemistry",
      teacher: "Dr. Williams",
      time: "4:00 PM - 5:00 PM",
      date: "Tomorrow",
      status: "Scheduled",
      meetingLink: "https://meet.google.com/lmn-opqr-stu",
    },
  ];

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCallActive(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Please allow camera and microphone access to start the call");
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCallActive(false);
    setStream(null);
  };

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Video Call
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join live classes and meetings
          </p>
        </div>

        {!isCallActive ? (
          <>
            {/* Scheduled Classes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Scheduled Classes
              </h2>
              <div className="space-y-4">
                {scheduledClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📹</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {cls.subject}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {cls.teacher} • {cls.date}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {cls.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          cls.status === "Live Now"
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            : cls.status === "Upcoming"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {cls.status}
                      </span>
                      <button
                        onClick={startCall}
                        disabled={cls.status === "Scheduled"}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          cls.status === "Scheduled"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        Join Call
                      </button>
                      <a
                        href={cls.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
                      >
                        External Link
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Join */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Join
              </h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter meeting code..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={startCall}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  Join
                </button>
              </div>
            </div>
          </>
        ) : (
          // Active Call Interface
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              {isVideoOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <div className="h-24 w-24 bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-4">
                      <span className="text-4xl">👤</span>
                    </div>
                    <p className="text-white text-lg">
                      {user?.firstName || "You"}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Call Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={toggleMute}
                    className={`p-4 rounded-full transition-all ${
                      isMuted
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {isMuted ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      )}
                    </svg>
                  </button>

                  <button
                    onClick={toggleVideo}
                    className={`p-4 rounded-full transition-all ${
                      isVideoOff
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={endCall}
                    className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-all"
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentVideoCall;
