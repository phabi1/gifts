import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({id: false, _id: false, versionKey: false})
export class Offer {
    @Prop()
    by: string;

    @Prop()
    at: Date;

    @Prop()
    message: string;
}

export const OFFER_SCHEMA = SchemaFactory.createForClass(Offer);