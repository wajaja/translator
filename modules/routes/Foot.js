import React        from 'react'
import { Link }     from 'react-router-dom'
import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  RedditShareCount,

  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  RedditIcon,
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
                                <div className="clss-network">
                                    <LinkedinShareButton
                                        url={shareUrl}
                                        title={title}
                                        windowWidth={750}
                                        windowHeight={600}
                                        className="clss-network__share-button">
                                        <LinkedinIcon
                                            size={32}
                                            round />
                                    </LinkedinShareButton>
                                    <LinkedinShareCount
                                        url={shareUrl}
                                        className="clss-network__share-count">
                                        {count => count}
                                    </LinkedinShareCount>
                                </div>
                                <div className="clss-network">
                                    <GooglePlusShareButton
                                        url={shareUrl}
                                        className="clss-network__share-button">
                                        <GooglePlusIcon
                                          size={32}
                                          round />
                                    </GooglePlusShareButton>
                                    <GooglePlusShareCount
                                        url={shareUrl}
                                        className="clss-network__share-count">
                                        {count => count}
                                      </GooglePlusShareCount>
                                </div>
                                <div className="clss-network">
                                    <RedditShareButton
                                        url={shareUrl}
                                        title={title}
                                        windowWidth={660}
                                        windowHeight={460}
                                        className="clss-network__share-button">
                                        <RedditIcon
                                            size={32}
                                            round />
                                  </RedditShareButton>

                                  <RedditShareCount url={shareUrl}
                                    className="clss-network__share-count" />
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
