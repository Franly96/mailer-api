export class CreateMailDto {
  addresses: string[];
  from: string;
  message: string;
  subject: string;
}
