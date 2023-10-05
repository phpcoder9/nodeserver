// Function to generate an HTML template
function DefaultEmailTemplate() {
  const html = `
    <html>
      <head>
        <title>Welcome Email</title>
      </head>
      <body>
        <h1>Hello </h1>
        <p>Thank you for signing up for our service!</p>
      </body>
    </html>
  `;

  return html;  
}

// Export the function
module.exports = DefaultEmailTemplate;