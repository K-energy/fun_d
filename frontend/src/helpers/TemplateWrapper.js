import React from "react";
import { Navbar } from '../components';

const TemplateWrapper = (Main) => (
    (props) => (
        <section>
            <Navbar />
            <Main {...props} />
        </section>
    )
);

export default TemplateWrapper;