import React        from 'react'
import { Link }     from 'react-router-dom'

const Header = (props) => {

    return(
        <nav  className="navbar navbar-default navbar-fixed-top">
        	<div className="container">
        		<div className="navbar-header">
                    <div className="navbar-brand">
                        <Link to="/" className="bar-brand-txt">
                            <span className="brand-ico"></span>
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
                                        <span className="auto-txt">Text</span>
                                    </Link>
                                </div>
                                <div className="navs-lk">
                                    <Link to="/interveners" className="gb-nv-int">
                                        <span className="interv-ico"></span>
                                        <span className="interv-txt">Intervenant</span>
                                    </Link>
                                </div>
                                {!props.isAuthenticated &&
                                    <div className="navs-lk">
                                        <Link to="/login" className="gb-nv-btn">
                                            Connexion
                                        </Link>
                                    </div>
                                }
                                {!props.isAuthenticated &&
                                    <div className="navs-lk">
                                        <Link to="/signup" className="gb-nv-btn">
                                            Inscription
                                        </Link>
                                    </div>
                                }
                                
                                {props.isAuthenticated &&
                                    <div className="navs-lk">
                                        <div className="gb-nv-btn">
                                            {props.user.name}
                                        </div>
                                    </div>
                                }
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
