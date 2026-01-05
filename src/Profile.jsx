import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <p>Please login</p>;

  return (
    <div className="profile-page">
      <img
        src={user.profile}
        alt="profile"
        className="profile-big-img"
      />
      <h2>{user.fullName}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
};

export default Profile;
