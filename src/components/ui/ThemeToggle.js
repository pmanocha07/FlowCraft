export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <span role="img" aria-label="sun">
          ☀️
        </span>
      ) : (
        <span role="img" aria-label="moon">
          🌙
        </span>
      )}
    </button>
  );
}
