import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'
import CustomSelect from './CustomSelect.jsx'

const SALES_EMAIL = 'sales@thegrandharmony.com'

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'any', message: '' })
  const [status, setStatus] = useState('idle') // idle | error | sending | success

  const opt = t('contact.options')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setStatus('error')
      return
    }
    setStatus('sending')
    // Sends the enquiry directly to SALES_EMAIL via FormSubmit (no mail client needed).
    // NOTE: the first-ever submission triggers a one-time activation email to the
    // sales inbox — click "Activate" in that email once and all later enquiries flow.
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SALES_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `The Grand Harmony — enquiry from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: opt[form.interest] || form.interest,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('success')
    } catch (_) {
      // Network/service failure — fall back to the visitor's mail client so no lead is lost.
      const subject = encodeURIComponent(`The Grand Harmony — enquiry from ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n` +
          `Interest: ${opt[form.interest] || form.interest}\n\n${form.message}`
      )
      try {
        window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`
      } catch (__) {
        /* ignore */
      }
      setStatus('success')
    }
  }

  const reset = () => {
    setForm({ name: '', email: '', phone: '', interest: 'any', message: '' })
    setStatus('idle')
  }

  return (
    <section className="section section--cream" id="contact">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow"><b className="chap">08</b>{t('contact.eyebrow')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="lede" style={{ fontSize: '1.15rem', marginTop: '1.2rem' }}>
            {t('contact.body')}
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal>
            {status === 'success' ? (
              <div className="form__success">
                <span className="s-mark" aria-hidden="true">
                  &#10003;
                </span>
                <p>{t('contact.success')}</p>
                <button className="btn btn--ghost" onClick={reset}>
                  {t('contact.again')}
                </button>
              </div>
            ) : (
              <div className="form">
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="c-name">{t('contact.name')} *</label>
                    <input id="c-name" value={form.name} onChange={set('name')} autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">{t('contact.email')} *</label>
                    <input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form__row">
                  <div className="field">
                    <label htmlFor="c-phone">{t('contact.phone')}</label>
                    <input
                      id="c-phone"
                      value={form.phone}
                      onChange={set('phone')}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="c-interest">{t('contact.interest')}</label>
                    <CustomSelect
                      id="c-interest"
                      value={form.interest}
                      placeholder={opt.any}
                      onChange={(v) => setForm((f) => ({ ...f, interest: v }))}
                      options={[
                        { value: 'any', label: opt.any },
                        { value: 'studio', label: opt.studio },
                        { value: 'b1', label: opt.b1 },
                        { value: 'b2', label: opt.b2 },
                        { value: 'b3', label: opt.b3 },
                        { value: 'duplex', label: opt.duplex },
                        { value: 'retail', label: opt.retail },
                      ]}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="c-msg">{t('contact.message')}</label>
                  <textarea
                    id="c-msg"
                    rows={3}
                    value={form.message}
                    onChange={set('message')}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                {status === 'error' && <div className="form__error">{t('contact.required')}</div>}

                <div className="form__submit">
                  <button className="btn" onClick={submit} disabled={status === 'sending'}>
                    {status === 'sending' ? t('contact.sending') : t('contact.submit')}{' '}
                    <span className="arw">&#8594;</span>
                  </button>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal className="contact__side" delay={120}>
            <div className="cs-label">{t('contact.agencyLabel')}</div>
            <div className="cs-agency">{t('contact.agency')}</div>

            <div className="cs-rows">
              <div className="cs-row">
                <span className="cs-k">Email</span>
                <a href={`mailto:${t('contact.salesEmail')}`}>{t('contact.salesEmail')}</a>
              </div>
              <div className="cs-row">
                <span className="cs-k">{t('contact.phone')}</span>
                <span>{t('contact.phoneValue')}</span>
              </div>
              <div className="cs-row">
                <span className="cs-k">Website</span>
                <a href="https://trueestate.com.vn" target="_blank" rel="noreferrer">
                  {t('contact.site')}
                </a>
              </div>
            </div>

            <div className="contact__proposal">
              <div className="contact__qr">
                <img src="./brand/qr.png" alt="Scan to open the Grand Harmony proposal" />
              </div>
              <div className="contact__proposal-text">
                <span className="qr-label">{t('contact.scanLabel')}</span>
                <a
                  className="proposal-link"
                  href="./proposal/grand-harmony-proposal.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('contact.downloadProposal')} <span className="arw">&#8594;</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
