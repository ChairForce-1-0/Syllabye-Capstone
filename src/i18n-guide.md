# Multi-Language Support (i18n) Implementation Guide for Syllabye

This guide outlines the internationalization (i18n) setup and usage within the Syllabye application using `react-i18next`. It describes how translations are configured, structured, and integrated across the project, based on the actual `i18n.js` file already included in the repository.

---

## 📦 Project Integration

Syllabye uses `i18next` with `react-i18next` to support bilingual capabilities (English and Spanish). Translation strings are managed **in-memory** within the `i18n.js` file in `src/`, and updates are reflected live through hooks provided by the library.

### 📁 File Structure

```markdown
src/
├── components/
├── pages/
├── i18n.js              # Configuration and translation resources
├── App.jsx
├── main.jsx             # Ensure i18n.js is imported here
```

---

## 🧱 1. i18n.js – Configuration Overview

The `i18n.js` file initializes the translation system and holds all static translation content:

```js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { ... } },
  es: { translation: { ... } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
```

Each `translation` block is a deeply nested object, organized by component (e.g., `header`, `drawer`, `syllabusForm`). This makes it easier to locate and manage content.

---

## 🏁 2. Initializing i18n

Import the `i18n.js` file in `main.jsx` **before rendering `<App />`** to ensure translations are available globally.

```js
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'; // import before rendering

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🌐 3. Using Translations in Components

Import and call the `useTranslation` hook within any component to access strings.

```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('header.mainSlogan')}</h1>; // Output based on current language
};
```

---

## 🔁 4. Switching Languages

Language switching is handled through the `i18n.changeLanguage()` method:

```jsx
const { i18n } = useTranslation();

<button onClick={() => i18n.changeLanguage('en')}>English</button>
<button onClick={() => i18n.changeLanguage('es')}>Español</button>
```

This immediately updates all visible `t()` values.

---

## 📄 5. Adding or Updating Translations

To add new text or update existing ones:

### Step 1: Identify the component and its translation key

Example:

```js
team: {
  title: "Meet The Team",
  members: {
    irving: { name: "Irving Sanchez", description: "..." }
  }
}
```

### Step 2: Add both English and Spanish versions under their respective `resources`

Example:

```js
en: {
  translation: {
    ...,
    myComponent: {
      welcome: "Welcome to Syllabye!"
    }
  }
},

es: {
  translation: {
    ...,
    myComponent: {
      welcome: "¡Bienvenido a Syllabye!"
    }
  }
}
```

### Step 3: Use it in your component

```jsx
<p>{t('myComponent.welcome')}</p>
```

---

## 📚 6. Best Practices for Future Developers

- **Group translation keys by component name** to keep things clean.
- **Avoid hardcoded strings** in JSX. Use `t()` instead.
- If possible, **break large translation objects into separate files** later for scalability.
- Be consistent with **camelCase** for keys.
- Always test translation updates in both English and Spanish modes.

---

## 🔍 7. Troubleshooting

| Issue | Fix |
|-------|-----|
| Translations not showing | Make sure `i18n.js` is imported in `main.jsx` |
| Text not changing | Confirm the `t()` key exists in both `en` and `es` |
| App crashes | Ensure there are no typos in your translation keys |

---

## ✅ 8. Summary

Syllabye’s multilingual support is driven by `react-i18next` and a single configuration file, `i18n.js`. By keeping translations organized and following the provided conventions, future developers can easily extend support to additional languages or update existing strings.

---

## 📎 Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Overview](https://www.i18next.com/)

---

This file is maintained as part of the Syllabye Capstone. For questions or changes, contact the Product Owner or refer to the onboarding documentation.
