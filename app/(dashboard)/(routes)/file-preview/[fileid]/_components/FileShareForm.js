"use client";
import React, { useState } from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import {
  Lock,
  Mail,
  Save,
  Link,
  ClipboardCopy,
  Check,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FileShareForm = ({ file, fileId }) => {
  const db = getFirestore(app);
  const [password, setPassword] = useState(file?.password || "");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSavePassword = async () => {
    try {
      const docRef = doc(db, "uploadedFile", fileId);
      await updateDoc(docRef, { password });
      alert("Password updated!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    }
  };

  const handleSendEmail = async () => {
    if (!email) return alert("Enter a valid email");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          fileName: file?.fileName,
          fileId: fileId,
        }),
      });

      const result = await res.json();

      if (result.success) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
    } catch (err) {
      console.error("Email error:", err);
      alert("Something went wrong while sending email.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/f/${fileId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isImage = (name) => {
    const ext = name?.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
  };

  return (
    <motion.div variants={childVariants} className="flex flex-col gap-6">
      

      {/* Short URL and Copy Button */}
      <div>
        <label className="text-sm font-semibold text-gray-700">Short URL</label>
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl mt-1 shadow-sm">
          <Link className="w-4 h-4 mr-2 text-gray-500" />
          <input
            readOnly
            value={`http://localhost:3000/f/${fileId}`}
            className="bg-transparent w-full text-sm text-gray-800 outline-none"
          />
          <button onClick={handleCopyLink} className="ml-2">
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <ClipboardCopy className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={!!password}
            onChange={(e) => setPassword(e.target.checked ? "123456" : "")}
            className="accent-blue-600"
          />
          Enable Password?
        </label>

        <div className="flex items-center border border-gray-300 px-3 py-2 rounded-xl bg-white shadow-sm">
          <Lock className="w-4 h-4 mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>

        <button
          onClick={handleSavePassword}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-2 rounded-xl transition-all shadow-md"
        >
          <div className="flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />
            Save Password
          </div>
        </button>
      </div>

      {/* Email Section */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Send File to Email
        </label>
        <div className="flex items-center border border-gray-300 px-3 py-2 rounded-xl bg-white shadow-sm">
          <Mail className="w-4 h-4 mr-2 text-gray-500" />
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>

        <button
          onClick={handleSendEmail}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 rounded-xl transition-all shadow-md"
        >
          Send Email
        </button>
      </div>
    </motion.div>
  );
};

export default FileShareForm;
