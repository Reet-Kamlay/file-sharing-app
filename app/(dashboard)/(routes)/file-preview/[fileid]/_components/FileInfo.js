"use client";

import React from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const isImage = (fileName) => {
  const ext = fileName?.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext);
};

const getFileType = (fileName) => {
  const ext = fileName?.split(".").pop()?.toUpperCase();
  return ext || "FILE";
};

const FileInfo = ({ file }) => {
  const showImage = isImage(file?.fileName);

  return (
    <motion.div
      variants={childVariants}
      className="flex flex-col items-center text-center gap-4"
    >
      {showImage ? (
        <motion.img
          src={file?.fileUrl}
          alt={file?.fileName}
          className="w-full max-w-md rounded-xl shadow-md border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <motion.div
          className="w-48 h-48 flex items-center justify-center rounded-xl bg-gray-100 border shadow"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FileText className="w-24 h-24 text-gray-500" />
        </motion.div>
      )}

      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {file?.fileName}
        </h2>
        <p className="text-sm text-gray-600">
          {getFileType(file?.fileName)} •{" "}
          {(file?.fileSize / 1024).toFixed(2)} KB
        </p>
      </div>
    </motion.div>
  );
};

export default FileInfo;
