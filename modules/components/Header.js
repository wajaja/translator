import React        from 'react'
import { Link }     from 'react-router-dom'

const Header = (props) => {
    return(
        <nav  className="navbar navbar-default navbar-fixed-top">
        	<div className="container">
        		<div className="navbar-header">
                    <div className="navbar-brand">
                        <Link to="/" className="bar-brand-txt">
                            <h1>XYZ Traduction</h1>
                        </Link>
                    </div>
                </div>
	            <div className="navbar-rght">
                    <div className="global-content">
                        <div className="global-brand">
                        </div>
                        <div className="global-nav-right">
                            <div className="global-nav-right-in">
                                <div className="navs-lk">
                                    <Link to="/" className="gb-nv-ho">
                                        <span className="auto-ico"></span>
                                        <h4 className="auto-txt">Text</h4>
                                    </Link>
                                </div>
                                <div className="navs-lk">
                                    <Link to="/interveners" className="gb-nv-ho">
                                        <span className="interv-ico"></span>
                                        <h4 className="interv-txt">Intervenant</h4>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="rgth-in-nav">
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;
