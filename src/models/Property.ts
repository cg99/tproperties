const mongoose = require('mongoose');

const GeoCoordinateSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
});

const ClaimDataSchema = new mongoose.Schema({
    claimant: { type: String, required: true },
});

const PropertyHistorySchema = new mongoose.Schema({
    sales: [{
        agency: String,
        apmAgencyId: Number,
        date: Date,
        daysOnMarket: Number,
        documentedAsSold: Boolean,
        price: Number,
        reportedAsSold: Boolean,
        suppressDetails: Boolean,
        suppressPrice: Boolean,
        type: String,
        id: String,
        propertyType: String
    }]
});

const PropertySchema = new mongoose.Schema({
    cadastreType: { type: String, enum: ['Type1', 'Type2', 'Type3'], default: null },
    onMarketTypes: { type: [String], default: [] },
    status: { type: String, enum: ['OnMarket', 'OffMarket'], default: null },
    address: { type: String, default: null },
    addressCoordinate: GeoCoordinateSchema,
    addressId: { type: Number, default: null },
    adverts: { type: [Object], default: [] },
    bathrooms: { type: Number, default: null },
    bedrooms: { type: Number, default: null },
    carSpaces: { type: Number, default: null },
    claim: ClaimDataSchema,
    condition: { type: String, default: null },
    created: { type: Date, default: null },
    ensuites: { type: Number, default: null },
    features: { type: [String], default: [] },
    flatNumber: { type: String, default: null },
    history: PropertyHistorySchema,
    id: { type: String, default: null },
    improvements: { type: String, default: null },
    internalArea: { type: Number, default: null },
    isResidential: { type: Boolean, default: null },
    landUse: { type: String, default: null },
    lotNumber: { type: String, default: null },
    photos: { type: [Object], default: [] },
    planNumber: { type: String, default: null },
    postcode: { type: String, default: null },
    propertyCategory: { type: String, default: null },
    propertyCategoryId: { type: Number, default: null },
    propertyType: { type: String, default: null },
    propertyTypeId: { type: Number, default: null },
    rooms: { type: Number, default: null },
    sectionNumber: { type: String, default: null },
    state: { type: String, default: null },
    storeys: { type: Number, default: null },
    streetAddress: { type: String, default: null },
    streetName: { type: String, default: null },
    streetNumber: { type: String, default: null },
    streetType: { type: String, default: null },
    streetTypeLong: { type: String, default: null },
    suburb: { type: String, default: null },
    suburbId: { type: Number, default: null },
    title: { type: String, default: null },
    updated: { type: Date, default: null },
    urlSlug: { type: String, default: null },
    urlSlugShort: { type: String, default: null },
    zone: { type: String, default: null },
    gnafIds: { type: [Object], default: [] },
    areaSize: { type: Number, default: null },
    canonicalUrl: { type: String, default: null, readOnly: true },
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
