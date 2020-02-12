This Docker container runs the "Phishing Trip" challenge at CodeCup. It expects the following ENV variables:

- `SECRET` - a secret string for encryption.
- `TARGET_PASSWORD` - a password the target must enter to enable target mode.
- `TARGET_NAME` - the full name of the person being targeted.
- `FLAG` - the flag result.
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM` - (common to CodeCup docker)
- `PORT` - optional, defaults to 8080
