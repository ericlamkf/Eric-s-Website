import React, { useState, useCallback } from 'react'
import NotificationCard from '../NotificationCard/NotificationCard'
import './Contact.css'

const Contact = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });

    const handleMiss = useCallback(() => {
        setShowNotification(false);
    }, [])

    const hyperlinkGithub = () => {
        if (window.confirm("Wanna visit my Github Profile ?")) {
            window.open("https://github.com/ericlamkf", "_blank")
        }
    }

    const emailMe = () => {
        if (window.confirm("Wanna Email Me ?")) {
            window.open("https://mail.google.com/mail/?view=cm&fs=1&to=linj361@gmail.com&su=Response%20From%20Portfolio%20Website❤️&body=Message%20Here", "_blank")
        }
    }

    const handleCopy = () => {
        const text = "01111905117"
        navigator.clipboard.writeText(text).then(() => {
            alert("Phone Number copied to the clipboard !")
        }).catch((e) => {
            console.error("Failed to copy phone number! Try Again.")
        })
    }

    const [sendState, setSendState] = useState("");

    const [result, setResult] = React.useState("");

    const validateForm = (formData) => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;

        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();

        if (!name) {
            newErrors.name = 'Name is required.';
            isValid = false;
        }

        if (!email) {
            newErrors.email = 'Email address is required.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!message) {
            newErrors.message = 'Message cannot be empty.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleFieldChange = (field) => {
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (!validateForm(formData)) return;

        setResult("Sending....");
        setSendState("orange");

        formData.append("access_key", "b8e31cd4-4f2c-4bd0-a5b9-681da7cee7cb");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            setShowNotification(true);
            setSendState("green");
            setErrors({ name: '', email: '', message: '' });
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className='contact'>
            <div className="left">
                <ul>
                    <li onClick={handleCopy}><i class="fa-solid fa-phone-volume"></i> +60 1111905117</li>
                    <li onClick={emailMe}><i class="fa-solid fa-envelope"></i> linj361@gmail.com</li>
                    <li onClick={hyperlinkGithub}><i class="fa-brands fa-github"></i> https://github.com/ericlamkf</li>
                </ul>
                <div className="icons">
                    <a
                        href="https://www.instagram.com/ericlam.kf/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i id="insta" className="fa-brands fa-square-instagram"></i>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/eric-lam-kah-fai"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i id="linkedin" className="fa-brands fa-linkedin"></i>
                    </a>

                    <a
                        href="https://www.facebook.com/eric.lamkf/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i id="facebook" className="fa-brands fa-square-facebook"></i>
                    </a>
                </div>
            </div>
            <div className="right">
                <p>Looking to build a new website, improve your existing platform or being a unique project to file ? I'm here to help.</p>
                <form onSubmit={onSubmit} noValidate>
                    <label htmlFor="name">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        placeholder='Your full name'
                        className={errors.name ? 'field-error' : ''}
                        onChange={() => handleFieldChange('name')}
                    />
                    {errors.name && <span className="error-msg">{errors.name}</span>}

                    <label htmlFor="email">Your Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        placeholder='Your email address'
                        className={errors.email ? 'field-error' : ''}
                        onChange={() => handleFieldChange('email')}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}

                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder='Share your thoughts...'
                        className={errors.message ? 'field-error' : ''}
                        onChange={() => handleFieldChange('message')}
                    ></textarea>
                    {errors.message && <span className="error-msg">{errors.message}</span>}

                    <button type='submit'>Send Message <i class="fa-solid fa-paper-plane"></i></button>
                </form>
                <span className={sendState == "orange" ? "orange" : "green"} id='result-text'>{result}</span>
            </div>

            <NotificationCard
                visible={showNotification}
                title="Form Submitted Successfully! 🥳"
                message="Thanks for reaching out! I'll get back to you as soon as possible."
                icon="✉️"
                duration={5000}
                onDismiss={handleMiss}
            />
        </div>
    )
}

export default Contact
