interface FormData {
  name: string;
  email: string;
  guests: string;
  attending: string;
  notes: string;
}

export const submitToGoogleForm = async (formData: FormData): Promise<Response> => {
  // https://docs.google.com/forms/d/e/1FAIpQLSe1S6Arjf3fTeNr0Ah1cuNXpWXOIJcYwnU5-E_sZBP7NoU4oQ/viewform?usp=pp_url&entry.420743944=xx
  const FORM_ID = '1FAIpQLSe1S6Arjf3fTeNr0Ah1cuNXpWXOIJcYwnU5-E_sZBP7NoU4oQ';
  const GOOGLE_FORMS_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse?&submit=Submit`;

  const params = new URLSearchParams({
    'entry.1457555225': formData.name,
    'entry.107772582': formData.email,
    'entry.588760789': formData.attending,
    'entry.237912915': formData.guests,
    'entry.420743944': formData.notes,
  });

  const url = `${GOOGLE_FORMS_URL}&${params.toString()}`;

  // Use no-cors mode to avoid CORS issues
  return fetch(url, {
    method: 'GET',
    mode: 'no-cors',
  });
};
