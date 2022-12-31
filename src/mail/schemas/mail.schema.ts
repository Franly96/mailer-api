import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Mail extends Document {
  @Prop({ type: [String], required: true })
  addresses: string[];

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ default: null, required: false })
  delete_at: Date;

  @Prop({ default: Date.now() })
  created_at: Date;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
