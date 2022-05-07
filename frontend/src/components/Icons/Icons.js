import { avatars } from "../../context/Avatar";
import './Icons.css'

export const Icons = ({ avatarId, setAvatarId, avatarError, setAvatarError }) => {

    const updateAvatarId = (e) => {
        setAvatarId(e.target.value)
    };

    return (
        <div className='radio-div'>
            <div className="justify_right_label" >
                <div id="avatar-label">Avatar</div>
                <div>
                    <i className="fa-solid fa-circle-check avatar-check" id={avatarError}></i>
                </div>
            </div>
            <div className='icon-loop'>
                {Object.values(avatars).map((avatar, i) => (
                    <div id='radio-jello-div' key={i}>
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
                                alt="avatar"
                                style={{ backgroundColor: +avatarId === i + 1 ? avatar.color : '' }}
                            />
                        </label>
                    </div>
                ))}
            </div>

        </div>

    )
}
