import { Home, Calendar, Sparkles, ClipboardList, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BottomNav({ active }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  const tabs = [
    { label: 'Home', route: '/home', icon: Home },
    { label: 'Calendar', route: '/calendar', icon: Calendar },
    { label: 'AI', route: '/ai', icon: Sparkles },
    { label: 'Log', route: '/log', icon: ClipboardList },
    { label: 'Profile', route: '/profile', icon: User },
  ];

  return (
    <div style={styles.nav}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.route;

        return (
          <button key={tab.route} style={styles.item} onClick={() => navigate(tab.route)}>
            <Icon size={24} color={isActive ? '#E76BA3' : '#9C8A95'} />

            <span
              style={{
                ...styles.label,
                color: isActive ? '#E76BA3' : '#9C8A95',
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#fff',
    borderTop: '1px solid #eee',
    zIndex: 100,
  },

  item: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },

  label: {
    fontSize: 11,
    marginTop: 4,
  },
};
