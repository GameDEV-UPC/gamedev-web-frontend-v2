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
                        fontSize="1rem"
                        pixelMode
                        borderOffset={5.0}


                    >
                        {user.username}
                    </EffectText>
                </div>
                <div className="info-container">
                    <div className="info">
                        <EffectText
                            fontSize="0.8rem"
                        >
                            First Name:
                        </EffectText>
                        <EffectText
                            fontSize="0.8rem"
                        >
                            {`${user.firstName}`}
                        </EffectText>
                    </div>
                    <div className="info">
                        <EffectText
                            fontSize="0.8rem"
                        >
                            Last Name:
                        </EffectText>
                        <EffectText
                            fontSize="0.8rem"
                        >
                            {` ${user.lastName}`}
                        </EffectText>
                    </div>
                    <div className="info">
                        <EffectText
                            fontSize="0.8rem"
                        >
                            Email:
                        </EffectText>
                        <EffectText
                            fontSize="0.8rem"
                        >
                            {`${user.email}`}
                        </EffectText>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileSection;