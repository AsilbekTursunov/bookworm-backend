import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export function sendMessage(to, name, code, type = 'forget') {
  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  transporter.sendMail({
    from: 'Maddison Foo Koch 👻', // sender address
    to, // list of receivers
    subject: "BookWorm forget password verification", // Subject line
    html: type == 'forget' ? `
      <div style="
        display: flex; 
        flex-direction: column; 
        width: 80%; 
        max-width: 500px;
        margin: 40px auto; 
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 12px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        font-family: Arial, sans-serif;
      ">
        <h1 style="font-size: 20px; font-weight: 400; color: #333; text-align: left; margin-bottom: 10px; text-transform:capitalize;">Hi, ${name}!</h1>

        <div style="width: 100%; text-align: center; margin-bottom: 15px;">
            <h1 style="font-weight: 600; font-size: 24px; color: #222; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">Verification Code to Reset Your Password</h1>
        </div>

        <p style="
            font-size: 32px; 
            font-weight: bold; 
            color: #007bff; 
            background-color: #e6f2ff; 
            padding: 10px 20px; 
            display: inline-block; 
            border-radius: 8px;
            letter-spacing: 2px;
        ">${code}</p>

        <p style="font-size: 16px; font-weight: 500; color: #555; margin-top: 15px;">
            Please use the above verification code to reset your password. 
            This code is valid for the next 10 minutes.
        </p> 
        <p style="font-size: 14px; color: #888; margin-top: 15px;">
            If you did not request this, please ignore this email.
        </p>
    </div> `
      :
      `
        <div style="
          display: flex; 
          flex-direction: column; 
          width: 80%; 
          max-width: 500px;
          margin: 40px auto; 
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          font-family: Arial, sans-serif;
        ">
            <h1 style="font-size: 20px; font-weight: 400; color: #333; text-align: left; margin-bottom: 10px; text-transform:capitalize">Hi, ${name}!</h1>

            <div style="width: 100%; text-align: center; margin-bottom: 15px;">
                <h1 style="font-weight: 600; font-size: 24px; color: #222; font-family:Arial">Verification Code To Your Email</h1>
            </div>

            <p style="
              font-size: 32px; 
              font-weight: bold; 
              color: #007bff; 
              background-color: #e6f2ff; 
              padding: 10px 20px; 
              display: inline-block; 
              border-radius: 8px;
              letter-spacing: 2px;
            ">8427</p>

            <p style="font-size: 16px; font-weight: 500; color: #555; margin-top: 15px;">
                Please use the above verification code to reset your password. 
                This code is valid for the next 10 minutes.
            </p> 
            <p style="font-size: 14px; color: #888; margin-top: 15px;">
                If you did not request this, please ignore this email.
            </p>
        </div>
      `
  });
}
