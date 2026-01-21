import { useEffect, useState } from 'react';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import './Profile.css';

interface UserProfile {
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  sub?: string;
  email_verified?: boolean;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState<any>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // Fetch session info and get user data from ID token
      const session = await fetchAuthSession();

      // Get user attributes from ID token payload
      const idToken = session.tokens?.idToken;
      if (idToken) {
        const payload = idToken.payload;
        setProfile({
          email: payload.email as string,
          name: payload.name as string,
          given_name: payload.given_name as string,
          family_name: payload.family_name as string,
          picture: payload.picture as string,
          sub: payload.sub as string,
          email_verified: payload.email_verified as boolean,
        });
      }

      setSessionInfo({
        accessToken: session.tokens?.accessToken ? 'Present' : 'Not available',
        idToken: session.tokens?.idToken ? 'Present' : 'Not available',
        identityId: session.identityId || 'Not available',
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
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
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            {profile?.picture ? (
              <img src={profile.picture} alt={profile.name || 'User'} />
            ) : (
              <div className="avatar-placeholder">
                {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <h1>{profile?.name || 'User'}</h1>
          <p className="profile-email">{profile?.email}</p>
          {profile?.email_verified && (
            <span className="verified-badge">✓ Verified</span>
          )}
        </div>

        {/* Profile Information Cards */}
        <div className="profile-cards">
          {/* Personal Information */}
          <div className="profile-card">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <span>{profile?.name || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <label>First Name</label>
                <span>{profile?.given_name || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <label>Last Name</label>
                <span>{profile?.family_name || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <span>{profile?.email || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="profile-card">
            <h2>Account Details</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>User ID</label>
                <span className="user-id">{profile?.sub || 'Not available'}</span>
              </div>
              <div className="info-item">
                <label>Email Verified</label>
                <span className={profile?.email_verified ? 'status-active' : 'status-inactive'}>
                  {profile?.email_verified ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="info-item">
                <label>Access Token</label>
                <span className="status-active">{sessionInfo?.accessToken}</span>
              </div>
              <div className="info-item">
                <label>ID Token</label>
                <span className="status-active">{sessionInfo?.idToken}</span>
              </div>
            </div>
          </div>

          {/* Raw User Attributes */}
          <div className="profile-card">
            <h2>Raw User Attributes</h2>
            <div className="code-block">
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button className="btn-secondary" onClick={() => window.location.reload()}>
            Refresh Profile
          </button>
          <button className="btn-danger" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
