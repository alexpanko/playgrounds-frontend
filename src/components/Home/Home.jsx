import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="container-fluid">
            <video playsInline autoPlay muted loop id="myVideo">
                {/* <source src="/images/playgrounds.webm" type="video/webm" /> */}
                <source src="/images/playgrounds.mp4" type="video/mp4" />
            </video>
            <header className="viewport-header">
                <div className="row">
                    <div className="col">
                        <div>
                            <h1 className="display-3 text-brown highlight-title title-mob">
                                Playgrounds in Amsterdam
                            </h1>
                        </div>
                        {/* <div>
                            <h1 className="text-brown">
                                <span className="highlight">Find playground near you</span>
                            </h1>
                        </div> */}
                        <div>
                            <Link className="btn btn-info btn-lg mt-5 mx-3 width-150" to="/signup">Signup</Link>
                            <Link className="btn btn-secondary btn-lg mt-5 mx-3 width-150" to="/login">Login</Link>
                            {/* <Switch> */}
                                {/* <Route path='/login' render={() => <Login setUser={this.setUser} />} /> */}
                                {/* <Route path='/signup' component={Signup} /> */}
                            {/* </Switch> */}
                        </div>
                    </div>
                </div>
                
                </header>
        </div>
    )
}
