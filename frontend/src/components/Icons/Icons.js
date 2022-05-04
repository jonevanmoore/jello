import { avatars } from "../../context/Avatar";
import './Icons.css'

export const Icons = ({ avatarId, setAvatarId }) => {

    const updateAvatarId = (e) => {
        setAvatarId(e.target.value)
    };

    return (
        <div className='radio-div'>
            <label id="avatar-label">Avatar</label>
            <div className='icon-loop'>
                {Object.values(avatars).map((avatar, i) => (
                    <div id='radio-jello-div'>
                        <label>
                            <input
                                type='radio'
                                name='avatarId'
                                onChange={updateAvatarId}
                                value={i + 1}
                            ></input>
                            <img
                                src={`${avatar.imageUrl}`}
                                id="radio-icon"
                                style={{ backgroundColor: avatarId == i + 1 ? avatar.color : '' }}
                            />
                        </label>
                    </div>
                ))}
            </div>

        </div>

    )
}
