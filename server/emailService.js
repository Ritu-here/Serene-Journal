const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendWelcomeEmail = async (name, email) => {
  await transporter.sendMail({
    from: `"Serene Journal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Serene Journal 🌿",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to Serene Journal, ${name}! 🌿</h2>

        <p>Your account has been created successfully.</p>

        <p>
          We're happy to have you with us.
          Start writing, reflecting, and growing every day.
        </p>

        <p>✨ Happy Journaling!</p>

        <p>— Serene Journal Team</p>
      </div>
    `,
  });
};



const sendNewUserNotification = async (name, email) => {
  await transporter.sendMail({
    from: `"Serene Journal" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New User Registered 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New User Registered! 🎉</h2>

        <p>A new user has joined Serene Journal.</p>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Joined:</strong> ${new Date().toLocaleString()}</p>

        <p>🌿 — Serene Journal</p>
      </div>
    `,
  });
};

const sendPasswordResetEmail = async (name, email, resetToken) => {
  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

  await transporter.sendMail({
    from: `"Serene Journal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Serene Journal Password 🔐",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
        <h2>Reset Your Password 🔐</h2>

        <p>Hi ${name},</p>

        <p>
          We received a request to reset your Serene Journal password.
        </p>

        <p>
          Click the button below to create a new password:
        </p>

        <p>
          <a
            href="${resetLink}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #5b8c5a;
              color: white;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Reset Password
          </a>
        </p>

        <p>
          This link will expire in <strong>15 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset, you can safely ignore this email.
        </p>

        <p>🌿 — Serene Journal Team</p>
      </div>
    `,
  });
};
module.exports = {
  sendWelcomeEmail,
  sendNewUserNotification,
  sendPasswordResetEmail,
};