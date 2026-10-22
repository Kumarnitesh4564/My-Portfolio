// ─── Contact — EmailJS-wired contact form ─────────────────────────────────────
//
// WHAT WAS MISSING:
//   The original form had no `value`, no `onChange`, and no `onSubmit`.
//   Clicking "Send Message" literally did nothing. This rewrites it as
//   a fully controlled React form with EmailJS integration.
//
// HOW EMAILJS WORKS (browser → your inbox, no server needed):
//   1. User fills form → React controlled inputs (useState)
//   2. onClick → emailjs.send() hits the EmailJS API
//   3. EmailJS API → your connected Gmail/Outlook → email arrives in your inbox
//   4. Status state: 'idle' | 'sending' | 'success' | 'error'
//      drives UI feedback (button label, success/error message)
//
// SETUP:
//   Fill in src/config/emailjs.ts with your Service ID, Template ID, Public Key
//   from https://www.emailjs.com/ (free, 200 emails/month)

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG } from '../config/emailjs';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact({
  socials,
  profile,
}: {
  socials: Record<string, { url: string }>;
  profile: { email: string };
}) {
  const formRef = useRef<HTMLFormElement>(null);

  // Controlled form state — each field synced to React state
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Tracks submission lifecycle for UI feedback
  const [status, setStatus] = useState<Status>('idle');

  // Generic change handler — uses input `name` attribute to update the right field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic guard — required fields must be non-empty
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || '(No subject)',
          message: form.message,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' }); // reset
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id='contact' className='section contact'>
      <div className='section__heading'>
        <span>Reach out</span>
        <h2>Contact</h2>
      </div>

      <div className='contact-grid'>
        {/* ── Contact Form ── */}
        <form ref={formRef} className='glass contact-form' onSubmit={handleSubmit}>
          <div className='field-row'>
            <input
              name='name'
              placeholder='Name'
              value={form.name}
              onChange={handleChange}
              required
              autoComplete='name'
            />
            <input
              name='email'
              placeholder='Email'
              type='email'
              value={form.email}
              onChange={handleChange}
              required
              autoComplete='email'
            />
          </div>

          <input
            name='subject'
            placeholder='Subject'
            value={form.subject}
            onChange={handleChange}
          />

          <textarea
            name='message'
            placeholder='Message'
            rows={6}
            value={form.message}
            onChange={handleChange}
            required
          />

          <motion.button
            type='submit'
            className='cta primary'
            disabled={status === 'sending'}
            whileTap={{ scale: 0.97 }}
          >
            <FiSend />
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </motion.button>

          {/* Inline feedback after submission */}
          {status === 'success' && (
            <p className='form-feedback form-feedback--success'>
              ✅ Message sent! I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className='form-feedback form-feedback--error'>
              ❌ Something went wrong. Please email me directly at{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
          )}
        </form>

        {/* ── Social links sidebar ── */}
        <aside className='glass contact-links'>
          <a href={socials.github.url} target='_blank' rel='noreferrer'>
            <FiGithub /> GitHub
          </a>
          <a href={socials.linkedin.url} target='_blank' rel='noreferrer'>
            <FiLinkedin /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>
            <FiMail /> Email
          </a>
        </aside>
      </div>
    </section>
  );
}
