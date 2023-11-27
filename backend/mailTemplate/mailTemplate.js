const activationMailTemplate = verifyLink => {
  return `<p>Activate account by click on the link</p>
          <a href="${verifyLink}" >Click on this</a> `;
};

module.exports = { activationMailTemplate };
