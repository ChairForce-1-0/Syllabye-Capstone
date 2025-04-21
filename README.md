# 📘 Syllabye – Senior Capstone Project

![Syllabye Logo](public/images/Syllabye-White-White.png)

**Syllabye** is a web-based platform designed to simplify syllabus creation and access for professors and students. Developed by Computer Science students at Lewis University, this project demonstrates best practices in modern web development, multi-language support, and sustainable code handoff for future developers.

---

## 🚀 About the Project

Syllabye enables users to build, upload, and interact with dynamic syllabi. The platform prioritizes accessibility, usability, and adaptability by implementing modular components, translation-ready interfaces, and scalable design systems.

### ✨ Key Features

- 🔧 **Interactive Syllabus Builder** – Create clean, professional syllabi through guided forms.
- 📥 **PDF Upload & Download** – Professors can upload syllabi and users can easily download them.
- 🌐 **Language Support** – Bilingual interface with runtime language switching (English & Spanish).
- 🎨 **TailwindCSS Transition** – Moving from Bootstrap to TailwindCSS for greater styling control.
- 🧭 **Componentized Architecture** – Designed for easy maintenance and extension.

---

## 👨‍💻 Meet the Team

A team of senior Computer Science students from **Lewis University**:

| Name             | Role                | Description                            |
|------------------|---------------------|-----------------------------------------|
| Irving Sanchez   | Product Owner       | Led internationalization and system architecture |
| Nick Krzysiak    | Scrum Master        | Coordinated sprints, merged features, organized backlog |
| Jaiden Leonard   | Developer           | Focused on backend structure and integration |
| Bryan Avalos     | Developer           | Contributed to component styling and implementation |

---

## 🛠️ Tech Stack

### Core Technologies
- **Frontend:** React.js, Vite, JavaScript, HTML5, CSS3
- **Styling:** TailwindCSS (primary), Bootstrap (legacy)
- **Deployment:** Azure Static Web Apps
- **Storage:** Firebase (PDF storage)
- **Version Control:** Git + GitHub

---

## 📦 Installation & Setup

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
Visit [http://localhost:5173](http://localhost:5173)

---

## ✅ Prerequisites
- **Node.js** (v16+ recommended) – [Install here](https://nodejs.org/)
- **npm** – Comes bundled with Node.js

---

## 📁 Project Structure

```plaintext
📁 Syllabye-Capstone
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── postcss.config.js
├── PROCESS.md                    ← Project workflow and Scrum guide
├── README.md                     ← You're here
├── staticwebapp.config.json
├── tailwind.config.js
├── vite.config.js
├── 📁 public/                    ← Static assets
│   ├── 📁 images
│   └── 📁 pdfs
├── 📁 src/                       ← Application source code
│   ├── App.css
│   ├── App.jsx
│   ├── Firebase.jsx              ← Firebase configuration for file storage
│   ├── i18n.js                   ← i18n configuration
│   ├── index.css
│   ├── main.jsx
│   ├── i18n-guide.md                 ← Multi-language support (react-i18next setup)
│   ├── 📁 assets/                   ← Static libraries and fonts
│   ├── 📁 components/               ← Reusable UI components
│   ├── 📁 images
│   ├── 📁 pages/                    ← Routed views (About, Create, Dashboard, etc.)
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

## 🌍 Internationalization

Syllabye supports bilingual language switching powered by `react-i18next`. To learn how to modify, extend, or translate components, see:

- [`i18n-guide.md`](./src/i18n-guide.md)
- [`src/i18n.js`](./src/i18n.js)

The `LanguageToggle` component enables real-time switching between English and Spanish.

---

## 📄 Process & Documentation

- [`PROCESS.md`](./PROCESS.md): Agile workflow, sprint planning, and dev practices
- [`i18n-guide.md`](./src/i18n-guide.md): Language support and i18next usage

---

## 🔧 Developer Notes

- Use `npm run dev` to launch the development server.
- PDF upload and management is powered by Firebase.
- TailwindCSS is now the primary styling framework (replacing Bootstrap).
- Route configuration is managed in `staticwebapp.config.json` for Azure deployments.

---

## 🧠 For Future Contributors

We encourage future developers to:

- Expand language support (add new locales in `i18n.js`)
- Migrate remaining Bootstrap components to TailwindCSS
- Implement role-based dashboards and permission logic
- Strengthen accessibility (ARIA labels, keyboard navigation)
- Add automated testing and validation tools

---

## 🙌 Acknowledgements

Special thanks to Lewis University faculty, classmates, and mentors for supporting this project.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

Let's continue making syllabus creation smarter, faster, and more accessible for all.
