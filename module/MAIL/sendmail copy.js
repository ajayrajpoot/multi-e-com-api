"use strict";

const nodemailer = require("nodemailer")
// const sesTransport = require('nodemailer-ses-transport')
const juice = require('juice')
const parser = require('es6views').parser
// const EmailLayout = require('../../views/emails/layout.es6')

// https://nodemailer.com/smtp/


const smtpTransport = nodemailer.createTransport(
    // sesTransport(
    //     {
    //     AWSAccessKeyID: process.env.SESKey || _config_.SES.key,
    //     AWSSecretKey: process.env.SESSecret || _config_.SES.secret,
    //     rateLimit: 3,
    //     region: "eu-west-1"
    // })
    {
        host: "smtp.jarha.in",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            //   user: testAccount.user, // generated ethereal user
            //   pass: testAccount.pass, // generated ethereal password

            user: "support@jarha.in",
            pass: "asd@1234",
        },
        tls: {
            rejectUnauthorized: false
        }
    }

)

// nodemailer.createTransport({
//     host: "smtp.example.com",
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//       user: "username",
//       pass: "password",
//     },
//   });

// nodemailer.createTransport({
//     pool: true,
//     host: "smtp.example.com",
//     port: 465,
//     secure: true, // use TLS
//     auth: {
//       user: "username",
//       pass: "password",
//     },
//   });

// nodemailer.createTransport({
//     host: "my.smtp.host",
//     port: 465,
//     secure: true, // use TLS
//     auth: {
//       user: "username",
//       pass: "pass",
//     },
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false,
//     },
//   });
const fromEmailID = "Jarha Support <support@jarha.in>"

/**
 * Send an email with HTML contents.
 * @class Emailer
 * @param  {String} to      Receiver of the email. Usually our users. You can also pass an array of multiple users in the following format: ["John Doe <john@appleseed.com>", "Jane Doe <jane@appleseed.com>"]
 * @param  {String} name    Name of the receiver. Usually our user's name. Ignored if to is an array.
 * @param  {String} subject Subject of the email.
 * @param  {String} html    The HTML contents. You can optionally pass the path to an instance of EmailLayout too.
 * @param {Object} data    Optional. If you pass an EmailLayout instance in HTML, you can optionally provide data that is to be set to the layout. This can also include attachments which will then be attached to the email.
 * @return {Promise}        Resolves with a promise.
 * 
 */


const emailHTMLES6 = (to, name, subject, html, data = {}, cc = false) => {

    if (to.constructor !== Array)
        to = `${name} <${to}>`

    let promise

    if (html.indexOf(".es6") > -1)
        promise = parser(html, data)
    else
        promise = Promise.resolve(html)

    return promise.then(html => {

        return juice(html, {
            "preserveImportant": true,
            "preserveMediaQueries": true
        })
    })
        .then(html => {

            let opts = {
                // from: subject == "Registration - Jarha" || subject == "Welcome  to Jarha - Your Shop" ? "Jarha Support <support@jarha.in>" : fromEmailID,
                from: fromEmailID,
                to: to,
                subject: subject,
                generateTextFromHTML: true,
                html: html
            }

            if (data.hasOwnProperty("attachments") && data.attachments instanceof Array) {
                opts.attachments = data.attachments
            }

            if (cc)
                opts.cc = cc

            return opts
        })
        .then(mailOptions => new Promise((resolve, reject) => {

            process.nextTick(() => {

                smtpTransport.sendMail(mailOptions, (err, response) => {

                    if (err)
                        return reject(err)

                    resolve(true)
                })
            })
        }))
}
const emailHTML = (to, name, subject, html, data = {}, cc = false) => {

    if (to.constructor !== Array)
        to = `${name} <${to}>`



    let mailOptions = {
        // from: subject == "Registration - Jarha" || subject == "Welcome  to Jarha - Your Shop" ? "Jarha Support <support@jarha.in>" : fromEmailID,
        from: fromEmailID,
        to: to,
        subject: subject,
        generateTextFromHTML: true,
        html: html
    }

    if (data.hasOwnProperty("attachments") && data.attachments instanceof Array) {
        mailOptions.attachments = data.attachments
    }

    if (cc)
        mailOptions.cc = cc

    smtpTransport.sendMail(mailOptions, (err, response) => {

        if (err)
            return reject(err)

        resolve(true)
    })
}

/**
 * Send an email with HTML contents.
 * @class Emailer
 * @param  {String} to      Receiver of the email. Usually our sellers. You can also pass an array of multiple sellers in the following format: ["John Doe <john@appleseed.com>", "Jane Doe <jane@appleseed.com>"]
 * @param  {String} name    Name of the receiver. Usually our seller's name. This must be ignored if "to"(first parameter of the method i.e. reciever) is an array.
 * @param  {String} subject Subject of the email.
 * @param  {String} text    The plain-text contents
 * @param  {Object} data    The data object can only consist of an attachments property which will be attached to the email
 * @return {Promise}        Resolves with a promise.
 */
const emailText = (to, name, subject, text, data = {}, cc = false) => {

    if (to?.constructor !== Array)
        to = `${name} <${to}>`

    let mailOptions = {
        from: fromEmailID,
        to: to,
        subject: subject,
        generateTextFromHTML: true,
        text: text
    }
 
    if (cc) {
        mailOptions.cc = cc;
    }

    if (data.hasOwnProperty("attachments") && data.attachments instanceof Array) {
        mailOptions.attachments = data.attachments
    }

    return new Promise((resolve, reject) => {

        process.nextTick(() => {

            smtpTransport.sendMail(mailOptions, (err, response) => {

                if (err)
                    return reject(err)
                console.log(__line, 'mail Response', JSON.stringify(response));
                resolve(true)
            })
        })
    })
}

const emailTextWithAttachment = (to, from, subject, cc = false, filename, path, text = false) => {

    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        generateTextFromHTML: true,
        text: text,
        attachments: [
            {
                filename: filename,
                path: path,
                contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
        ]
    }

    if (cc)
        mailOptions.cc = cc

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, function (err, response) {
            if (err) {
                reject(err)
                return
            }

            console.log(response)
            resolve(true)

        })
    })
}
module.exports = { emailHTML, emailText, emailTextWithAttachment }
