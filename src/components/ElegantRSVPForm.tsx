import { useState } from 'react';
import { submitToGoogleForm } from '../utils/submitGoogleForm';

interface FormData {
  name: string;
  email: string;
  guests: string;
  attending: string;
  notes: string;
}

interface SubmitStatus {
  type: 'success' | 'error' | '';
  message: string;
}

const ElegantRSVPForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    guests: '1',
    attending: '',
    notes: ''
  });

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      await submitToGoogleForm(formData);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your RSVP!'
      });
      setFormData({
        name: '',
        email: '',
        guests: '1',
        attending: '',
        notes: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your RSVP. Please try again.'
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClasses = (field: string | null) => `
    w-full px-6 py-4 bg-transparent border-b-2
    ${focusedInput === field ? 'border-gray-800' : 'border-gray-200'}
    transition-all duration-300 outline-none text-lg
  `;

  const radioClasses = `
    hidden [&:checked+label]:bg-gray-800 [&:checked+label]:text-white
    [&:checked+label]:border-gray-800
  `;

  const radioLabelClasses = `
    px-6 py-3 border-2 border-gray-200 rounded-full cursor-pointer
    transition-all duration-300 hover:border-gray-400
  `;

  return (
    <section id="rsvp" className="relative py-20">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl mb-4">RSVP</h2>
          <p className="text-gray-600">We look forward to celebrating with you</p>
        </div>

        {submitStatus.message && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              className={inputClasses('name')}
              placeholder="Your Full Name"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              className={inputClasses('email')}
              placeholder="Your Email Address"
            />
          </div>

          {/* Attendance Radio Buttons */}
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">Will you be joining us?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-auto">
                <input
                  type="radio"
                  id="attending-yes"
                  name="attending"
                  value="Yes"
                  onChange={handleChange}
                  className={radioClasses}
                />
                <label htmlFor="attending-yes" className={`${radioLabelClasses} block w-full text-center`}>
                  Joyfully Accept
                </label>
              </div>
              <div className="w-full sm:w-auto">
                <input
                  type="radio"
                  id="attending-no"
                  name="attending"
                  value="No"
                  onChange={handleChange}
                  className={radioClasses}
                />
                <label htmlFor="attending-no" className={`${radioLabelClasses} block w-full text-center`}>
                  Regretfully Decline
                </label>
              </div>
            </div>
          </div>

          {/* Number of Guests */}
          <div className="relative">
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              onFocus={() => setFocusedInput('guests')}
              onBlur={() => setFocusedInput(null)}
              className={`${inputClasses('guests')} appearance-none cursor-pointer`}
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Meal Preference */}
          {/* <div className="relative">
            <select
              name="mealPreference"
              value={formData.mealPreference}
              onChange={handleChange}
              onFocus={() => setFocusedInput('mealPreference')}
              onBlur={() => setFocusedInput(null)}
              className={`${inputClasses('mealPreference')} appearance-none cursor-pointer`}
            >
              <option value="">Select Meal Preference</option>
              <option value="chicken">Chicken</option>
              <option value="fish">Fish</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div> */}

          {/* Notes Textarea */}
          <div className="relative">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              onFocus={() => setFocusedInput('notes')}
              onBlur={() => setFocusedInput(null)}
              className={`${inputClasses('notes')} resize-none h-32`}
              placeholder="Any dietary restrictions or special requirements?"
            />
          </div>

          {/* Submit Button */}
          <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-800 text-white py-4 rounded-full text-lg
            hover:bg-gray-700 transition-colors duration-300 mt-8
            transform hover:scale-[1.02] active:scale-[0.98] transition-transform
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send RSVP'}
        </button>
        </form>
      </div>
    </section>
  );
};

export default ElegantRSVPForm;
