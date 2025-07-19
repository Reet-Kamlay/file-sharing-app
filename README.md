# 📁 File Sharing App

A full-stack file sharing application built with **Next.js (App Router)**, **Firebase**, and **Tailwind CSS**, allowing users to securely upload, preview, protect, and share files.

> ✅ Live Demo (optional): [https://your-app-url.com](https://your-app-url.com)

---

## 🚀 Features

- 🔐 User Authentication (via Firebase Auth)  
- ☁️ File Upload & Storage (Firebase Storage)  
- 🖼️ File Preview (images + file-type icons for others)  
- 🔑 Password Protected File Sharing  
- 📎 Short Link Generation & Copy  
- ✉️ Email File Sharing  
- 📊 File Metadata (size, type, date)  
- 🗑️ Delete Files  
- 🔍 Search & Sort Uploaded Files  
- 🧑‍💻 Dashboard with File Management  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 13+ (App Router), Tailwind CSS, React, Shadcn UI, Lucide Icons  
- **Backend:** Firebase (Auth + Storage + Firestore)  
- **Animations:** Framer Motion  
- **Icons:** File-type detection and display using MIME types  

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Reet-Kamlay/file-sharing-app.git
cd file-sharing-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)  
- Create a project  
- Enable:  
  - Firebase Authentication (Email/Password)  
  - Firebase Storage  
  - Firestore Database  

- Create a `.env.local` file in the root directory and add:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Locally

```bash
npm run dev
```

---

## 📁 Folder Structure

```
app/
  api/
  dashboard/
  preview/
  upload/
components/
  FilePreview/
  FileShareForm/
  FileCard/
  ...
lib/
  firebase.ts
  utils.ts
```

---

## ✨ Future Improvements

- 📅 File Expiry & Auto Delete  
- 📈 Download Analytics  
- 🔗 Custom Link Slugs  
- 🌍 Internationalization  

---

## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com/)  
- [Lucide Icons](https://lucide.dev/)  
- [Framer Motion](https://www.framer.com/motion/)  
- [Shadcn UI](https://ui.shadcn.dev/)  
- Inspired by tutorials from *The Indian Dev*  

---

## 📜 License

MIT © 2025 [Reet Kamlay](https://github.com/Reet-Kamlay)
