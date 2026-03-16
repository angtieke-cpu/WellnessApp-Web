import { useNavigate, useLocation } from "react-router-dom";

export default function DesktopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const NavItem = ({ label, path }) => (
    <div
      onClick={() => navigate(path)}
      style={{
        ...styles.navItem,
        color: location.pathname === path ? "#7a5c9e" : "#555",
        fontWeight: location.pathname === path ? 600 : 400,
      }}
    >
      {label}
    </div>
  );

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>HerSolace</div>

      <div style={styles.navLinks}>
        <NavItem label="Home" path="/home" />
        <NavItem label="Calendar" path="/calendar" />
        <NavItem label="Ai" path="/ai" />
        <NavItem label="Profile" path="/profile" />
      </div>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    height: 70,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  logo: {
    fontSize: 20,
    fontWeight: 700,
    color: "#7a5c9e",
  },

  navLinks: {
    display: "flex",
    gap: 30,
  },

  navItem: {
    cursor: "pointer",
    fontSize: 15,
  },

  logout: {
    border: "none",
    background: "#e57373",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: 20,
    cursor: "pointer",
  },
};