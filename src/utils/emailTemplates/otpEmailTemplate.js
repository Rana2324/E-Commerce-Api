/**
 * OTP Email Template (Modern UI Style with Copy Hint)
 * @param {Object} options - Template options
 * @param {string} options.otp - One-time password
 * @param {string} options.email - User email
 * @param {string} [options.recipientEmail] - Email receiving the OTP (for testing)
 * @returns {string} - Styled HTML email template
 */
export const otpEmailTemplate = ({ otp, email, recipientEmail }) => {
  const recipient = recipientEmail || email;

  return `
    <div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; padding: 30px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); overflow: hidden;">
        <div style="background-color: #1976d2; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Login Verification</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333333;">Hello,</p>
          <p style="font-size: 16px; color: #555;">We received a request to log in to the account associated with:</p>
          <p style="font-size: 16px; color: #1976d2;"><strong>${email}</strong></p>
          <p style="font-size: 16px; color: #555;">This email was sent to: <strong>${recipient}</strong></p>
          <p style="font-size: 16px; color: #555;">Please use the following one-time password (OTP) to complete your login:</p>
          <div style="text-align: center; margin: 30px 0;">
            <code style="font-size: 28px; font-weight: bold; letter-spacing: 5px; padding: 15px 30px; background-color: #e3f2fd; border: 1px solid #90caf9; color: #0d47a1; border-radius: 6px; display: inline-block;">
              ${otp}
            </code>
            <p style="font-size: 14px; color: #777; margin-top: 8px;">You can copy the OTP above and paste it to complete your login.</p>
          </div>
          <p style="font-size: 16px; color: #555;">This OTP is valid for 5 minutes. If you did not request it, you can safely ignore this message.</p>
          <p style="font-size: 14px; color: #888; margin-top: 40px; text-align: center;">This is an automated message. Please do not reply.</p>
        </div>
      </div>
    </div>
  `;
};

export default otpEmailTemplate;
