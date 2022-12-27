import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Mail extends Document {
  @Prop({ required: true })
  @Prop([String])
  addresses: string[];

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  subject: string;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
