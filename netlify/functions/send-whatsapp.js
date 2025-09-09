exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const data = JSON.parse(event.body || '{}');
    const name = data.name || '';
    const phone = data.phone || '';
    const email = data.email || '';
    const service = data.service || '';
    const message = data.message || '';

    const token = process.env.WHATSAPP_TOKEN;
    const fromPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const toNumber = process.env.WHATSAPP_TO_NUMBER;

    if (!token || !fromPhoneId || !toNumber) {
      return { statusCode: 500, body: 'Server not configured' };
    }

    const text = `New Contact Submission\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`;

    const res = await fetch(`https://graph.facebook.com/v19.0/${fromPhoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: toNumber,
        type: 'text',
        text: { body: text }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      return { statusCode: 502, body: errText };
    }
    const payload = await res.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, id: payload.messages && payload.messages[0] && payload.messages[0].id })
    };
  } catch (e) {
    return { statusCode: 400, body: 'Bad Request' };
  }
};

