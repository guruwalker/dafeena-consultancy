import emailjs from "@emailjs/browser";

export function useForms() {
  const toast = useToast();

  /**
   * ---------------------------------------------------
   * Contact Us Form FormState
   * ---------------------------------------------------
   *
   */
  const contactUsFormState = useState<ISendContactUsRequest>(
    "contact-us",
    () => ({
      topic: null,
      name: null,
      email: null,
      description: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Contact Us FormState
   * ---------------------------------------------------
   *
   */
  const resetContactUsFormState = () => {
    contactUsFormState.value = {
      topic: null,
      name: null,
      email: null,
      description: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Request Services FormState
   * ---------------------------------------------------
   *
   */
  const requestServiceFormState = useState<IRequestService>(
    "request-service",
    () => ({
      phone_number: null,
      name: null,
      email: null,
      date: null,
      description: null,
      service: null,
      service_description: null
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Contact Us FormState
   * ---------------------------------------------------
   *
   */
  const resetRequestServicesFormState = () => {
    requestServiceFormState.value = {
      phone_number: null,
      name: null,
      email: null,
      date: null,
      description: null,
      service: null,
      service_description: null
    };
  };

  /**
   * ---------------------------------------------------
   * Schedule Consultation FormState
   * ---------------------------------------------------
   *
   */
  const scheduleConsultationFormState = useState<IScheduleConsultation>(
    "schedule-consultation",
    () => ({
      phone_number: null,
      name: null,
      email: null,
      date: null,
      description: null,
      service: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Schedule Consultation FormState
   * ---------------------------------------------------
   *
   */
  const resetScheduleConsultationFormState = () => {
    scheduleConsultationFormState.value = {
      phone_number: null,
      name: null,
      email: null,
      date: null,
      description: null,
      service: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Submit Contact Us Form
   * ---------------------------------------------------
   *
   */
  const submitContactUsForm = async () => {
    try {
      const response = await emailjs.send(
        "service_lbhggjg", // Your EmailJS service ID
        "template_ti5a0d4", // Your EmailJS template ID
        contactUsFormState.value, // The form data (must match the input names in your template)
        "fdseijwGc7NUjDdCB" // Your EmailJS public key
      );

      if (response.status === 200) {
        toast.add({
          id: "submitted_contact_form",
          title: "Success",
          description: "We will get back to you soon!",
          icon: "i-heroicons-check-badge",
          timeout: 6000,
          color: "primary",
        });
      } else {
        toast.add({
          id: "failed_contact_form",
          title: "Failed",
          description: "Please try again!",
          icon: "i-heroicons-check-badge",
          timeout: 6000,
          color: "red",
        });
      }

      await resetContactUsFormState();
    } catch (error) {
      toast.add({
        id: "failed_contact_form",
        title: "Failed",
        description: "Please try again!",
        icon: "i-heroicons-check-badge",
        timeout: 6000,
        color: "primary",
      });

      console.error("Error on submitContactUsForm ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Submit Request Services Form
   * ---------------------------------------------------
   * TODO:
   * FOR FUTURE DEVELOPERS, I USED EMAILJS TO SEND EMAILS, WAS A GOOD ALTERNATIVE TO DOING A BACKEND SERVICE
   * THE MAIN EMAIL "dafeenaconsultancyy@gmail.com" HANDLES THE SCHEDULE CONSULTATION AND CONTACT REQUEST
   * BUT THE FREE ACCOUNT CAN ONLY SUPPORT 2 TEMPLATES. SO I CREATED A NEW ACCOUNT WITH "dafeenaconsultancyy+111@gmail.com"
   * TO CREATE THE TEMPLATE FOR THE SERVICES FORM
   */
  const submitRequestServicesForm = async () => {
    try {
      const response = await emailjs.send(
        "service_0bd04w5", // Your EmailJS service ID
        "template_qxslfak", // Your EmailJS template ID
        requestServiceFormState.value, // The form data (must match the input names in your template)
        "r42jBL1dlThQaWmqy" // Your EmailJS public key
      );

      if (response.status === 200) {
        toast.add({
          id: "submit_request_services",
          title: "Success",
          description: "We will get back to you soon!",
          icon: "i-heroicons-check-badge",
          timeout: 6000,
          color: "primary",
        });
      } else {
        toast.add({
          id: "failed_request_services",
          title: "Failed",
          description: "Please try again!",
          icon: "i-heroicons-check-badge",
          timeout: 6000,
          color: "red",
        });
      }

      await resetRequestServicesFormState();
    } catch (error) {
      toast.add({
        id: "failed_request_services",
        title: "Failed",
        description: "Please try again!",
        icon: "i-heroicons-check-badge",
        timeout: 6000,
        color: "red",
      });

      console.error("Error on submitContactUsForm ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Submit Schedule Consultation Form
   * ---------------------------------------------------
   *
   */
  const submitScheduleConsultationForm = async () => {
    try {
      const response = await emailjs.send(
        "service_lbhggjg", // Your EmailJS service ID
        "template_ru7upkt", // Your EmailJS template ID
        scheduleConsultationFormState.value, // The form data (must match the input names in your template)
        "fdseijwGc7NUjDdCB" // Your EmailJS public key
      );

      if (response.status === 200) {
        toast.add({
          id: "submit_schedule_consultation",
          title: "Success",
          description: "We will get back to you soon!",
          icon: "i-heroicons-check-badge",
          timeout: 6000,
          color: "primary",
        });
      } else {
        toast.add({
          id: "failed_schedule_consultation",
          title: "Failed",
          description: "Please try again!",
          icon: "i-heroicons-check-badge",
          timeout: 6000,
          color: "red",
        });
      }

      await resetScheduleConsultationFormState();
    } catch (error) {
      toast.add({
        id: "failed_schedule_consultation",
        title: "Failed",
        description: "Please try again!",
        icon: "i-heroicons-check-badge",
        timeout: 6000,
        color: "red",
      });

      console.error("Error on submitScheduleConsultation ", error);
    }
  };

  return {
    contactUsFormState,
    requestServiceFormState,
    scheduleConsultationFormState,
    resetScheduleConsultationFormState,
    submitContactUsForm,
    submitRequestServicesForm,
    resetContactUsFormState,
    resetRequestServicesFormState,
    submitScheduleConsultationForm,
  };
}
