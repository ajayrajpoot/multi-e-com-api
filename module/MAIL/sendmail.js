"use strict";

const nodemailer = require("nodemailer")
// const sesTransport = require('nodemailer-ses-transport')
const juice = require('juice')
const parser = require('es6views').parser
// const EmailLayout = require('../../views/emails/layout.es6')

// https://nodemailer.com/smtp/

class Mail {
    smtpTransport;
    fromEmailID;
    constructor(vender) {

        smtpTransport = nodemailer.createTransport(
            {
                host: "smtp.jarha.in",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {

                    user: "support@jarha.in",
                    pass: "asd@1234",
                },
                tls: {
                    rejectUnauthorized: false
                }
            }

        )

        fromEmailID = "Jarha Support <support@jarha.in>"

    }
    emailHTMLES6 = (to, name, subject, html, data = {}, cc = false) => {

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
    emailHTML = (to, name, subject, html, data = {}, cc = false) => {

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

    emailText = (to, name, subject, text, data = {}, cc = false) => {

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

    emailTextWithAttachment = (to, from, subject, cc = false, filename, path, text = false) => {

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
} 