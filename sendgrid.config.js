const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getMessage(to, body, subject) {

    return {
        to: to,
        from: 'rajvardhan@webkorps.com',
        subject: subject,
        text: body,
        html: `<strong>${body}</strong>`,
    };
}

async function sendEmail(to, body, subject) {
    try {
        await sendGridMail.send(getMessage(to, body, subject));
        console.log('Test email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending test email');
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
        return false;
    }
}

module.exports = {
    sendEmail
}