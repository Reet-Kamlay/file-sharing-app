import React, { useState } from 'react'
import AlertMsg from './AlertMsg'
import FilePreview from './FilePreview'
import ProgressBar from './ProgressBar'

const UploadForm = ({ uploadBtnClick, progress, uploadSuccess }) => {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const onFileSelect = (file) => {
    if (file && file.size > 2147483648) {
      setErrorMsg('File size exceeds 2GB limit');
      return;
    }
    setErrorMsg(null);
    setFile(file);
  }

  if (uploadSuccess) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg shadow-lg animate-fade-in">
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16 text-green-600 mb-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
          </svg>
          <div className="text-green-700 font-extrabold text-2xl mb-2 animate-bounce">
            File uploaded successfully!
          </div>
          <div className="text-green-900 text-sm">You can now share your file link.</div>
        </div>
      </div>
    );
  }

  return (
    <div className='text-center'>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-400 border-dashed rounded-lg cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 shadow transition-all duration-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-14 h-14 mb-4 text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-blue-700 dark:text-blue-400">
              <span className="font-semibold">Click to upload</span> or{' '}
              <strong className="text-blue-500">drag</strong> and{' '}
              <strong className="text-blue-500">drop</strong>
            </p>
            <p className="text-xs text-blue-500 dark:text-blue-300">
              SVG, PNG, JPG or GIF (Max Size : 2GB)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={(event) => onFileSelect(event.target.files[0])} />
        </label>
      </div>
      {errorMsg ? <AlertMsg msg={errorMsg} /> : null}
      {file ? <FilePreview file={file} removeFile={() => setFile(null)} /> : null}

      {progress > 0
        ? <ProgressBar progress={progress} />
        : <button
            disabled={!file}
            className='p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400 shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300'
            onClick={() => uploadBtnClick(file)}
          >
            Upload
          </button>
      }
    </div>
  )
}

export default UploadForm