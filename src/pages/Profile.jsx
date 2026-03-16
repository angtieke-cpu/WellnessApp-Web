import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cycleData, setCycleData] = useState(null);

  const [open, setOpen] = useState('mother');

  const [shareModal, setShareModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [phone, setPhone] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [sharedProfiles, setSharedProfiles] = useState([]);

  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const [deleteReason, setDeleteReason] = useState('');

  const [anonymous, setAnonymous] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');

      const res = await fetch('https://her-solace-api.vercel.app/api/user/user-details', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (result.success) {
        setUser(result.data);
        setEditName(result.data.name);
        setEditEmail(result.data.email);
      }
    };

    const getCycleDetails = async () => {
      const token = localStorage.getItem('token');

      const res = await fetch('https://her-solace-api.vercel.app/api/cycle/cycle-details', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (result.success) {
        setCycleData(result);
      }
    };
    getUser();
    getCycleDetails();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('https://her-solace-api.vercel.app/api/user/user-details', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();

    if (result.success) {
      setUser(result.data);
      setEditName(result.data.name);
      setEditEmail(result.data.email);
    }
  };

  const searchUser = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch(`https://her-solace-api.vercel.app/api/user/search?phone=${phone}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();

    if (result.success) {
      setSearchResults(result.data);
    }
  };

  const shareProfile = (profile) => {
    setSharedProfiles([...sharedProfiles, profile]);
    setShareModal(false);
  };

  const saveProfile = async () => {
    const token = localStorage.getItem('token');

    await fetch('https://her-solace-api.vercel.app/api/user/user-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: user.id,
        name: editName,
        email: editEmail,
        mobile_number: user.mobile_number,
      }),
    });

    setEditModal(false);
    getUser();
  };

  const confirmDeleteAccount = () => {
    alert('Your account will be deleted after 7 days. Login again before that to cancel deletion.');

    localStorage.clear();
    navigate('/');
  };

  const handleLogout = () => {
    if (window.confirm('Logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  const toggleCard = (key) => {
    setOpen(open === key ? null : key);
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}

        <div style={styles.headerCard}>
          <img src="/logo.png" style={styles.logo} />

          <h3 style={{ color: '#fff' }}>Her Solace</h3>

          <p style={{ color: '#fff' }}>Decode Hormones — Discover You</p>
        </div>

        {/* PROFILE */}

        <div style={styles.card}>
          <div style={styles.profileRow} onClick={() => toggleCard('mother')}>
            <div style={styles.avatar}>{user.name?.[0]}</div>

            <div style={{ flex: 1 }}>
              <b>{user.name || `HS-${user.mobile_number}`}</b>
              <p>Self</p>
            </div>

            <button onClick={() => setEditModal(true)}>✏️</button>
          </div>

          {open === 'mother' && (
            <div style={styles.detailsBox}>
              <div style={styles.detailRow}>
                <span>Mobile</span>
                <span>{user.mobile_number}</span>
              </div>

              <div style={styles.detailRow}>
                <span>Cycle Length</span>
                <span>{cycleData?.cycleLength ?? '-'}</span>
              </div>

              <div style={styles.detailRow}>
                <span>Last Period</span>
                <span>{formatDate(cycleData?.lastPeriodDate)}</span>
              </div>
            </div>
          )}
        </div>

        {/* SHARE */}

        <button style={styles.shareBtn} onClick={() => setShareModal(true)}>
          + Share Profile
        </button>

        {/* SETTINGS */}

        <div style={styles.settingsCard}>
          <h4>Settings</h4>

          <Toggle label="Anonymous Mode" value={anonymous} set={setAnonymous} />
          <Toggle label="Notifications" value={notifications} set={setNotifications} />
          <Toggle label="Privacy Mode" value={privacy} set={setPrivacy} />

          <button style={styles.deleteBtn} onClick={() => setDeleteModal(true)}>
            Delete Account
          </button>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* SHARE MODAL */}

      {shareModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3>Share Profile</h3>

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
                <span>{item.id}</span>
                <button onClick={() => shareProfile(item)}>Share</button>
              </div>
            ))}

            <button onClick={() => setShareModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}

      {editModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3>Edit Profile</h3>

            <input value={editName} onChange={(e) => setEditName(e.target.value)} style={styles.input} />

            <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} style={styles.input} />

            <button onClick={saveProfile} style={styles.actionBtn}>
              Save
            </button>

            <button onClick={() => setEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {deleteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3>Why are you leaving?</h3>

            {['Privacy concerns', 'App not useful', 'Too many notifications', 'Technical issues', 'Other'].map((r) => (
              <div
                key={r}
                onClick={() => setDeleteReason(r)}
                style={{
                  ...styles.reasonItem,
                  background: deleteReason === r ? '#fde7f1' : '#fff',
                }}
              >
                {r}
              </div>
            ))}

            <p style={{ fontSize: 12 }}>Your account will be permanently deleted after 7 days.</p>

            <button onClick={confirmDeleteAccount} style={styles.deleteConfirmBtn}>
              Delete
            </button>

            <button onClick={() => setDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <BottomNav active="Profile" />
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

const styles = {
  page: { background: '#fff', minHeight: '100vh' },

  container: { maxWidth: 600, margin: 'auto', padding: 20 },

  headerCard: {
    background: '#e1b8be',
    padding: 20,
    borderRadius: 20,
    textAlign: 'center',
    marginBottom: 16,
  },

  logo: { width: 60, marginBottom: 10 },

  card: {
    background: '#e1b8be',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },

  profileRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    background: '#f3c9dc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsBox: { marginTop: 10 },

  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  shareBtn: {
    background: '#c2185b',
    color: '#fff',
    padding: 12,
    borderRadius: 16,
    border: 'none',
    marginBottom: 16,
  },

  settingsCard: {
    background: '#f4f3f9',
    borderRadius: 20,
    padding: 16,
  },

  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  logoutBtn: {
    marginTop: 10,
    background: '#E53935',
    color: '#fff',
    padding: 10,
    border: 'none',
    borderRadius: 10,
  },

  deleteBtn: {
    marginTop: 10,
    background: '#D32F2F',
    color: '#fff',
    padding: 10,
    border: 'none',
    borderRadius: 10,
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    background: '#fff',
    padding: 20,
    borderRadius: 20,
    width: 350,
  },

  input: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    border: '1px solid #ddd',
    borderRadius: 10,
  },

  actionBtn: {
    marginTop: 10,
    padding: 10,
    background: '#c2185b',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
  },

  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  reasonItem: {
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 10,
    marginTop: 8,
    cursor: 'pointer',
  },

  deleteConfirmBtn: {
    marginTop: 12,
    background: '#D32F2F',
    color: '#fff',
    padding: 10,
    border: 'none',
    borderRadius: 10,
  },
};
