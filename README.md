# 📘 Syllabye - Senior Capstone Project

![Syllabye Logo](public/images/Syllabye-White-White.png)

**Syllabye** is an intuitive web application designed to simplify syllabus management for both professors and students. Developed by students at Lewis University, the platform provides a dynamic interface for creating, customizing, sharing, and managing syllabi—enhancing clarity, accessibility, and collaboration in the academic experience.

---

## 🚀 About the Project

Syllabye offers tools for both professors and students to interact with syllabi in a modern, web-friendly format. Built with usability in mind, it supports real-time collaboration, multi-language support, clean design principles, and responsive features for all users.

### ✨ Key Features

- 🔧 **Interactive Syllabus Builder** – Easy-to-use form system to create professional-looking syllabi.
- 📥 **PDF Upload & Download** – Professors can upload their syllabi or export them for distribution.
- 🌐 **Language Support** – Switch between English and Spanish (Central American, Mexico).
- 🎯 **Clean, Intuitive Interface** – Designed with Bootstrap and TailwindCSS for current and future styling flexibility.
- 🛡️ **Role-Based Access (Coming Soon)** – Enhanced user permissions and dashboards.

---

## 👨‍💻 Meet the Team

A team of senior Computer Science students from **Lewis University**:

| Name             | Role                | Fun Fact                             |
|------------------|---------------------|--------------------------------------|
| Irving Sanchez   | Project Manager     | Can debug code in his sleep.         |
| Nick Krzysiak    | Scrum Master        | Makes frontend logic sing.           |
| Jaiden Leonard   | Security Specialist | Turns security into simplicity.      |
| Bryan Avalos     | Frontend Developer  | Has mastered more frameworks than most. |

---

## 🛠️ Tech Stack

### Core Technologies

- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **Styling**: Bootstrap 5, TailwindCSS (transitioning)
- **Backend**: Node.js + Express.js
- **Version Control**: Git + GitHub
- **Deployment**: Azure Static Web Apps
- **Icons**: Font Awesome
- **Other Libraries**: Vite, jQuery (limited), Firebase for storage

---

## 📦 Installation & Setup

To get started with **Syllabye** on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/ChairForce-1-0/Syllabye-Capstone.git
cd Syllabye-Capstone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Access the App

Open your browser and visit:

```plaintext
http://localhost:5173
```

---

## ✅ Prerequisites

Before running this app, ensure the following are installed:

- **Node.js** (v16+ recommended): <https://nodejs.org/>
- **npm**: Comes bundled with Node.js

---

## 📁 Project Structure

```markdown
📁 Syllabye-Capstone
├── .gitignore
├── COMMIT_EDITMSG
├── config
├── description
├── eslint.config.js
├── FETCH_HEAD
├── HEAD
├── index.html
├── LICENSE
├── ORIG_HEAD
├── package-lock.json
├── package.json
├── packed-refs
├── postcss.config.js
├── PROCESS.md
├── README.md
├── REBASE_HEAD
├── staticwebapp.config.json
├── tailwind.config.js
├── TEAM.md
├── vite.config.js
├── 📁 public
│   ├── 📁 images
│   └── 📁 pdfs
├── 📁 src
│   ├── App.css
│   ├── App.jsx
│   ├── Firebase.jsx
│   ├── i18n.js
│   ├── index.css
│   ├── main.jsx
│   ├── MULTI-LANGUAGE-SUPPORT.md
│   ├── 📁 assets
│   ├── 📁 components
│   ├── 📁 images
│   └── 📁 pages
│       ├── About.jsx
│       ├── Browse.jsx
│       ├── Contact.jsx
│       ├── Create.jsx
│       ├── Dashboard.jsx
│       ├── EditUpload.jsx
│       ├── Home.jsx
│       ├── Login.jsx
│       ├── Signup.jsx
│       └── TestTailwind.jsx
```

---

## 🔧 Notes for Future Developers

- A language toggle component is implemented across most pages.
- Firebase handles PDF upload/download operations.
- Styling will be incrementally transitioned to **TailwindCSS** – future developers are encouraged to continue this migration.
- If setting up Azure Static Web Apps, ensure correct routing is configured in `staticwebapp.config.json`.

---

## 🙌 Acknowledgements

Special thanks to Lewis University faculty and peers for their support throughout the capstone journey.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Future Contributions

We encourage future students or developers to:

- Complete the TailwindCSS migration
- Implement role-based dashboards
- Expand PDF and instruction template support
- Improve accessibility testing and keyboard navigation

Let's continue making syllabus management smarter, faster, and easier.
