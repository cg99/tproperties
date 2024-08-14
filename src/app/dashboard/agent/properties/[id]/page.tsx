import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IProperty } from '@/lib/interface/IProperty';


const PropertyForm = () => {
    const router = useRouter();
    const { id } = router.query;
    const [property, setProperty] = useState<IProperty | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchProperty = async () => {
                try {
                    const response = await axios.get(`/api/properties/${id}`);
                    setProperty(response.data);
                } catch (error) {
                    console.error('Error fetching property:', error);
                    setError('Failed to fetch property.');
                } finally {
                    setLoading(false);
                }
            };

            fetchProperty();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            if (id) {
                await axios.put(`/api/properties/${id}`, data);
            } else {
                await axios.post('/api/properties', data);
            }
            router.push('/agent/dashboard/properties');
        } catch (error) {
            console.error('Error saving property:', error);
            setError('Failed to save property.');
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Property' : 'Add New Property'}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input name="title" type="text" defaultValue={property?.title || ''} required />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" defaultValue={property?.description || ''} />
                    </label>
                    <label>
                        Price:
                        <input name="price" type="number" defaultValue={property?.price || ''} required />
                    </label>
                    <label>
                        Bedrooms:
                        <input name="bedrooms" type="number" defaultValue={property?.bedrooms || ''} required />
                    </label>
                    <label>
                        Bathrooms:
                        <input name="bathrooms" type="number" defaultValue={property?.bathrooms || ''} required />
                    </label>
                    <label>
                        Area Size:
                        <input name="areaSize" type="number" defaultValue={property?.areaSize || ''} />
                    </label>
                    <label>
                        Property Type:
                        <select name="propertyType" defaultValue={property?.propertyType || ''} required>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Land">Land</option>
                        </select>
                    </label>
                    <label>
                        Features (comma separated):
                        <input name="features" type="text" defaultValue={property?.features?.join(', ') || ''} />
                    </label>
                    <label>
                        Photos (comma separated URLs):
                        <input name="photos" type="text" defaultValue={property?.photos?.join(', ') || ''} />
                    </label>
                    <label>
                        Status:
                        <select name="status" defaultValue={property?.status || 'Available'}>
                            <option value="Available">Available</option>
                            <option value="Sold">Sold</option>
                            <option value="OffMarket">OffMarket</option>
                        </select>
                    </label>
                    <button type="submit">Save Property</button>
                </form>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default PropertyForm;
