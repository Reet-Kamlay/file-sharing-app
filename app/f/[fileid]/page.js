"use client";

import React, { useEffect, useState } from "react";
import { app } from "@/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import { Download, Lock } from "lucide-react";

const container = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

export default function CustomFileLandingPage({ params }) {
  const { fileid } = params;
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [file, setFile] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fileid) fetchFile();
  }, [fileid]);

  const fetchFile = async () => {
    try {
      const docRef = doc(db, "uploadedFile", fileid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setFile(snap.data());
        setError("");
      } else {
        setError("❌ File not found.");
      }
    } catch (e) {
      console.error(e);
      setError("⚠️ Error fetching file.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCheck = () => {
  if (file?.password && file.password === passwordInput.trim()) {
    setValid(true);
    setError("");
    handleDownload(); // 👈 auto download on unlock
  } else {
    setError("Incorrect password.");
  }
};


  const handleDownload = async () => {
  try {
    // Adjust this path to match your Firebase Storage upload path
    const storagePath = `file-upload/${file?.fileName}`;
    const fileRef = ref(storage, storagePath);
    const url = await getDownloadURL(fileRef);

    // Auto-trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = file?.fileName || "file"; // Suggests filename to browser
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error("Download error:", err);
    setError("⚠️ Error generating download link.");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      <motion.div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900">📁 File Download</h1>
        <p className="text-gray-700">Shared via <strong>FileShare</strong></p>

        {loading ? (
          <p className="text-gray-500 text-sm">⏳ Fetching file info...</p>
        ) : (
          <>
            <div className="p-4 rounded-xl bg-gray-50 border text-left">
              <p className="text-sm text-gray-500">File Name:</p>
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {file?.fileName || "Unknown"}
              </h2>
            </div>

            {file?.password && !valid ? (
              <>
                <div className="relative flex items-center border border-gray-300 rounded-xl p-2 bg-white shadow-sm">
                  <Lock className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="password"
                    placeholder="Enter file password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full outline-none text-sm"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handlePasswordCheck}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-xl shadow hover:opacity-90 transition"
                >
                  Unlock File
                </button>
              </>
            ) : (
              file && (
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow-lg transition"
                >
                  <Download className="w-5 h-5" />
                  Download File
                </motion.button>
              )
            )}
          </>
        )}

        {error && !file?.password && !loading && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <p className="text-xs text-gray-400 mt-6">
          This link is private and only visible to you.
        </p>
      </motion.div>
    </div>
  );
}
