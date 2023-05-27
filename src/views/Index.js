import React from "react";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
// sections for this page/view
import JavaScript from "views/IndexSections/JavaScript.js";
import { useState } from "react";
import Loading from "components/LoadingScreen/Loading";
import Modal2 from "./IndexSections/Modal/Modal2";
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
          <Modal2
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
