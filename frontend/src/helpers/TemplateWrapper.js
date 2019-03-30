import React from "react";
import { Navbar, Footer } from '../components';

const TemplateWrapper = (Main) => (
    (props) => (
        <section>
            <Navbar />
            <Main {...props} />
            <Footer />
        </section>
    )
);

export default TemplateWrapper;