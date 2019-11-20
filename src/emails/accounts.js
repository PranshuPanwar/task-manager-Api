const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.sendgridAPIkey);
const sendWelcomeEmail =(email ,name)=>{
    sgMail.send({
    to:email,
    from:'pranshupnwr@gmail.com',
    subject :'This is my first try',
    text :`Welcome to the task manager app ${name}`
})
}
const sendCancellationEmail = (email, name)=>{
sgMail.send({
    to: email,
    from : 'pranshupnwr@gmail.com',
    subject :'Cancellation email',
    text:`Sorry for inconvience you hava ${name} ,hope we help you out in future`
})
}
module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}