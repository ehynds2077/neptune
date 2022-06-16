const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export function validateEmail(email: string) {
  if (!email) return false;

  const parts = email.split("@");

  if (parts.length !== 2) return false;

  const account = parts[0];
  const address = parts[1];

  if (account.length > 64) return false;
  if (address.length > 255) return false;

  const domain = address.split(".");
  if (domain.some((part) => part.length > 63)) {
    return false;
  }

  if (!emailRegex.test(email)) return false;

  return true;
}
