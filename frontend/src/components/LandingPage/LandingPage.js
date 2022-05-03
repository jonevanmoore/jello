import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="home-body-div">
            <div className="home-top-div">
                <div className="logo-div">
                    <img src='/logo-dark.png' className='dark-logo' />
                </div>
                <div className="user-buttons-div">
                    <button className='demo-btn'>Demo User</button>
                    <button className='login-btn green-btn'>Log In</button>
                    <button className='signup-btn green-btn'>Sign Up</button>
                </div>
            </div>
            <div className='home-bottom-div'>
                <p><span id="bulk">Jell-O</span> is a variety of gelatin desserts, puddings, and no-bake cream pies</p>
                <p><span id="bulk">Trello</span> is a popular, simple-to-use collaboration tool that enables you to organize projects and everything related to them into boards</p>
                <p>When you mix both, you get <span id="bulk">Jello</span>, a cuter Trello</p>
            </div>
        </div>
    )
}

export default LandingPage;
