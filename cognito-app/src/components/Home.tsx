import { useEffect, useState } from 'react';
import { signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import './Home.css';

interface UserAttributes {
  email?: string;
  name?: string;
  picture?: string;
}

const Home = () => {
  const [user, setUser] = useState<UserAttributes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setUser({
        email: attributes.email,
        name: attributes.name,
        picture: attributes.picture,
      });
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="profile-section">
          {user?.picture && (
            <img
              src={user.picture}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <h1>Welcome, {user?.name || 'User'}!</h1>
          <p className="email">{user?.email}</p>
        </div>

        <div className="info-section">
          <h2>You're signed in!</h2>
          <p>This is a protected page that only authenticated users can see.</p>

          <div className="user-details">
            <h3>User Details:</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>

        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
