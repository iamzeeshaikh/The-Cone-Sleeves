import type { APIRoute } from 'astro';
import { transport, MAIL_FROM, recipients, renderTable, renderText, json, success } from '../../lib/mailer';

export const prerender = false;

interface FormConfig {
  /** Human name, for logs only. */
  label: string;
  subject: string;
  /** Environment variable that may override SMTP_TO for this form. */
  envKey: string;
  /** Elementor field id -> on-screen label, in display order. */
  fields: Array<[string, string]>;
  /** Which field holds the sender's email address. */
  emailField: string;
}

/**
 * The five Elementor Pro forms. Elementor names its fields with opaque ids and
 * reuses keys between forms (the homepage hero form stores the *name* under
 * `email`), so each form carries its own field map.
 */
const FORMS: Record<string, FormConfig> = {
  db5b507: {
    label: 'Homepage hero — Get Free Quote',
    subject: 'New message from The Cone Sleeves',
    envKey: 'FORM_TO_DEFAULT',
    fields: [
      ['email', 'Name'],
      ['field_9faedbb', 'Email'],
      ['field_859e9e3', 'Phone'],
      ['message', 'Message'],
    ],
    emailField: 'field_9faedbb',
  },
  dab954a: {
    label: 'Homepage — Find Out the Cost',
    subject: 'New message The Cone Sleeves Quote',
    envKey: 'FORM_TO_DEFAULT',
    fields: [
      ['name', 'Name'],
      ['field_dbb1ca6', 'Phone Number'],
      ['email', 'Email'],
      ['field_bbc69d7', 'Preferred Contact Method'],
      ['message', 'Additional Information'],
    ],
    emailField: 'email',
  },
  '2725c75': {
    label: 'Product pages — Find Out the Cost',
    subject: 'New message The Cone Sleeves Quote',
    envKey: 'FORM_TO_DEFAULT',
    fields: [
      ['name', 'Name'],
      ['field_dbb1ca6', 'Phone Number'],
      ['email', 'Email'],
      ['field_bbc69d7', 'Preferred Contact Method'],
      ['message', 'Additional Information'],
    ],
    emailField: 'email',
  },
  fba3ad2: {
    label: 'Contact page',
    subject: 'New message from "The Cone Sleeves"',
    envKey: 'FORM_TO_DEFAULT',
    fields: [
      ['name', 'Name'],
      ['email', 'Email'],
      ['message', 'Message'],
    ],
    emailField: 'email',
  },
  '881a5df': {
    label: 'Get Instant Quote popup',
    subject: 'New message from "The Cone Sleeves"',
    envKey: 'FORM_TO_POPUP',
    fields: [
      ['name', 'Name'],
      ['email', 'Email'],
      ['field_4cf72c7', 'Phone'],
      ['message', 'Message'],
    ],
    emailField: 'email',
  },
};

/** Hidden inputs Elementor renders to catch bots. */
const HONEYPOTS = ['field_179dce0', 'field_ae1355b', 'field_7cdefe5'];

const MAX_UPLOAD = 10 * 1024 * 1024;
const ALLOWED_UPLOADS = /\.(jpe?g|png|gif|webp|svg|pdf|ai|eps|psd|zip|rar|cdr)$/i;

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'Could not read the submitted form.' }, 400);
  }

  const field = (key: string) => {
    const v = form.get(`form_fields[${key}]`);
    return typeof v === 'string' ? v.trim() : '';
  };

  // Accept silently so bots learn nothing from the response.
  if (HONEYPOTS.some((h) => field(h) !== '')) {
    return success(request);
  }

  const config = FORMS[String(form.get('form_id') || '')];
  if (!config) return json({ ok: false, error: 'Unknown form.' }, 400);

  const email = field(config.emailField);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  const rows: Array<[string, string]> = config.fields
    .map(([id, label]) => [label, field(id)] as [string, string])
    .filter(([, v]) => v !== '');

  const source = String(form.get('source_page') || '');
  if (source) rows.push(['Submitted from', `https://www.theconesleeves.com${source}`]);

  const attachments: Array<{ filename: string; content: Buffer }> = [];
  for (const [, value] of form.entries()) {
    if (typeof value === 'string' || !(value instanceof File) || value.size === 0) continue;
    if (value.size > MAX_UPLOAD) {
      return json({ ok: false, error: 'Attachment is larger than 10 MB.' }, 400);
    }
    if (!ALLOWED_UPLOADS.test(value.name)) {
      return json({ ok: false, error: 'That file type is not accepted.' }, 400);
    }
    attachments.push({ filename: value.name, content: Buffer.from(await value.arrayBuffer()) });
  }

  try {
    await transport().sendMail({
      from: MAIL_FROM(),
      to: recipients(config.envKey),
      replyTo: email,
      subject: config.subject,
      text: renderText(rows),
      html: renderTable(rows),
      attachments,
    });
  } catch (err) {
    console.error(`[${config.label}] send failed`, err);
    return json(
      { ok: false, error: 'We could not send your message. Please email support@conesleeves.com.' },
      502
    );
  }

  return success(request);
};
