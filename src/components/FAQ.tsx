import React, { useState } from 'react';

const FAQs = [
  {
    q: 'Is Relocation Matrix really free?',
    a: 'Yes, completely free. No premium tiers, no paywalls. We believe relocation decisions should be accessible to everyone.',
  },
  {
    q: 'How accurate is the data?',
    a: 'We use data from Global Peace Index (safety), UN HDI (quality of life), Numbeo (cost), Glassdoor (salaries), IMF (tax rates), and Henley Passport Index. Data is refreshed quarterly.',
  },
  {
    q: 'Can I adjust the criteria weights?',
    a: 'Yes! All 17 criteria have sliders. Adjust them to match YOUR priorities. 4 criteria are super-weighted (×10), 13 are standard (1-5).',
  },
  {
    q: 'What if my ideal city isn\'t listed?',
    a: 'We started with 40 major cities. If you\'d like us to add a city, submit a request on GitHub or email us.',
  },
  {
    q: 'Can I save my profiles?',
    a: 'Yes! Sign in and click "Save Profile". Your custom weights and city selection are saved. You can create multiple profiles for different scenarios.',
  },
  {
    q: 'How do I share a profile with someone?',
    a: 'Click "Share" on any saved profile. It generates a public link you can send to friends or colleagues. They can view your analysis without signing in.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. We collect zero data about you. Your preferences stay on your device. We don\'t track browsing, ads, or analytics.',
  },
  {
    q: 'What about visa requirements?',
    a: 'We factor "Visa Ease" (based on Henley Passport Index) into scoring. Adjust this weight if visa requirements are critical to your decision.',
  },
  {
    q: 'How often is the data updated?',
    a: 'We refresh data quarterly. Major changes (new cities, criteria) are announced on GitHub releases.',
  },
  {
    q: 'Can I use this for corporate relocation?',
    a: 'Absolutely. Many companies use Relocation Matrix to evaluate relocation packages. Share profiles with your team or HR department.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {FAQs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition flex justify-between items-center"
              >
                <span>{faq.q}</span>
                <span className={`transform transition ${openIndex === idx ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {openIndex === idx && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-slate-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <a
            href="https://github.com/rusel95/relocation-matrix/issues"
            className="text-blue-600 font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open an issue on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
};
