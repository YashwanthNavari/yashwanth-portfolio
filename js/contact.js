// ===================================================================
// Contact Page & Global Form Logic: Direct WhatsApp Routing
// Target Phone: +91 6303236366 (Navari Yashwanth Reddy)
// ===================================================================

const YASHWANTH_WHATSAPP_PHONE = "916303236366";
const YASHWANTH_WHATSAPP_DISPLAY = "+91 6303236366";

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm") || document.getElementById("contact-form") || document.querySelector("form#contactForm");
    if (contactForm && !contactForm.dataset.whatsappBound) {
        contactForm.dataset.whatsappBound = "true";
        contactForm.addEventListener("submit", handleContactSubmission);
    }
});

function handleContactSubmission(event) {
    if (event) event.preventDefault();

    const form = (event && event.target) ? event.target : document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const companyInput = document.getElementById("company");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submit-contact-btn") || (form ? form.querySelector("button[type=\"submit\"]") : null);
    const submitBtnText = document.getElementById("submit-btn-text");
    let statusMessage = document.getElementById("statusMessage");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const company = companyInput ? companyInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "Portfolio Inquiry";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!statusMessage && form) {
        statusMessage = document.createElement("div");
        statusMessage.id = "statusMessage";
        form.appendChild(statusMessage);
    }

    if (!name || !email || !message) {
        if (statusMessage) {
            statusMessage.className = "p-4 rounded-xl text-xs sm:text-sm font-semibold bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200 border border-rose-500/30 flex items-center gap-2 transition-all";
            statusMessage.innerHTML = "<span class=\"material-symbols-outlined text-base\">error</span> Please complete all required fields (Your Name, Email Address, and Message Details).";
            statusMessage.classList.remove("hidden");
        }
        if (!name && nameInput) nameInput.focus();
        else if (!email && emailInput) emailInput.focus();
        else if (!message && messageInput) messageInput.focus();
        return;
    }

    if (window.audioFX && typeof window.audioFX.playClick === "function") {
        window.audioFX.playClick();
    }

    const originalBtnText = submitBtnText ? submitBtnText.textContent : (submitBtn ? submitBtn.innerText : "Send via WhatsApp");
    if (submitBtn) submitBtn.disabled = true;
    if (submitBtnText) submitBtnText.textContent = "Connecting to WhatsApp...";

    const companyText = company || "Individual / Not specified";
    const istTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

    // Format professional WhatsApp message with all details
    const formattedMessage = 
`*New Portfolio Inquiry for Yashwanth*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📧 *Email:* ${email}
🏢 *Company/Org:* ${companyText}
📌 *Subject:* ${subject}

💬 *Message Details:*
${message}

━━━━━━━━━━━━━━━━━━━━━━━━
🕒 *Time:* ${istTime} IST
🌐 *Source:* Navari Yashwanth Reddy Portfolio`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${YASHWANTH_WHATSAPP_PHONE}&text=${encodedText}`;

    // Render interactive status container
    if (statusMessage) {
        statusMessage.className = "p-4 sm:p-5 rounded-2xl text-xs sm:text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-500/30 flex flex-col gap-3 shadow-md transition-all animate-fade-in";
        statusMessage.innerHTML = `
            <div class="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                <span class="material-symbols-outlined text-lg">check_circle</span>
                <span>Connecting directly to Yashwanth's WhatsApp (+91 6303236366)...</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                Your message has been pre-formatted with all your details. If WhatsApp did not open automatically, tap below:
            </p>
            <div class="flex flex-wrap items-center gap-2 pt-1">
                <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:scale-105">
                    <svg class="size-4 fill-current text-white" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.536 1.77.818 2.796.818 3.179 0 5.766-2.587 5.766-5.766 0-3.18-2.587-5.768-5.766-5.768zm0 10.355c-.886 0-1.68-.242-2.383-.699l-.17-.11-1.765.463.471-1.722-.119-.189c-.52-.823-.794-1.503-.794-2.498 0-2.531 2.059-4.59 4.591-4.59 2.531 0 4.59 2.059 4.59 4.59 0 2.532-2.059 4.588-4.59 4.588z"/></svg>
                    <span>Open in WhatsApp</span>
                    <span class="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <button type="button" id="copy-msg-btn" class="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-all">
                    <span class="material-symbols-outlined text-sm">content_copy</span>
                    <span>Copy Message</span>
                </button>
            </div>
        `;
        statusMessage.classList.remove("hidden");

        const copyBtn = document.getElementById("copy-msg-btn");
        if (copyBtn) {
            copyBtn.onclick = function() {
                navigator.clipboard.writeText(formattedMessage).then(() => {
                    copyBtn.innerHTML = '<span class="material-symbols-outlined text-sm">done</span> Copied!';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<span class="material-symbols-outlined text-sm">content_copy</span> Copy Message';
                    }, 2000);
                });
            };
        }
    }

    if (window.audioFX && typeof window.audioFX.playSuccess === "function") {
        window.audioFX.playSuccess();
    }

    // Direct WhatsApp window trigger
    const win = window.open(whatsappUrl, "_blank");
    if (!win || win.closed || typeof win.closed === "undefined") {
        // Fallback for pop-up blockers: navigate directly after short delay
        setTimeout(() => {
            window.location.href = whatsappUrl;
        }, 300);
    }

    setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = originalBtnText;
    }, 2000);
}

// Global helper to copy phone number to clipboard with feedback
function copyPhoneToClipboard() {
    const phone = "+91 6303236366";
    navigator.clipboard.writeText(phone).then(() => {
        const btnLabel = document.getElementById("copy-phone-btn-label");
        if (btnLabel) {
            const original = btnLabel.textContent;
            btnLabel.textContent = "Copied!";
            btnLabel.parentElement.classList.add("bg-emerald-500", "text-white", "border-emerald-500");
            setTimeout(() => {
                btnLabel.textContent = original;
                btnLabel.parentElement.classList.remove("bg-emerald-500", "text-white", "border-emerald-500");
            }, 2500);
        }
        if (window.audioFX && typeof window.audioFX.playSuccess === "function") {
            window.audioFX.playSuccess();
        }
    }).catch(() => {
        window.open("https://api.whatsapp.com/send?phone=916303236366", "_blank");
    });
}
