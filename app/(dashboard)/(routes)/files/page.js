"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebaseConfig";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { Download, Trash2 } from "lucide-react";

const FilesPage = () => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");

  const fetchFiles = async () => {
    const q = query(collection(db, "uploadedFile"), orderBy(sortBy, "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFiles(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "uploadedFile", id));
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const filteredFiles = files.filter(file =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (user?.primaryEmailAddress?.emailAddress === file.userEmail)
  );

  useEffect(() => {
    fetchFiles();
  }, [sortBy]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search files..."
          className="px-4 py-2 border rounded-md w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-md"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="timestamp">Date</option>
          <option value="fileSize">Size</option>
          <option value="fileType">Type</option>
        </select>
      </div>

      {filteredFiles.length === 0 ? (
        <p className="text-center text-gray-500">No files found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFiles.map(file => (
            <div key={file.id} className="border p-4 rounded shadow bg-white">
              {file.fileType.includes("image") ? (
                <img
                  src={file.fileUrl}
                  alt={file.fileName}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center mb-3">
                  <span className="text-gray-500">{file.fileType}</span>
                </div>
              )}
              <h2 className="font-semibold truncate">{file.fileName}</h2>
              <p className="text-sm text-gray-600">
                {(file.fileSize / 1024).toFixed(2)} KB • {file.fileType}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
                {user?.primaryEmailAddress?.emailAddress === file.userEmail && (
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesPage;
