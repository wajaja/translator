import React        from 'react'
import { Link }     from 'react-router-dom'
import {
  FacebookShareCount,
  GooglePlusShareCount,

  FacebookShareButton,
  TwitterShareButton,

  FacebookIcon,
  TwitterIcon
} from 'react-share';

const Foot = ({}) => {
    const shareUrl = "https://traduction.xyz";
    const title="Traduction";
    return (
        <div className="foo">
            <div className="foo-a">
                <div className="foo-lft">
                    <div className="foo-opt">
                        <Link to="/about">À propos de la Traduction</Link>
                    </div>
                    <div className="foo-opt">
                        <Link to="/privacy">Confidentialité et conditions d'utilisation</Link>
                    </div>
                </div>
                <div className="foo-rght">
                    <div className="foo-opt">
                        <Link to="/help">Aide</Link>
                    </div>
                    <div className="foo-opt">
                        @copyright . 2018
                    </div>
                    <div className="foo-opt">
                        {typeof window !== 'undefined' &&
                            <div className="foo-opt-sh">
                                <div className="clss-network">
                                    <FacebookShareButton
                                        url={shareUrl}
                                        quote={title}
                                        className="clss-network__share-button">
                                        <FacebookIcon
                                            size={32}
                                            round />
                                  </FacebookShareButton>
                                  <FacebookShareCount
                                        url={shareUrl}
                                        className="clss-network__share-count">
                                        {count => count}
                                        </FacebookShareCount>
                                </div>
                                <div className="clss-network">
                                    <TwitterShareButton
                                        url={shareUrl}
                                        title={title}
                                        className="clss-network__share-button">
                                        <TwitterIcon
                                            size={32}
                                            round />
                                    </TwitterShareButton>

                                    <div className="clss-network__share-count">
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Foot
