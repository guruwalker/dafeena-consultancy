export function useContactForm() {
  /**
   * ---------------------------------------------------
   * Contact Form FormState
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
   * Reset Cases FormState
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
   * Send Contact Us Form
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
      await resetContactUsFormState()
    } catch (error) {
      console.error("Error on submitContactUsForm ", error);
    }
  };

  return {
    contactUsFormState,
    submitContactUsForm,
    resetContactUsFormState,
  };
}
