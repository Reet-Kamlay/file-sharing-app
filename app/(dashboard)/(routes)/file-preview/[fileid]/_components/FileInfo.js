import React from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FileInfo = ({ file }) => {
  return (
    <motion.div variants={childVariants} className="flex flex-col items-center text-center gap-4">
      <motion.img
        src={file.fileUrl}
        alt={file.fileName}
        className="w-full max-w-md rounded-xl shadow-md border"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">{file.fileName}</h2>
        <p className="text-sm text-gray-600">
          <FileText className="inline mr-1 w-4 h-4" />
          {file.fileType} • {(file.fileSize / 1024).toFixed(2)} KB
        </p>
      </div>
    </motion.div>
  );
};

export default FileInfo;
