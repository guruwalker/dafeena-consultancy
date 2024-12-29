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
      const response = await $fetch("/api/contact-request", {
        method: "POST",
        body: contactUsFormState.value,
      });

      if (response.success) {
        toast.add({
          id: "submitted_contact_form",
          title: "Success",
          description: "We will get back to you soon!",
          icon: "i-heroicons-check-badge",
          timeout: 6000,
        });
      } else {
        toast.add({
          id: "failed_contact_form",
          title: "Failed",
          description: "Please try again!",
          icon: "i-heroicons-check-badge",
          timeout: 6000,
        });
      }

      // Show Notification
      toast.add({
        id: "submitted_contact_form",
        title: "Success",
        description: "We will get back to you soon!",
        icon: "i-heroicons-check-badge",
        timeout: 6000,
      });

      await resetContactUsFormState();
    } catch (error) {
      toast.add({
        id: "failed_contact_form",
        title: "Failed",
        description: "Please try again!",
        icon: "i-heroicons-check-badge",
        timeout: 6000,
      });

      console.error("Error on submitContactUsForm ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Submit Request Services Form
   * ---------------------------------------------------
   *
   */
  const submitRequestServicesForm = async () => {
    try {
      const response = await $fetch("/api/service-request", {
        method: "POST",
        body: requestServiceFormState.value,
      });

      toast.add({
        id: "submit_request_services",
        title: "Success",
        description: "We will get back to you soon!",
        icon: "i-heroicons-check-badge",
        timeout: 6000,
      });

      await resetRequestServicesFormState();
    } catch (error) {
      toast.add({
        id: "failed_request_services",
        title: "Failed",
        description: "Please try again!",
        icon: "i-heroicons-check-badge",
        timeout: 6000,
      });

      console.error("Error on submitContactUsForm ", error);
    }
  };

  return {
    contactUsFormState,
    requestServiceFormState,
    submitContactUsForm,
    submitRequestServicesForm,
    resetContactUsFormState,
    resetRequestServicesFormState,
  };
}
