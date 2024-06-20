// https://developers.cloudflare.com/pages/functions/

interface Env {
  MAILGUN_API_KEY: string;
}

type FormValues = {
  name: string;
  email: string;
  message: string;
};

// @ts-expect-error invalid types
export const onRequest: PagesFunction<Env> = async (ctx) => {
  const contact: FormValues = await ctx.request.json();

  if (!contact.name || !contact.email || !contact.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing fields",
      }),
    };
  }

  const sourceName = "Static Site Starter";
  const sourceUrl = "https://site-starter.pages.dev";
  const emailTo = "dev@alexlotte.ca";
  const subject = `${sourceName} contact form message from ${contact.name}`;
  const emailFrom = `${contact.name} <${contact.email}>`;
  const mailgunDomain = "mailing.alexlotte.ca";

  const htmlMessage = contact.message.replace(/(?:\r\n|\r|\n)/g, "<br />");

  const html = `
    <p><b>Site:</b> <a target="_blank" href="${sourceUrl}">${sourceName}</a></p>
    <p><b>Name:</b> ${contact.name}</p>
    <p><b>Email:</b> ${contact.email}</p>
    <p><b>Message:</b></p>
    <p>${htmlMessage}</p>
  `;

  const payload = new FormData();
  payload.append("from", emailFrom);
  payload.append("to", emailTo);
  payload.append("subject", subject);
  payload.append("html", html);

  return await fetch(`https://api.mailgun.net/v3/${mailgunDomain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`api:${ctx.env.MAILGUN_API_KEY}`)}`,
    },
    body: payload,
  });
};
