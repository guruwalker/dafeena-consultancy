declare interface IMailOptions {
  from: string | null;
  to: string | null;
  text: string | null;
  subject: string | null;
}

declare interface ISendContactUsRequest {
  topic: string | null;
  name: string | null;
  email: string | null;
  description: string | null;
}

declare interface IRequestService {
  phone_number: string | null | number;
  name: string | null;
  email: string | null;
  date: string | null | Date;
  description: string | null;
  service: string | null;
  service_description: string | null;
}


declare interface IScheduleConsultation {
  phone_number: string | null | number;
  name: string | null;
  email: string | null;
  date: string | null | Date;
  description: string | null;
  service: string | null;
}

declare interface ITestimonial {
  test: string;
  avatar: string;
  author: string;
  role: string;
  tag: string;
}
