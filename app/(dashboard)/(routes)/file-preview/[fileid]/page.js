"use client";
import { app } from "@/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FileInfo from "./_components/FileInfo";
import FileShareForm from "./_components/FileShareForm";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const containerVariants = {
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

const FilePreview = ({ params: { fileid } }) => {
  const db = getFirestore(app);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (fileid) {
      getFileInfo();
    }
  }, [fileid]);

  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedFile", fileid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFile(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const onPasswordSave=async(password)=>{
    const docRef=doc(db, "uploadedFile", fileid);
    await updateDoc(docRef,{
      password:password
    });
    
  }
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-100 px-4 md:px-16 py-10">
      {/* Back to Upload Button */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-6"
      >
        <Link
          href="/upload"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-full shadow hover:bg-blue-50 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Upload
        </Link>
      </motion.div>

      {/* File Preview Card */}
      {file ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-10"
        >
          <FileInfo file={file} />
          <FileShareForm file={file} fileId={fileid} />
        </motion.div>
      ) : (
        <p className="text-center text-lg text-gray-600 font-semibold">
          Loading file details...
        </p>
      )}
    </div>
  );
};

export default FilePreview;
