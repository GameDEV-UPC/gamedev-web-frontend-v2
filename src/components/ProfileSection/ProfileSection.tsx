import {User} from "@interfaces/User.tsx"
import "./ProfileSection.css";
import EffectText from "@components/EffectText/EffectText.tsx";

function ProfileSection({ user }: { user: User }) {
    return (
        <div className="section">
            <img
                src={user.profilePicture}
                alt={`Profile of ${user.username}`}
                className="profile-picture"
            />
            <div className="profile-text">
                <div className="profile-user">
                    <EffectText

                    >
                        {user.username}
                    </EffectText>
                </div>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <p>{user.email}</p>
            </div>
        </div>
    );
}

export default ProfileSection;