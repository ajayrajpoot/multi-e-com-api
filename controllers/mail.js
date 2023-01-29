
const msendmail = require('../module/MAIL/msendmail');
const buyer = require('../models/buyer');


/**
 * 
 * @param { subject:'', html:'', buyerID:'', email:'', name:'' } body 
 * @returns 
 */
const sendmail = async (body) => {
    let subject = body.subject;
    let html = body.html;

    if (!subject || !html)
        throw 'subject and body is required'

    let prm = {}
    if (body.email && body.name) {
        prm = {
            to: body.email,
            name: body.name,
            subject: body.subject,
            html: body.html,
        }
    } else if (body.buyerID) {
        let [user] = await buyer.getBuyer({ id: body.buyerID });
        prm = {
            to: user.email,
            name: user.name,
            subject: body.subject,
            html: body.html,
        }
    } else {
        throw 'buyerID or subject and html is required.';
    }

    let p = await SEND_MAIL(prm)
    return p;
}

//Mail
const SEND_MAIL = async (p) => {
    console.log("p", p);
    try {
        let prm = {
            to: p?.to || ['ajayrajpoot1993@gmail.com', 'ajayrajpoot2017@gmail.com'],
            name: p?.name || 'Ajay',
            subject: p?.subject || 'Report',
            html: p?.html|| "Hello",

        }
        console.log(__line, prm);
        console.log('=====================');
        let rep = await msendmail.emailText(prm.to, prm.name, prm.subject, prm.html);

        // (Subject, htmlString, mailTo = "ajayrajpoot1993${p.gmail.com") =>
        // let message = new MailMessage();
        // let smtp = new SmtpClient();
        //     message.From = new MailAddress("support${p.jarha.in");
        //     message.To.Add(new MailAddress(mailTo));
        //     message.Subject = Subject;
        //     message.IsBodyHtml = true; //to make message body as html  
        //     message.Body = htmlString;
        //     smtp.Port = 25;//581
        //     //smtp.Port = 587;
        //     smtp.Host = "smtp.jarha.in"; //for gmail host  
        //     smtp.EnableSsl = false;
        //     smtp.UseDefaultCredentials = false;
        //     smtp.Credentials = new NetworkCredential("support${p.jarha.in", "asd${p.1234");
        //     smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
        //     smtp.Send(message);
        // return "Mail Send";

        console.log(__line, rep);

        return { data: "rsend", result: true, message: '' };

    }
    catch (ex) {
        console.log(__line, ex.message || ex);
        return { data: "rsend", result: true, message: '' };

    }
}

module.exports = { sendmail, SEND_MAIL }