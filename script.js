/**
 * SOUGHT CONSULT - Official Website Interactive Scripts
 * Ghanaian Construction & Property Solutions
 * Preserves all original interactive behaviors, animations, and modals.
 * Handles Dual-Action Contact Form (Send to Email & Send to WhatsApp),
 * FAQ Accordions, Mobile Navigation, and Consultation Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link:not(.has-sub)');

  function openMobileNav() {
    mobileNavDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNavDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggleBtn?.addEventListener('click', openMobileNav);
  mobileNavClose?.addEventListener('click', closeMobileNav);

  mobileNavDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileNavDrawer) {
      closeMobileNav();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // Mobile Accordions
  const mobileAccordionTriggers = document.querySelectorAll('.mobile-nav-link.has-sub');
  mobileAccordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const subnav = trigger.nextElementSibling;
      const chevron = trigger.querySelector('.chevron-icon');
      if (subnav) {
        subnav.classList.toggle('open');
        if (chevron) {
          chevron.style.transform = subnav.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // 2. Animated Counter for "100% Quality & Reliable Execution"
  // -------------------------------------------------------------------------
  const counterElement = document.getElementById('projectCounter');
  let hasAnimatedCounter = false;

  function animateCounter(el, target, duration = 1800) {
    let startTimestamp = null;
    const startValue = 0;
    
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * (target - startValue) + startValue);
      el.textContent = currentValue.toLocaleString('en-US');
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('en-US');
      }
    }
    
    window.requestAnimationFrame(step);
  }

  if (counterElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedCounter) {
          hasAnimatedCounter = true;
          animateCounter(counterElement, 100, 1600);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterElement);
  }

  // -------------------------------------------------------------------------
  // 3. Consultation / Quote Modal
  // -------------------------------------------------------------------------
  const appointmentModal = document.getElementById('appointmentModal');
  const appointmentClose = document.getElementById('appointmentClose');
  const appointmentBtns = document.querySelectorAll('[data-action="appointment"]');

  function openAppointmentModal() {
    closeMobileNav();
    appointmentModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAppointmentModal() {
    appointmentModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  appointmentBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAppointmentModal();
    });
  });

  appointmentClose?.addEventListener('click', closeAppointmentModal);
  appointmentModal?.addEventListener('click', (e) => {
    if (e.target === appointmentModal) closeAppointmentModal();
  });

  // -------------------------------------------------------------------------
  // 4. Toast Notification
  // -------------------------------------------------------------------------
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (toastNotice && toastMessage) {
      toastMessage.textContent = msg;
      toastNotice.classList.add('show');
      setTimeout(() => {
        toastNotice.classList.remove('show');
      }, 4200);
    }
  }

  // -------------------------------------------------------------------------
  // 5. Contact Form with TWO SEPARATE FORM SUBMISSION BUTTONS
  // -------------------------------------------------------------------------
  // Recipient email stored strictly internally per privacy requirements:
  const INTERNAL_EMAIL_RECIPIENT = 'erasmuso52@yahoo.com';
  const WHATSAPP_PHONE_NUMBER = '233268339409'; // Ghana +233 (0268339409)

  function getFormData(form) {
    const name = form.querySelector('[name="fullName"]')?.value?.trim();
    const phone = form.querySelector('[name="phoneNumber"]')?.value?.trim();
    const email = form.querySelector('[name="emailAddress"]')?.value?.trim() || 'Not provided';
    const service = form.querySelector('[name="serviceRequired"]')?.value?.trim();
    const location = form.querySelector('[name="projectLocation"]')?.value?.trim();
    const message = form.querySelector('[name="projectMessage"]')?.value?.trim();

    return { name, phone, email, service, location, message };
  }

  function validateContactForm(data) {
    if (!data.name) {
      showToast('Please enter your full name.');
      return false;
    }
    if (!data.phone) {
      showToast('Please enter your phone number.');
      return false;
    }
    if (!data.service) {
      showToast('Please select the required service.');
      return false;
    }
    if (!data.location) {
      showToast('Please enter your project location.');
      return false;
    }
    if (!data.message) {
      showToast('Please enter a brief project description.');
      return false;
    }
    return true;
  }

  // Handle Send To Email
  function handleSendToEmail(form) {
    const data = getFormData(form);
    if (!validateContactForm(data)) return;

    const emailSubject = encodeURIComponent('New Website Enquiry – Sought Consult');
    
    const emailBody = encodeURIComponent(
      `NEW WEBSITE ENQUIRY - SOUGHT CONSULT\n` +
      `====================================\n\n` +
      `CUSTOMER DETAILS\n` +
      `----------------\n` +
      `Full Name: ${data.name}\n` +
      `Phone Number: ${data.phone}\n` +
      `Email Address: ${data.email}\n\n` +
      `SERVICE INFORMATION\n` +
      `-------------------\n` +
      `Service Required: ${data.service}\n` +
      `Project Location: ${data.location}\n\n` +
      `ENQUIRY DETAILS\n` +
      `---------------\n` +
      `${data.message}\n\n` +
      `---\n` +
      `Sent through the Sought Consult website\n` +
      `www.soughtconst.com`
    );

    const mailtoUrl = `mailto:${INTERNAL_EMAIL_RECIPIENT}?subject=${emailSubject}&body=${emailBody}`;
    
    showToast('Opening your email client with your enquiry details...');
    window.location.href = mailtoUrl;
    
    closeAppointmentModal();
  }

  // Handle Send To WhatsApp
  function handleSendToWhatsApp(form) {
    const data = getFormData(form);
    if (!validateContactForm(data)) return;

    const formattedMessage = 
      `CUSTOMER DETAILS\n\n` +
      `Full Name: ${data.name}\n` +
      `Phone Number: ${data.phone}\n` +
      `Email: ${data.email}\n\n` +
      `SERVICE INFORMATION\n\n` +
      `Service Required: ${data.service}\n` +
      `Project Location: ${data.location}\n\n` +
      `ENQUIRY DETAILS\n\n` +
      `${data.message}\n\n` +
      `Sent through the Sought Consult website\n` +
      `www.soughtconst.com`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;

    showToast('Redirecting to WhatsApp to send your enquiry...');
    window.open(whatsappUrl, '_blank');
    
    closeAppointmentModal();
  }

  // Wire buttons in forms (both on contact page and in appointment modal)
  document.querySelectorAll('.contact-form, #appointmentForm').forEach((form) => {
    const emailBtn = form.querySelector('.btn-send-email');
    const whatsappBtn = form.querySelector('.btn-send-whatsapp');

    emailBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      handleSendToEmail(form);
    });

    whatsappBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      handleSendToWhatsApp(form);
    });
  });

  // -------------------------------------------------------------------------
  // 6. FAQ Accordion Functionality
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question-btn');
    button?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items
      faqItems.forEach((other) => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 7. Video Tour / Presentation Modal
  // -------------------------------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const videoClose = document.getElementById('videoClose');
  const watchVideoBtn = document.getElementById('watchVideoBtn');

  function openVideoModal() {
    videoModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    videoModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  watchVideoBtn?.addEventListener('click', openVideoModal);
  videoClose?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  // -------------------------------------------------------------------------
  // 8. Global Escape Key Handler
  // -------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAppointmentModal();
      closeVideoModal();
      closeMobileNav();
    }
  });

  console.log("Sought Consult website scripts initialized successfully.");
});
