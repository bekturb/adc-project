import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import BgImage from "../../static/img/architecture-bg.png"
import {Link} from "react-router-dom";
import {Blurhash} from "react-blurhash";
import "../../styles/home.scss"

const Home = () => {

    const [imageLoaded , setImageLoaded] = useState(false)

    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setImageLoaded(true)
        }
        image.src = BgImage
    }, [BgImage])

    return (
        <Helmet title="Home">
            <section className="hero">
                <div className="overlay hero__overlay"></div>
                <div className="hero__image">
                    {
                        !imageLoaded && (
                            <Blurhash
                                hash="LEHLh[WB2yk8pyoJadR*.7kCMdnj"
                                width="100%"
                                height="100vh"
                                resolutionX={32}
                                resolutionY={32}
                                punch={1}
                            />
                        )
                    }
                    {
                        imageLoaded && (
                            <img className="hero__img" src={BgImage} alt=""/>
                        )
                    }
                </div>
                <div className="hero__content">
                    <div className="container">
                        <div className="hero__description">
                            <div className="main-title hero__main-title">
                            <span className="main-title__title-hero">
                                ADC
                            </span>
                                <h1 className="main-title__desc-hero">реализует вашу мечту</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero__nav">
                    <div className="container">
                        <div className="hero__items">
                            <div className="hero__item">
                                <Link to="/architecture" className="hero__link">
                                    <h3 className="hero__category">AРХИТЕКТУРА</h3>
                                </Link>
                            </div>
                            <div className="hero__item">
                                <Link to="/design" className="hero__link">
                                    <h3 className="hero__category">ДИЗАЙН</h3>
                                </Link>
                            </div>
                            <div className="hero__item">
                                <Link to="/construction" className="hero__link">
                                    <h3 className="hero__category">СТРОЙКА</h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Home;