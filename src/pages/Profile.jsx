import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import DesktopNavbar from "../components/DesktopNavBar";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [cycleData, setCycleData] = useState(null);

  const [open, setOpen] = useState("mother");

  const [shareModal, setShareModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [phone, setPhone] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [deleteReason, setDeleteReason] = useState("");

  const [anonymous, setAnonymous] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const resize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", resize);

    const getUser = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://her-solace-api.vercel.app/api/user/user-details",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();

      if (result.success) {
        setUser(result.data);
        setEditName(result.data.name);
        setEditEmail(result.data.email);
      }
    };

    const getLinkedUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://her-solace-api.vercel.app/api/user/linked-users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();

      if (result.success) {
        // setUser(result.data);
        // setEditName(result.data.name);
        // setEditEmail(result.data.email);
      }
    };

    const getCycleDetails = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://her-solace-api.vercel.app/api/cycle/cycle-details",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();

      if (result.success) {
        setCycleData(result);
      }
    };

    getUser();
    getCycleDetails();
    getLinkedUsers();

    return () => window.removeEventListener("resize", resize);
  }, []);

  const searchUser = async () => {
    const token = localStorage.getItem("token");

    // const res = await fetch(
    //   // user/linked-users
    //   `https://her-solace-api.vercel.app/api/user/search?phone=${phone}`,
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
    const res = await fetch('https://her-solace-api.vercel.app/api/user/available-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        mobile_number: Number(phone),
      }),
    });

    // const data = await response.json();

    const result = await res.json();

    if (result.length > 0 && result[0].bleeding_days) {
      setSearchResults(result);
    }
  };

  const shareUser = async () => {
    const token = localStorage.getItem("token");

    // const res = await fetch(
    //   // user/linked-users
    //   `https://her-solace-api.vercel.app/api/user/search?phone=${phone}`,
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
    const res = await fetch('https://her-solace-api.vercel.app/api/user/link-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        "mobile_number": phone,
        "relationship": "Friend"
      }),
    });

    // const data = await response.json();

    const result = await res.json();

    if (result.length > 0 && result[0].bleeding_days) {
      setSearchResults(result);
    }
  };

  const saveProfile = async () => {
    const token = localStorage.getItem("token");

    await fetch(
      "https://her-solace-api.vercel.app/api/user/user-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: user.id,
          name: editName,
          email: editEmail,
          mobile_number: user.mobile_number,
        }),
      }
    );

    setEditModal(false);
    window.location.reload();
  };

  const confirmDeleteAccount = () => {
    alert(
      "Your account will be deleted after 7 days. Login again before that to cancel deletion."
    );
    localStorage.clear();
    navigate("/");
  };

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const toggleCard = (key) => {
    setOpen(open === key ? null : key);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  if (!user) return <div>Loading...</div>;

  const content = (
    <>
      <div style={styles.headerCard}>
        <img src="/well_logo.jpeg" style={styles.logo} />
        <h3 style={{ color: "#fff" }}>Her Solace</h3>
        <p style={{ color: "#fff" }}>Decode Hormones — Discover You</p>
      </div>

      <div style={styles.card}>
        <div style={styles.profileRow} onClick={() => toggleCard("mother")}>
          <div style={styles.avatar}>{user.name?.[0]}</div>

          <div style={{ flex: 1 }}>
            <b>{user.name || `HS-${user.mobile_number}`}</b>
            <p>Self</p>
          </div>

          <button onClick={() => setEditModal(true)}>✏️</button>
        </div>

        {open === "mother" && (
          <div style={styles.detailsBox}>
            <div style={styles.detailRow}>
              <span>Mobile</span>
              <span>{user.mobile_number}</span>
            </div>

            <div style={styles.detailRow}>
              <span>Cycle Length</span>
              <span>{cycleData?.cycleLength ?? "-"}</span>
            </div>

            <div style={styles.detailRow}>
              <span>Last Period</span>
              <span>{formatDate(cycleData?.lastPeriodDate)}</span>
            </div>
          </div>
        )}
      </div>

      <button style={styles.shareBtn} onClick={() => setShareModal(true)}>
        + Share Profile
      </button>

      <div style={styles.settingsCard}>
        <h4>Settings</h4>

        <Toggle label="Anonymous Mode" value={anonymous} set={setAnonymous} />
        <Toggle
          label="Notifications"
          value={notifications}
          set={setNotifications}
        />
        <Toggle label="Privacy Mode" value={privacy} set={setPrivacy} />

        <button style={styles.deleteBtn} onClick={() => setDeleteModal(true)}>
          Delete Account
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div style={styles.page}>
      {isDesktop && (
        <DesktopNavbar />
      )}

      <div
        style={
          isDesktop
            ? { maxWidth: 900, margin: "auto", padding: 40 }
            : styles.container
        }
      >
        {content}
      </div>

      {!isDesktop && <BottomNav active="Profile" />}

      {shareModal && (
        <Modal title="Share Profile" close={() => setShareModal(false)}>
          <input
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <button onClick={searchUser} style={styles.actionBtn}>
            Search
          </button>

          {searchResults.map((item) => (
            <div key={item.id} style={styles.resultRow}>
              <span>{item?.name}</span>
              <button onClick={() => { setShareModal(false); shareUser() }}>Share</button>
            </div>
          ))}
        </Modal>
      )}

      {editModal && (
        <Modal title="Edit Profile" close={() => setEditModal(false)}>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            style={styles.input}
          />

          <input
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            style={styles.input}
          />

          <button onClick={saveProfile} style={styles.actionBtn}>
            Save
          </button>
        </Modal>
      )}

      {deleteModal && (
        <Modal title="Why are you leaving?" close={() => setDeleteModal(false)}>
          {[
            "Privacy concerns",
            "App not useful",
            "Too many notifications",
            "Technical issues",
            "Other",
          ].map((r) => (
            <div
              key={r}
              onClick={() => setDeleteReason(r)}
              style={{
                ...styles.reasonItem,
                background: deleteReason === r ? "#fde7f1" : "#fff",
              }}
            >
              {r}
            </div>
          ))}

          <p style={{ fontSize: 12 }}>
            Your account will be permanently deleted after 7 days.
          </p>

          <button
            onClick={confirmDeleteAccount}
            style={styles.deleteConfirmBtn}
          >
            Delete
          </button>
        </Modal>
      )}
    </div>
  );
}

function Toggle({ label, value, set }) {
  return (
    <div style={styles.toggleRow}>
      <span>{label}</span>
      <input type="checkbox" checked={value} onChange={() => set(!value)} />
    </div>
  );
}

function Modal({ title, children, close }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalCard}>
        <h3>{title}</h3>
        {children}
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}



const styles = {
  page: { background: "#fff", minHeight: "100vh" },

  container: { maxWidth: 600, margin: "auto", padding: 20 },

  headerCard: {
    background: "#e1b8be",
    padding: 20,
    borderRadius: 20,
    textAlign: "center",
    marginBottom: 16,
  },

  logo: { width: 60, marginBottom: 10 },

  card: {
    background: "#e1b8be",
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },

  profileRow: { display: "flex", alignItems: "center", gap: 12 },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    background: "#f3c9dc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  detailsBox: { marginTop: 10 },

  detailRow: { display: "flex", justifyContent: "space-between", marginTop: 6 },

  shareBtn: {
    background: "#c2185b",
    color: "#fff",
    padding: 12,
    borderRadius: 16,
    border: "none",
    marginBottom: 16,
  },

  settingsCard: {
    background: "#f4f3f9",
    borderRadius: 20,
    padding: 16,
  },

  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },

  logoutBtn: {
    marginTop: 10,
    background: "#E53935",
    color: "#fff",
    padding: 10,
    border: "none",
    borderRadius: 10,
  },

  deleteBtn: {
    marginTop: 10,
    background: "#D32F2F",
    color: "#fff",
    padding: 10,
    border: "none",
    borderRadius: 10,
    marginRight: 20
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 20,
    width: 350,
  },

  input: {
    width: "90%",
    padding: 10,
    marginTop: 10,
    border: "1px solid #ddd",
    borderRadius: 10,
  },

  actionBtn: {
    marginTop: 10,
    padding: 10,
    background: "#c2185b",
    color: "#fff",
    border: "none",
    borderRadius: 10,
  },

  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },

  reasonItem: {
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 10,
    marginTop: 8,
    cursor: "pointer",
  },

  deleteConfirmBtn: {
    marginTop: 12,
    background: "#D32F2F",
    color: "#fff",
    padding: 10,
    border: "none",
    borderRadius: 10,
  },
};

const desktop = {
  navbar: {
    height: 70,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7a5c9e",
  },

  links: {
    display: "flex",
    gap: 30,
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