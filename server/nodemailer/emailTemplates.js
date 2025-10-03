export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #667eea, #764ba2); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #667eea;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Viby Chat</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Viby Chat</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #667eea, #764ba2); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to Viby Chat!</h1>
    <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Ready to start chatting with your friends?</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; margin-bottom: 20px;">Hello <strong>{fullName}</strong>,</p>
    
    <p>Welcome to Gup Shup! We're thrilled to have you join our community of users who love simple, personal conversations.</p>
    
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #667eea;">
      <h3 style="color: #667eea; margin: 0 0 15px 0;">🚀 Getting Started</h3>
      <ul style="margin: 0; padding-left: 20px;">
        <li style="margin: 8px 0;">Complete your profile to help friends find you</li>
        <li style="margin: 8px 0;">Start your first one-on-one conversation</li>
        <li style="margin: 8px 0;">Share photos and memories with friends</li>
        <li style="margin: 8px 0;">Customize your notification settings</li>
      </ul>
    </div>

    <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
      <h3 style="color: white; margin: 0 0 15px 0;">✨ What Makes Gup Shup Special?</h3>
      <div style="display: flex; flex-wrap: wrap; justify-content: space-around; margin-top: 15px;">
        <div style="color: white; margin: 10px; flex: 1; min-width: 140px;">
          <div style="font-size: 24px; margin-bottom: 5px;">💬</div>
          <div style="font-size: 14px;">Personal messaging</div>
        </div>
        <div style="color: white; margin: 10px; flex: 1; min-width: 140px;">
          <div style="font-size: 24px; margin-bottom: 5px;">📸</div>
          <div style="font-size: 14px;">Photo sharing</div>
        </div>
        <div style="color: white; margin: 10px; flex: 1; min-width: 140px;">
          <div style="font-size: 24px; margin-bottom: 5px;">🔒</div>
          <div style="font-size: 14px;">Secure & private</div>
        </div>
        <div style="color: white; margin: 10px; flex: 1; min-width: 140px;">
          <div style="font-size: 24px; margin-bottom: 5px;">⚡</div>
          <div style="font-size: 14px;">Fast & simple</div>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{appUrl}" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block; transition: transform 0.2s;">
        Start Chatting Now 🚀
      </a>
    </div>

    <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 25px 0;">
      <h4 style="color: #2c5282; margin: 0 0 10px 0;">💡 Pro Tips:</h4>
      <p style="margin: 0; color: #2d3748; font-size: 14px;">
        • Share photos to make your conversations more memorable<br>
        • Use emojis to express yourself better<br>
        • Keep your conversations organized with search<br>
        • Enable dark mode in settings for a sleek experience
      </p>
    </div>

    <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team. We're here to help!</p>
    
    <p style="margin-top: 30px;">
      Happy chatting! 💬<br>
      <strong>The Gup Shup Team</strong>
    </p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
    <p>Follow us on social media for updates and tips!</p>
    <div style="margin: 10px 0;">
      <a href="{twitterUrl}" style="color: #1DA1F2; text-decoration: none; margin: 0 10px;">Twitter</a>
      <a href="{facebookUrl}" style="color: #4267B2; text-decoration: none; margin: 0 10px;">Facebook</a>
      <a href="{instagramUrl}" style="color: #E4405F; text-decoration: none; margin: 0 10px;">Instagram</a>
    </div>
    <p style="margin-top: 15px;">
      This is an automated message, please do not reply to this email.<br>
      If you didn't create an account with us, please <a href="{supportUrl}" style="color: #667eea;">contact support</a>.
    </p>
  </div>
</body>
</html>
`;




