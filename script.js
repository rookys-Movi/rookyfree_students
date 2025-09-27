// --- Initialize Animate On Scroll (AOS) ---
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

// --- Smooth Scroll Helper ---
function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', function () {
    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-icon').textContent = '+';
            });
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-icon').textContent = '−';
            }
        });
    });

    // --- Smooth Scroll for internal anchors ---
    document.addEventListener('click', function (event) {
        const anchor = event.target.closest('a[href^="#"]');
        if (anchor) {
            event.preventDefault();
            const id = anchor.getAttribute('href').slice(1);
            if (id) scrollToId(id);
        }
    });

    // --- Form Submission Logic ---
    const form = document.getElementById('inquiryForm');
    const submitButton = document.getElementById('submitButton');
    
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = '送信中...';

            const formData = new FormData(form);
            const dataObject = {};
            formData.forEach((value, key) => { dataObject[key] = value; });

            const payload = {
                landingPageID: dataObject.landingPageID,
                inquiryType: "学生登録",
                fullName: dataObject.fullName,
                companyName: dataObject.universityName,
                email: dataObject.email,
                message: dataObject.message || "",
                furigana: "",
                departmentName: "",
                phoneNumber: "",
                detailType: "",
                secret: '8qZ$p#vT2@nK*wG7hB5!sF8aU'
            };

            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8EB9eCAb8Kjy9Jvy9ucNrruzHKFwrBs4bcRg1_aoD9-w3rdOGpox3wsvrFV27pZyENQ/exec";
      
            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(payload)
            })
            .then(() => {
                window.top.location.href = 'thankyou.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('送信に失敗しました。時間をおいて再度お試しください。');
                submitButton.disabled = false;
                submitButton.textContent = '無料で登録する';
            });
        });
    }
});

