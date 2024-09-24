import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://laqxbdncmapnhorlbbkg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY');



const handlesubmit = () => {


    const handleSubmit = async () => {
        if (!user) {
          alert('You must be logged in to submit data.');
          return;
        }
    
        setLoading(true);
    
        try {
          if (!date || !compliment) {
            throw new Error('Please fill all fields');
          }
    
          const data = {
            date_time: date.toISOString(),
            elogios: JSON.stringify({ text: compliment }),
          };
    
          // Upload all images
          if (imageUris.length > 0) {
            const imageUrls = await Promise.all(imageUris.map(async (uri) => {
              const response = await fetch(uri);
              const blob = await response.blob();
              const { error: storageError, data: storageData } = await supabase.storage
                .from('images')
                .upload(`compliment-${Date.now()}-${Math.random()}.jpg`, blob, {
                  contentType: 'image/jpeg',
                });
              if (storageError) throw storageError;
              return storageData.path;
            }));
    
            data.image_urls = imageUrls; // Save all image URLs
          }
    
          const { error } = await supabase.from('users').insert(data);
    
          if (error) throw error;
    
          alert('Data submitted successfully!');
          setDate(new Date());
          setCompliment('');
          setImageUris([]); // Clear selected images after submission
        } catch (error) {
          console.error('Error submitting data:', error);
          alert('Error submitting data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
};

export default handlesubmit;