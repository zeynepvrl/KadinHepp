import mongoose from "mongoose";
import { Schema } from "mongoose";

const AytakvimiSchema = new Schema({
    Tarih:{
        type: Date,
        required: true
    },
    Görsel_1_URL: {
        type: String, 
        required: true
    },                                                                                   
    Açıklama: {
        type: String,
        required: true
    }
});

const AyTakvimi= mongoose.model("AyTakvimi", AytakvimiSchema);
export default AyTakvimi;
