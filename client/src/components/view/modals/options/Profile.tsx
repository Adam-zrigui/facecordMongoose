import useAuthContext from "@/components/context/authContext";

export const ProfileModal = () => {
  const {user} = useAuthContext();

  return (
    <div>
      <h2>My Profile</h2>

      <section>
        <img src={user?.photo} alt="profile image" />

        <div>
          <h3>Id: {user?.id}</h3>
          <h3>Username: {user?.username}</h3>
        </div>
      </section>
    </div>
  );
};
