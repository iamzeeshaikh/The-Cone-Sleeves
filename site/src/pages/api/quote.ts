import type { APIRoute } from 'astro';
import { transport, MAIL_FROM, recipients, renderTable, renderText, json, success } from '../../lib/mailer';

export const prerender = false;

/**
 * Replaces Gravity Forms form #1 ("Get A Free Quote"). Recipients, subject,
 * sender and the post-submit redirect are the ones configured in WordPress.
 */
const SUBJECT = 'New submission from Get A Free Quote';

/** Gravity Forms input names, in the order they appear on the page. */
const SINGLE_FIELDS: Array<[string, string]> = [
  ['input_1', 'Product'],
  ['input_21', 'Other Product Name'],
  ['input_2', 'Quantity'],
  ['input_23', 'Unit'],
  ['input_3', 'Length'],
  ['input_5', 'Width'],
  ['input_4', 'Height'],
  ['input_10', 'Printing'],
  ['input_11', 'Stock'],
  ['input_12.3', 'Name'],
  ['input_14', 'Phone'],
  ['input_13', 'Email'],
  ['input_18', 'Additional Notes'],
];

/** Checkbox groups: every `input_<id>.<n>` under one label. */
const CHECKBOX_GROUPS: Array<[string, string]> = [
  ['input_7', 'Material'],
  ['input_8', 'Lamination'],
  ['input_9', 'Add-ons'],
];

const MAX_UPLOAD = 25 * 1024 * 1024;
const ALLOWED_UPLOADS = /\.(jpe?g|png|gif|webp|svg|pdf|ai|eps|psd|zip|rar|cdr)$/i;

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'Could not read the submitted form.' }, 400);
  }

  const value = (key: string) => {
    const v = form.get(key);
    return typeof v === 'string' ? v.trim() : '';
  };

  const email = value('input_13');
  const phone = value('input_14');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }
  if (!phone) {
    return json({ ok: false, error: 'Please enter a phone number.' }, 400);
  }

  const rows: Array<[string, string]> = [];
  for (const [key, label] of SINGLE_FIELDS) {
    const v = value(key);
    if (v) rows.push([label, v]);
  }
  for (const [prefix, label] of CHECKBOX_GROUPS) {
    const picked: string[] = [];
    for (const [key, v] of form.entries()) {
      if (key.startsWith(`${prefix}.`) && typeof v === 'string' && v.trim()) picked.push(v.trim());
    }
    if (picked.length) rows.push([label, picked.join(', ')]);
  }

  const attachments: Array<{ filename: string; content: Buffer }> = [];
  const upload = form.get('input_19');
  if (upload instanceof File && upload.size > 0) {
    if (upload.size > MAX_UPLOAD) {
      return json({ ok: false, error: 'Attachment is larger than 25 MB.' }, 400);
    }
    if (!ALLOWED_UPLOADS.test(upload.name)) {
      return json({ ok: false, error: 'That file type is not accepted.' }, 400);
    }
    attachments.push({ filename: upload.name, content: Buffer.from(await upload.arrayBuffer()) });
  }

  try {
    await transport().sendMail({
      from: MAIL_FROM(),
      to: recipients('FORM_TO_QUOTE'),
      replyTo: email,
      subject: SUBJECT,
      text: renderText(rows),
      html: renderTable(rows),
      attachments,
    });
  } catch (err) {
    console.error('quote form send failed', err);
    return json(
      { ok: false, error: 'We could not send your request. Please email support@conesleeves.com.' },
      502
    );
  }

  return success(request);
};
