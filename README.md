# Class Components React App with Error Boundary

> A React + TypeScript project using **class components only**, showcasing local state management, API interaction, `localStorage` persistence, and an `ErrorBoundary` implementation.

---

## 📌 Task

[React project setup. Class components. Error boundary](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md)

---

## 🚀 Deployment

### [🔗 Live Demo](https://hapurzhonau-rsreact2025.netlify.app/)

### 📸 Screenshot:

<img width="1219" height="570" alt="image" src="https://github.com/user-attachments/assets/94e1ec53-d5b0-41d7-b9ab-39b6d037a686" />


---

## 🎯 Features

- Class components only (no hooks used)
- Search field with persistent input (saved in `localStorage`)
- Real-time data fetching from [Rick and Morty API](https://rickandmortyapi.com/)
- Initial API request runs on page load (with or without search term)
- Skeletons indicators shown during requests
- API error handling with user feedback
- Global error boundary for catching rendering errors
- Dedicated button to trigger an error and demonstrate fallback UI

---

## 🧱 Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- ESLint, Prettier, Husky

---

## 📁 Project Structure
<pre>
src/
├── api/Api.ts --> Fetch logic (with search + LS)
├── components/
│   ├── search/Search.tsx --> Controlled input + form handling
│   ├── cards/Cards.tsx --> Character card list
│   ├── buttonError/ButtonError.tsx --> Button that throws an error
│   └── errorBoundary/ErrorBoundary.tsx --> Catching rendering errors
├── interfaces/apiInterface.ts --> API response typing
├── pages/MainPage.tsx --> Stateful container (search, fetch, render)
├── App.tsx --> App wrapped in ErrorBoundary
└── main.tsx --> Entry point
</pre>

---
## 🧪 How to Run & Check the Project Locally

To test and verify the application locally, follow these steps:

### Clone the repository
```bash
git clone https://github.com/hapurzhonau/rs-react.git
cd rs-react 
```
 or 
```
git clone https://github.com/hapurzhonau/rs-react.git my-project
cd my-project
```
 and
```
npm install
npm run dev
```
---

## 🛠 Available Scripts

| Script              | Description                     |
|---------------------|---------------------------------|
| `npm run dev`       | Run dev server (Vite)           |
| `npm run lint`      | Run ESLint                      |
| `npm run format:fix`| Run Prettier formatter          |
| `npm run prepare`   | Prepares Husky hooks (only once after cloning) |
---

## ✅ Completed Requirements

| Feature                                               | Status |
|--------------------------------------------------------|--------|
| ESLint setup + no errors on lint run                  | ✅     |
| Prettier + format:fix command                         | ✅     |
| Husky pre-commit with lint                            | ✅     |
| Class components with Search + Results layout         | ✅     |
| API fetch on mount                                    | ✅     |
| Skeletons shown while fetching                           | ✅     |
| Search triggers fetch + saves to `localStorage`       | ✅     |
| `localStorage` used on initial load                   | ✅     |
| `ErrorBoundary` catches render errors                 | ✅     |
| Test button throws an error and shows fallback UI     | ✅     |

---

## ⚠️ Limitations

- Only class components are used due to task constraints  
- Pagination and full API edge cases are not covered  
- UI styling is basic (focus on functionality over design)

---

## 📄 License

This project is created for **educational purposes only** as part of the [RS School](https://rs.school/) curriculum.
