
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import ThankYou from "../ThankYou";

const Contact = () => {
  const [state, handleSubmit] = useForm("mojbyjkw");
  if (state.succeeded) {
    return <ThankYou redirectTo="/" />;
  }
  return (
    <section id="contact" className="section contact-section py-5">
      <div className="container">
        <div className="row g-5">
          {/* Left Side: Label & Heading */}
          <div className="col-lg-4">
            <span className="section-label text-uppercase">CONTACT</span>
            <h2 className="contact-heading">
              Let's
              <span className="text-gradient-purple-subtle">Talk</span>
            </h2>
            <div className="contact-info-cards mt-5">
              <div className="glass-card p-4 rounded-4 mb-4 contact-card">
                <div className="d-flex align-items-start gap-3">
                  <div className="contact-icon-box">
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div>
                    <p className="text-uppercase text-secondary mb-1 small fw-bold">Mail Me</p>
                    <p className="mb-0">aeadikanemmanuel@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-4 contact-card">
                <div className="d-flex align-items-start gap-3">
                  <div className="contact-icon-box">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div>
                    <p className="text-uppercase text-secondary mb-1 small fw-bold">Contact Me</p>
                    <p className="mb-0">+234 903 858 5075</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="col-lg-8">
            <div className="glass-card p-4 rounded-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Name*"
                    className="form-control glass-input"
                  />
                </div>

                <div className="mb-3">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="Email*"
                    className="form-control glass-input"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Message*"
                    className="form-control glass-input"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="btn w-100 py-2 glass-btn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
