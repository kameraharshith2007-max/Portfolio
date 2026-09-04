import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useContact } from '@/context/ContactContext';
import { BUDGET_OPTIONS, PROJECT_TYPES, STUDIO } from '@/lib/constants';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactModal() {
  const { isOpen, closeContact } = useContact();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    budget: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeContact();
      setForm({ name: '', company: '', email: '', projectType: '', budget: '', description: '' });
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90] bg-surface-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeContact}
          />

          {/* Panel */}
          <div className="fixed inset-0 z-[95] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              className="glass-surface rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto relative"
              initial={{ opacity: 0, scale: 0.92, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* Close button */}
              <button
                onClick={closeContact}
                className="absolute top-5 right-5 text-ink-50 hover:text-ink-100 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 sm:p-12">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="w-16 h-16 rounded-full glass-accent flex items-center justify-center mb-6"
                    >
                      <Check className="w-8 h-8 text-accent-300" />
                    </motion.div>
                    <h3 className="font-sans text-2xl text-ink-100 font-semibold mb-3">
                      Message received.
                    </h3>
                    <p className="text-base text-ink-50 max-w-sm">
                      Thank you for reaching out. We'll get back to you within 48 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-ultra text-accent-400 mb-3">
                        Start a Conversation
                      </p>
                      <h3 className="font-sans text-2xl sm:text-3xl text-ink-100 font-bold">
                        Tell us what you're building.
                      </h3>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                          label="Name"
                          value={form.name}
                          onChange={(v) => setForm({ ...form, name: v })}
                          required
                        />
                        <Field
                          label="Company"
                          value={form.company}
                          onChange={(v) => setForm({ ...form, company: v })}
                        />
                      </div>

                      <Field
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        required
                      />

                      {/* Project type */}
                      <div>
                        <label className="block text-xs uppercase tracking-wide-2 text-ink-50 mb-3">
                          Project Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {PROJECT_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm({ ...form, projectType: type })}
                              className={`px-4 py-2 text-xs uppercase tracking-wide rounded-full transition-all ${
                                form.projectType === type
                                  ? 'glass-accent text-accent-300'
                                  : 'glass text-ink-60 hover:text-ink-90'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-xs uppercase tracking-wide-2 text-ink-50 mb-3">
                          Budget Range
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {BUDGET_OPTIONS.map((budget) => (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => setForm({ ...form, budget })}
                              className={`px-4 py-2 text-xs uppercase tracking-wide rounded-full transition-all ${
                                form.budget === budget
                                  ? 'glass-accent text-accent-300'
                                  : 'glass text-ink-60 hover:text-ink-90'
                              }`}
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs uppercase tracking-wide-2 text-ink-50 mb-3">
                          Project Description
                        </label>
                        <textarea
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          rows={4}
                          required
                          className="w-full bg-transparent glass rounded-md px-4 py-3 text-sm text-ink-90 placeholder:text-ink-40 focus:outline-none focus:glass-strong transition-all resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 w-full justify-center text-sm font-medium tracking-wide-2 text-surface-950 overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 bg-[length:200%_100%] group-hover:bg-[position:100%_0%] transition-all duration-700" />
                        <span className="relative z-10">SEND MESSAGE</span>
                      </button>

                      <p className="text-center text-xs text-ink-40">
                        Or email us at{' '}
                        <a href={`mailto:${STUDIO.email}`} className="text-ink-60 hover:text-accent-300 transition-colors">
                          {STUDIO.email}
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wide-2 text-ink-50 mb-3">
        {label}{required && <span className="text-accent-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent glass rounded-md px-4 py-3 text-sm text-ink-90 placeholder:text-ink-40 focus:outline-none focus:glass-strong transition-all"
        placeholder={label}
      />
    </div>
  );
}
