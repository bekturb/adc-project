import React from 'react';
import Helmet from "../../layout/Helmet";
import Contact from "../../components/Contact";
import Footer from "../../layout/Footer";
import "../../styles/contacts.scss"

const Contacts = () => {
    return (
        <Helmet title="Contacts">
            <section className="contacts">
                <div className="container">
                    <Contact />
                </div>
            </section>
            <Footer />
        </Helmet>
    );
};

export default Contacts;