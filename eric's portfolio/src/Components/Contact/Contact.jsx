import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {

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

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        setSendState("orange");
        const formData = new FormData(event.target);

        formData.append("access_key", "b8e31cd4-4f2c-4bd0-a5b9-681da7cee7cb");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            setSendState("green");
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
                    <i id='insta' class="fa-brands fa-square-instagram"></i>
                    <i id='linkedin' class="fa-brands fa-linkedin"></i>
                    <i id='facebook' class="fa-brands fa-square-facebook"></i>
                </div>
            </div>
            <div className="right">
                <p>Looking to build a new website, improve your existing platform or being a unique project to file ? I'm here to help.</p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" name='name' placeholder='Your full name' />
                    <label htmlFor="email">Your Email Address</label>
                    <input type="email" name='email' placeholder='Your email address' />
                    <label htmlFor="message">Your Message</label>
                    <textarea name="message" id="message" placeholder='Share your thoughts...'></textarea>
                    <button type='submit'>Send Message <i class="fa-solid fa-paper-plane"></i></button>
                </form>
                <span className={sendState == "orange" ? "orange" : "green"}>{result}</span>
            </div>
        </div>
    )
}

export default Contact
