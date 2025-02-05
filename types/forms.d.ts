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
  date: string | null | date;
  description: string | null;
  service: string | null;
}


declare interface IScheduleConsultation {
  phone_number: string | null | number;
  name: string | null;
  email: string | null;
  date: string | null | date;
  description: string | null;
  service: string | null;
}
