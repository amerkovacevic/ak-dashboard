# AK Dashboard

A Tailwind CSS powered React dashboard that serves as Amer Kovacevic's personal launchpad for web apps and tools hosted at [Amerkovacevic.com](https://amerkovacevic.com/).

## ✨ Features

- **Hero introduction** that sets the tone for the AK Dashboard brand.
- **App showcase grid** with clear status badges for each planned experience.
- **External linking** for the live Personal Portfolio at `about.amerkovacevic.com`.
- **Responsive design** built with Tailwind CSS, optimized for desktop and mobile.
- **Firebase-friendly build** generated via Vite for hosting at `Amerkovacevic.com`.

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at the URL shown in the terminal (typically `http://localhost:5173`).
3. **Create a production build**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
.
├── public/              # Static assets copied as-is to the build output
├── src/
│   ├── App.jsx          # Dashboard layout and app cards
│   ├── index.css        # Tailwind directives and global styles
│   └── main.jsx         # React entry point
├── index.html           # Root HTML document served by Vite
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## ☁️ Deployment Notes

- The Vite build output (generated in `dist/`) can be deployed directly to Firebase Hosting.
- Update your Firebase project configuration to point the hosting public directory to `dist` after running `npm run build`.

## 📄 License

This project is released under the [MIT License](./LICENSE).
