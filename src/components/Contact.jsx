import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "./Reveal";

// EmailJS setup — fully client-side email sending, no backend needed.
// See README.md → "Setting up email sending".
const EMAILJS_CONFIG = {
  publicKey: "HaKpRwUvnx7jFY-XB",
  serviceId: "service_ydpqcel",
  templateIdEnquiry: "template_6s9ncqh",
  templateIdSupport: "template_dzuitp2",
};

function isEmailjsConfigured() {
  return Object.keys(EMAILJS_CONFIG).every(
    (key) => EMAILJS_CONFIG[key] && EMAILJS_CONFIG[key].indexOf("YOUR_") !== 0
  );
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const REQUIRED_FIELDS = ["name", "email", "message"];

const MESSAGE_PLACEHOLDERS = {
  enquiry: "Tell us about your event, audience size, and goals...",
  support: "How can we help you today?",
};

export default function Contact() {
  const formRef = useRef(null);
  const [inquiryType, setInquiryType] = useState("enquiry");
  const [invalidFields, setInvalidFields] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | submitted | error

  useEffect(() => {
    if (isEmailjsConfigured()) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    } else {
      console.warn(
        "[Bhandarizee] Email sending isn't configured yet — the contact " +
          "form will show an error on submit until EMAILJS_CONFIG in " +
          'src/components/Contact.jsx is filled in. See README.md → "Setting up email sending".'
      );
    }
  }, []);

  function validate() {
    const form = formRef.current;
    const nextInvalid = {};
    let valid = true;

    REQUIRED_FIELDS.forEach((name) => {
      const field = form.elements[name];
      let fieldValid = field.value.trim().length > 0;
      if (name === "email" && fieldValid) fieldValid = isValidEmail(field.value.trim());
      if (!fieldValid) {
        nextInvalid[name] = true;
        valid = false;
      }
    });

    setInvalidFields(nextInvalid);
    return valid;
  }

  function clearInvalid(name) {
    setInvalidFields((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("idle");

    if (!validate()) return;

    const form = formRef.current;

    if (!isEmailjsConfigured()) {
      setStatus("error");
      return;
    }

    const templateParams = {
      inquiry_type:
        inquiryType === "enquiry" ? "Corporate or Training Enquiry" : "Support or Feedback",
      from_name: form.elements.name.value.trim(),
      from_email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim() || "Not provided",
      message: form.elements.message.value.trim(),
      company:
        inquiryType === "enquiry" ? form.elements.company.value.trim() || "Not provided" : "",
      event_date:
        inquiryType === "enquiry" ? form.elements.eventDate.value || "Not specified" : "",
      event_type: inquiryType === "enquiry" ? form.elements.eventType.value : "",
      time: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    };
    const templateId =
      inquiryType === "enquiry"
        ? EMAILJS_CONFIG.templateIdEnquiry
        : EMAILJS_CONFIG.templateIdSupport;

    setStatus("sending");

    emailjs
      .send(EMAILJS_CONFIG.serviceId, templateId, templateParams)
      .then(
        () => {
          setStatus("submitted");
          form.reset();
          setInquiryType("enquiry");
        },
        (err) => {
          console.error("[Bhandarizee] EmailJS send failed:", err);
          setStatus("error");
        }
      );
  }

  const submitLabel = status === "sending" ? "Sending..." : "Send Message";

  return (
    <section className="contact" id="contact">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow center light">
            <span className="eyebrow-line"></span> Contact
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center light">
            Let's Create Something <span className="accent">Extraordinary</span>
          </h2>
          <p className="section-sub light">
            Tell us about your event and we'll get back to you within 24
            hours.
          </p>
        </Reveal>

        <div className="contact-layout">
          <Reveal className="contact-info">
            <div className="contact-info-item">
              <span className="contact-icon">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Email</strong>
                <a href="mailto:hello@bhandarizee.com">hello@bhandarizee.com</a>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M4 4h3.5l2 5-2 1.5a12 12 0 0 0 6 6L15 14l5 2v3.5a2 2 0 0 1-2 2C10.5 21.5 2.5 13.5 2.5 6a2 2 0 0 1 1.5-2Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Phone</strong>
                <a href="tel:+910000000000">+91 00000 00000</a>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9.5" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <div>
                <strong>Location</strong>
                <span>Available worldwide</span>
              </div>
            </div>

            <div className="contact-social">
              <a href="#" aria-label="Facebook" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M14 9h3V6h-3c-2 0-3.5 1.6-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.6c0-.4.3-.6.5-.6Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Twitter / X" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="m3 3 7.3 9.6L3.4 21H6l5.8-6.7L16.4 21H21l-7.7-10.1L20.3 3H17.7l-5.3 6.1L8.1 3H3Zm3.4 1.6h2l9.2 12.8h-2L6.4 4.6Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M4.5 3.7a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3 9h3v12H3V9Zm6 0h2.9v1.6h.04c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2 3.8 4.6V21h-3v-6.1c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9V9Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <rect x="2.5" y="6" width="19" height="12" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal
            as="form"
            className={`contact-form${status === "submitted" ? " submitted" : ""}${
              status === "error" ? " send-error" : ""
            }`}
            delay="0.15s"
            id="contactForm"
            data-type={inquiryType}
            noValidate
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div
              className="inquiry-toggle"
              id="inquiryToggle"
              data-active={inquiryType}
              role="tablist"
              aria-label="Message type"
            >
              <button
                type="button"
                className={`inquiry-option${inquiryType === "enquiry" ? " active" : ""}`}
                data-type="enquiry"
                role="tab"
                aria-selected={inquiryType === "enquiry"}
                onClick={() => setInquiryType("enquiry")}
              >
                Corporate / Training Enquiry
              </button>
              <button
                type="button"
                className={`inquiry-option${inquiryType === "support" ? " active" : ""}`}
                data-type="support"
                role="tab"
                aria-selected={inquiryType === "support"}
                onClick={() => setInquiryType("support")}
              >
                Support / Feedback
              </button>
              <span className="inquiry-slider" aria-hidden="true"></span>
            </div>
            <input type="hidden" name="inquiryType" id="inquiryType" value={inquiryType} readOnly />

            <div className="form-row">
              <div className={`form-group${invalidFields.name ? " invalid" : ""}`}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  onInput={() => clearInvalid("name")}
                />
                <span className="form-error">Please enter your name.</span>
              </div>
              <div className={`form-group${invalidFields.email ? " invalid" : ""}`}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  onInput={() => clearInvalid("email")}
                />
                <span className="form-error">Please enter a valid email.</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" placeholder="+91 00000 00000" />
            </div>

            <div className="corporate-only">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Your company or organization"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventDate">Event Date</label>
                  <input type="date" id="eventDate" name="eventDate" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="eventType">Event Type</label>
                <select id="eventType" name="eventType" defaultValue="corporate">
                  <option value="corporate">Corporate Event</option>
                  <option value="college">College / School</option>
                  <option value="conference">Conference / Seminar</option>
                  <option value="virtual">Virtual Session</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className={`form-group${invalidFields.message ? " invalid" : ""}`}>
              <label htmlFor="message" id="messageLabel">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder={MESSAGE_PLACEHOLDERS[inquiryType]}
                onInput={() => clearInvalid("message")}
              ></textarea>
              <span className="form-error">Please add a short message.</span>
            </div>
            <button type="submit" className="btn btn-primary form-submit" disabled={status === "sending"}>
              <span className="btn-label">{submitLabel}</span>
            </button>
            <p className="form-success" id="formSuccess" role="status">
              Thank you! Your message has been received — we'll be in touch
              soon.
            </p>
            <p className="form-error-banner" id="formErrorBanner" role="alert">
              Something went wrong sending your message. Please try again, or
              email us directly at{" "}
              <a href="mailto:hello@bhandarizee.com">hello@bhandarizee.com</a>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
