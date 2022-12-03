const nodemailer= require("nodemailer")

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "cacaosfarmacy@outlook.com",
          pass: "eveffuaaqpptpvjf"
        }
      });
    const mensaje={
        from: "Cacaos Company <cacaosfarmacy@outlook.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports= sendEmail;