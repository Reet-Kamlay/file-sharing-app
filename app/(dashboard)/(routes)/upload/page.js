"use client";
import React, { useEffect, useState } from "react";
import UploadForm from "./_components/UploadForm";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useUser } from "@clerk/nextjs";
import { generateRandomString } from "@/app/_utils/GenerateRandomString";
import { useRouter } from "next/navigation";



const Upload = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const storage = getStorage(app);
  const router=useRouter();
  const db = getFirestore(app);
  const [fileDocId,setFileDocId]=useState();

  const uploadFile = (file) => {
    setUploadSuccess(false); // Reset on new upload
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, "file-upload/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        // Optionally handle error
      },
      () => {
        setUploadSuccess(true); // Set success when upload completes
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveInfo(file, downloadURL);
        });
      }
    );
  };

  const saveInfo = async (file, fileUrl) => {
  const docId = generateRandomString().toString();
  await setDoc(doc(db, "uploadedFile", docId), {
    fileName: file?.name,
    fileSize: file?.size,
    fileType: file?.type,
    fileUrl: fileUrl,
    userEmail: user?.primaryEmailAddress.emailAddress,
    userName: user?.fullName,
    password: "",
    id: docId,
    shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    timestamp: serverTimestamp(), // ✅ This line is the fix
  });
  setFileDocId(docId);
};

  useEffect(() => {
  if (fileDocId) {
    const timeout = setTimeout(() => {
      console.log("FileDocId", fileDocId);
      router.push('/file-preview/' + fileDocId);
    }, 10000);
    return () => clearTimeout(timeout);
  }
}, [fileDocId, router]);
  return (
    <div className="p-5 px-8 md:px-28">
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-blue-500">Uploading</strong> File and{" "}
        <strong className="text-blue-500">Share</strong> it
      </h2>
      <UploadForm
        uploadBtnClick={uploadFile}
        progress={progress}
        uploadSuccess={uploadSuccess}
      />
    </div>
  );
};

export default Upload;
