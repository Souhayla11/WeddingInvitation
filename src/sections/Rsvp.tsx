import { AnimatePresence, motion } from 'motion/react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { Icon } from '../components/Icon'
import { Section } from '../components/Section'
import { Seal } from '../components/Seal'
import { rsvp } from '../content/ui'
import { useLang } from '../i18n/LanguageContext'
import { ease, reveal } from '../lib/motion'
import { fill } from '../lib/text'
import styles from './Rsvp.module.css'

type YesNo = '' | 'yes' | 'no'

interface FormState {
  name: string
  attending: YesNo
  guestNames: string
  guests: number
  recovery: YesNo
  dietary: string
}

const emptyForm: FormState = {
  name: '',
  attending: '',
  guestNames: '',
  guests: 1,
  recovery: '',
  dietary: '',
}

type ErrorKey = 'name' | 'attending'
const MAX_GUESTS = 4

function validate(form: FormState): ErrorKey[] {
  const errors: ErrorKey[] = []
  if (!form.name.trim()) errors.push('name')
  if (!form.attending) errors.push('attending')
  return errors
}

/** POSTs to the Netlify function, which appends a row in Google Sheets. */
async function submitRsvp(form: FormState, lang: string) {
  const coming = form.attending === 'yes'
  const payload = {
    name: form.name.trim(),
    attending: form.attending,
    guestNames: coming ? form.guestNames.trim() : '',
    guests: coming ? form.guests : 0,
    recovery: coming ? form.recovery : '',
    dietary: coming ? form.dietary.trim() : '',
    language: lang,
  }

  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return
  }

  const res = await fetch('/.netlify/functions/submit-rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    let detail = ''
    try {
      const data = (await res.json()) as { error?: string }
      detail = data.error ?? ''
    } catch {
      /* ignore */
    }
    throw new Error(detail || `RSVP failed with status ${res.status}`)
  }
}

export function Rsvp() {
  const { t, lang } = useLang()
  const id = useId()
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<ErrorKey[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [sendErrorDetail, setSendErrorDetail] = useState('')
  const [sentAs, setSentAs] = useState<{ name: string; attending: YesNo }>({ name: '', attending: '' })

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors.includes(key as ErrorKey)) setErrors((e) => e.filter((k) => k !== key))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (found.length) {
      document.getElementById(`${id}-${found[0]}`)?.focus()
      return
    }
    setStatus('sending')
    setSendErrorDetail('')
    try {
      await submitRsvp(form, lang)
      setSentAs({ name: form.name.trim().split(/\s+/)[0], attending: form.attending })
      setStatus('sent')
      setForm(emptyForm)
    } catch (err) {
      setSendErrorDetail(err instanceof Error ? err.message : '')
      setStatus('error')
    }
  }

  const errorText: Record<ErrorKey, string> = {
    name: t(rsvp.errorName),
    attending: t(rsvp.errorAttending),
  }
  const has = (key: ErrorKey) => errors.includes(key)

  return (
    <Section id="rsvp" tone="dark">
      <motion.div className={styles.card} {...reveal(0, 40)}>
        <AnimatePresence mode="wait" initial={false}>
          {status === 'sent' ? (
            <motion.div
              key="thanks"
              className={styles.thanks}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              role="status"
            >
              <motion.div
                initial={{ scale: 2.2, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: -6, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
              >
                <Seal size={110} />
              </motion.div>
              <h3 className={styles.thanksTitle}>
                {fill(t(sentAs.attending === 'yes' ? rsvp.thanksYes : rsvp.thanksNo), { name: sentAs.name })}
              </h3>
              <p className={styles.thanksText}>{t(sentAs.attending === 'yes' ? rsvp.thanksYesText : rsvp.thanksNoText)}</p>
              <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
                {t(rsvp.another)}
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              name="rsvp"
              method="POST"
              noValidate
              onSubmit={onSubmit}
              className={styles.form}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Field id={`${id}-name`} label={t(rsvp.name)} error={has('name') ? errorText.name : undefined}>
                <input
                  id={`${id}-name`}
                  name="name"
                  autoComplete="name"
                  placeholder={t(rsvp.namePlaceholder)}
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  aria-invalid={has('name')}
                  aria-describedby={has('name') ? `${id}-name-error` : undefined}
                />
              </Field>

              <fieldset className={styles.fieldset} aria-describedby={has('attending') ? `${id}-attending-error` : undefined}>
                <legend className={styles.label}>{t(rsvp.attending)}</legend>
                <div className={styles.choices}>
                  {(['yes', 'no'] as const).map((value, i) => (
                    <label key={value} className={styles.choice} data-checked={form.attending === value}>
                      <input
                        id={i === 0 ? `${id}-attending` : undefined}
                        type="radio"
                        name="attending"
                        value={value}
                        checked={form.attending === value}
                        onChange={() => set('attending', value)}
                        className="sr-only"
                      />
                      <span className={styles.choiceIcon} aria-hidden="true">
                        <Icon name={value === 'yes' ? 'heart' : 'glass'} />
                      </span>
                      <span className={styles.choiceTitle}>{t(value === 'yes' ? rsvp.yes : rsvp.no)}</span>
                      <span className={styles.choiceSub}>{t(value === 'yes' ? rsvp.yesSub : rsvp.noSub)}</span>
                    </label>
                  ))}
                </div>
                {has('attending') && (
                  <p id={`${id}-attending-error`} className={styles.error}>
                    {errorText.attending}
                  </p>
                )}
              </fieldset>

              <AnimatePresence initial={false}>
                {form.attending !== 'no' && (
                  <motion.div
                    key="details"
                    className={styles.reveal}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    <div className={styles.revealInner}>
                      <Field id={`${id}-guestNames`} label={t(rsvp.guestNames)} optional={t(rsvp.optional)}>
                        <input
                          id={`${id}-guestNames`}
                          name="guestNames"
                          placeholder={t(rsvp.guestNamesPlaceholder)}
                          value={form.guestNames}
                          onChange={(e) => set('guestNames', e.target.value)}
                        />
                      </Field>

                      <div className={styles.guestsInner}>
                        <span className={styles.guestsLabel} id={`${id}-guests-label`}>
                          {t(rsvp.guests)}
                        </span>
                        <div className={styles.stepper} role="group" aria-labelledby={`${id}-guests-label`}>
                          <button
                            type="button"
                            onClick={() => set('guests', Math.max(1, form.guests - 1))}
                            disabled={form.guests <= 1}
                            aria-label={t(rsvp.fewer)}
                          >
                            <Icon name="minus" />
                          </button>
                          <output aria-live="polite">{form.guests}</output>
                          <button
                            type="button"
                            onClick={() => set('guests', Math.min(MAX_GUESTS, form.guests + 1))}
                            disabled={form.guests >= MAX_GUESTS}
                            aria-label={t(rsvp.more)}
                          >
                            <Icon name="plus" />
                          </button>
                        </div>
                      </div>

                      <YesNoField label={t(rsvp.recovery)} name="recovery" value={form.recovery} onChange={(v) => set('recovery', v)} />

                      <Field id={`${id}-dietary`} label={t(rsvp.dietary)} optional={t(rsvp.optional)}>
                        <textarea
                          id={`${id}-dietary`}
                          name="dietary"
                          rows={3}
                          placeholder={t(rsvp.dietaryPlaceholder)}
                          value={form.dietary}
                          onChange={(e) => set('dietary', e.target.value)}
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {status === 'error' && (
                <p className={styles.sendError} role="alert">
                  {sendErrorDetail || t(rsvp.errorSend)}
                </p>
              )}

              <div className={styles.submitRow}>
                <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={status === 'sending'}>
                  {status === 'sending' ? t(rsvp.sending) : t(rsvp.submit)}
                  {status !== 'sending' && <Icon name="arrow" />}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}

interface FieldProps {
  id: string
  label: string
  optional?: string
  hint?: string
  error?: string
  children: ReactNode
}

function Field({ id, label, optional, hint, error, children }: FieldProps) {
  return (
    <div className={styles.field} data-invalid={Boolean(error)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> · {optional}</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : (
        hint && (
          <span id={`${id}-hint`} className={styles.hint}>
            {hint}
          </span>
        )
      )}
    </div>
  )
}

function YesNoField({
  label,
  name,
  value,
  onChange,
}: {
  label: string
  name: string
  value: YesNo
  onChange: (value: YesNo) => void
}) {
  const { t } = useLang()
  return (
    <fieldset className={styles.yesNo}>
      <legend className={styles.yesNoLabel}>{label}</legend>
      <div className={styles.segment}>
        {(['yes', 'no'] as const).map((option) => (
          <label key={option} data-checked={value === option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {t(option === 'yes' ? rsvp.optionYes : rsvp.optionNo)}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
