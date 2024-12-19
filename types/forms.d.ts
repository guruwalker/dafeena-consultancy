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
