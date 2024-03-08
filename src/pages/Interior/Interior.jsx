import React, {useMemo} from 'react';
import Helmet from "../../layout/Helmet";
import Common from "../../components/Common";
import bgImage from "../../static/img/interiorbg.png";
import useParallax from "../../CustomHooks/useParallaxHook";
import ShortDesc from "../../components/ShortDesc";
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import CardItems from "../../components/CardItems";
import '../../styles/interior.scss'
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";

const Interior = () => {
    const {isVisible, bgParallaxStyle} = useParallax()
    const {data, isLoading, isError, error} = useProjectsData();

    const house = {
        title: "ВЫ МОЖЕТЕ НАЙТИ ВЕСЬ НА ПРОЕКТ",
        category: "design",
        imageType: "interior",
        subtitle: "ИНТЕРЬЕР",
        shortTitle: "Дизайн экстерьра",
        shortDesc: "Дом должен выделяться и быть особенным не только изнутри, но и снаружи. Мы сделаем так, чтобы он приковывал к себе внимание"
    }

    const filteredProducts = useMemo(() => {
        let filteredProducts = [];

        if (data?.data) {
            filteredProducts = data?.data.filter((product) =>
                product.category.name.toLowerCase() === house.category.toLowerCase()
            );
        }

        return filteredProducts;
    }, [data?.data]);

    return (
        <Helmet title="Interior">
            <Common house={house} bgImage={bgImage} isVisible={isVisible} bgParallaxStyle={bgParallaxStyle}/>
            <section className="short-desc" style={bgParallaxStyle}>
                <div className="container">
                    <ShortDesc house={house}/>
                    <div className="card">
                        <div className="row card__row">
                            {
                                isLoading && <div className="card__result">
                                    <Loader/>
                                </div>
                            }
                            {
                                isError && <div className="card__result">
                                    <Error status={error?.status} page={error?.message}/>
                                </div>
                            }
                            {
                                filteredProducts.length > 0 && filteredProducts.map(product => (
                                    <CardItems key={product._id} project={product} imageType={house.imageType}/>
                                ))
                            }
                            {
                                !isLoading && !isError && filteredProducts.length === 0 && <div className="card__result">
                                    <EmptyItems />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Interior;