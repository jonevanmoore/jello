import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="home-body-div">
            <div className="top-bottom-div">

                <div className="home-top-div">
                    <div className="logo-div">
                        <img src='/logo-dark.png' className='dark-logo' />
                    </div>
                    <div className="user-buttons-div">
                        <button className='demo-btn jello-wiggle button__shine__short'>Demo User</button>
                        <button className='login-btn green-btn jello-wiggle button__shine__long__green'>Log In</button>
                        <button className='signup-btn green-btn jello-wiggle button__shine__long__green'>Sign Up</button>
                    </div>
                </div>
                <div className='home-bottom-div'>
                    <p><span id="bulk">Jell-O</span> is a variety of gelatin desserts, puddings, and no-bake cream pies</p>
                    <p><span id="bulk">Trello</span> is a popular, simple-to-use collaboration tool that enables you to organize projects and everything related to them into boards</p>
                    <p id="get-both-text">When you mix both... you get <span id="bulk">Jello</span>, a cuter Trello</p>
                </div>
                <div className="coder-profiles">

                    <div className="coder">
                        <a target="_blank" href="github.com">
                            <img src="/jello9.png" className="coder-img jello-wiggle"></img>
                        </a>
                        <span>Daniel Blanco</span>
                    </div>
                    <div className="coder">
                        <a target="_blank" href="">
                            <img src="/jello6.png" className="coder-img jello-wiggle"></img>
                        </a>
                        <span>Jon Moore</span>
                    </div>

                    <div className="coder">
                        <a target="_blank" href="">
                            <img src="/jello3.png" className="coder-img jello-wiggle"></img>
                        </a>
                        <span>Mason Kogami</span>
                    </div>

                    <div className="coder">
                        <a target="_blank" href="">
                            <img src="/jello5.png" className="coder-img jello-wiggle"></img>
                        </a>
                        <span>Nicholas Yuan</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LandingPage;
