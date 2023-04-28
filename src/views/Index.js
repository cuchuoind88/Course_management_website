/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// sections for this page/view
import JavaScript from "views/IndexSections/JavaScript.js";
import Modal_custom from "./IndexSections/Modal/Modal";
import { useState } from "react";
import Loading from "components/LoadingScreen/Loading";
export default function Index() {
  const [formModal, setFormModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <IndexNavbar formModal={formModal} setFormModal={setFormModal} />
          <Modal_custom
            loading={loading}
            setLoading={setLoading}
            formModal={formModal}
            setFormModal={setFormModal}
            error={err}
            setError={setErr}
          />
          <div className="wrapper">
            <PageHeader />
            <div className="main">
              <JavaScript formModal={formModal} setFormModal={setFormModal} />
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
