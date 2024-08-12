import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    address: {
        streetAddress: { type: String, required: true },
        suburb: { type: String, required: true },
        state: { type: String, required: true },
        postcode: { type: String, required: true },
        country: { type: String, default: 'Australia' }
    },
    coordinates: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    areaSize: { type: Number },
    propertyType: { type: String, enum: ['House', 'Apartment', 'Commercial', 'Land'], required: true },
    features: [{ type: String }],
    photos: [{ type: String }],
    status: { type: String, enum: ['Available', 'Sold', 'OffMarket'], default: 'Available' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Property || mongoose.model('Property', propertySchema);

