export function useForms() {
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
      // const response = await useApi("/cases", {
      //   method: "GET",
      // });

      // cases.value = response?.data;
      // return response?.data;
      console.log("submitContactUsForm called");
      await resetContactUsFormState();
    } catch (error) {
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
      // const response = await useApi("/cases", {
      //   method: "GET",
      // });

      // cases.value = response?.data;
      // return response?.data;
      console.log("submitRequestServicesForm called");
      await resetRequestServicesFormState();
    } catch (error) {
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
