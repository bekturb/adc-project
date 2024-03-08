import React, {useEffect, useState} from 'react';
import ArrowIcon from "../../Ui/ArrowIcon/ArrowIcon";
import "./common.scss";
import {Blurhash} from "react-blurhash";

const Common = ({house, bgImage, bgParallaxStyle, isVisible, handleScroll}) => {

    const [imageLoaded , setImageLoaded] = useState(false)

    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setImageLoaded(true)
        }
        image.src = bgImage
    }, [bgImage])

    return (
        <section className="common">
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
                    <img className="common__background" src={bgImage} alt="architecture-bg"/>
                )
            }
            <div className="container">
                <div style={bgParallaxStyle} className="common__wrapper">
                    <div className="common__inner">
                        <h2 className="common__title">{house.title}</h2>
                        <p className="common__subtitle">{house.subtitle}</p>
                    </div>
                </div>
                {
                    handleScroll ? <ArrowIcon isVisible={isVisible} handleScroll={handleScroll}/> : null
                }
            </div>
        </section>
    );
};

export default Common;