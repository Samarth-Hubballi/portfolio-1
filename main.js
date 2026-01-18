import "./style.css";
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector(".experience-canvas"));

// Contact Form Handler
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // Disable submit button
    const submitBtn = contactForm.querySelector(".form-submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      // Send email using EmailJS
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_r7flzdn", // Replace with your EmailJS service ID
          template_id: "template_woekx3v", // Replace with your EmailJS template ID
          user_id: "WDp5ovMG1vcFpMZaN", // Replace with your EmailJS public key
          template_params: {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: "samarthhubli18@gmail.com", // Replace with your email
          },
        }),
      });

      if (response.ok) {
        showMessage("Message sent successfully! I'll get back to you soon.", "success");
        contactForm.reset();
      } else {
        showMessage(
          "Failed to send message. Please try again or contact me directly.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      showMessage(
        "An error occurred. You can reach me at mdamiruddin@example.com",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;

  // Auto-hide error message after 5 seconds
  if (type === "error") {
    setTimeout(() => {
      formMessage.className = "form-message";
      formMessage.textContent = "";
    }, 5000);
  }
  // Keep success message visible longer
  if (type === "success") {
    setTimeout(() => {
      formMessage.className = "form-message";
      formMessage.textContent = "";
    }, 8000);
  }
}

