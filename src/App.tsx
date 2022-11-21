// import { useEffect, useState } from "react";
import { TopStories, SavedStories } from "./features/stories";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import logo from "./hacker-news-logo.svg";

import styles from "./App.module.css";

function App() {
  // this is semi working solution to dark theme mode therefore commenting the code for now
  // const [theme, setTheme] = useState("light");

  // const toggleTheme = () => {
  //   if (theme === "light") {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

  // useEffect(() => {
  //   document.body.className = theme;
  // });

  return (
    <Router>
      {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
      <div className={styles.content}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <header className={styles.logo}>
                <img src={logo} alt="logo" />
              </header>
            </li>
            <li>
              <div className={styles.logoText}>Hacker News</div>
            </li>
            <li>
              <NavLink
                className={(navData) => {
                  return navData.isActive
                    ? `${styles.navLinksLatest} ${styles.active}`
                    : styles.navLinksLatest;
                }}
                to="/"
              >
                latest
              </NavLink>
            </li>
            &nbsp;|&nbsp;
            <li>
              <NavLink
                className={(navData) => {
                  return navData.isActive
                    ? `${styles.navLinks} ${styles.active}`
                    : styles.navLinks;
                }}
                to="starred"
              >
                starred
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<TopStories />} />
          <Route path="/starred" element={<SavedStories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
