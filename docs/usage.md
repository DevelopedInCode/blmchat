[Back to README.md](../README.md)

# Installation

## Environment Variables

| Variable Name     | Description                                                                                            |      Required      | Documentation                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------ | :----------------: | :----------------------------------------------------------------- |
| `NEXTAUTH_URL`    | The domain the webapp is live at. Example: `http://localhost:3000`                                     | :white_check_mark: | [NextAuth](https://next-auth.js.org/configuration/options)         |
| `NEXTAUTH_SECRET` | The token used to secure JWT information. [OpenSSL Generator](https://generate-secret.vercel.app/32)   | :white_check_mark: | [NextAuth](https://next-auth.js.org/configuration/options)         |
| `DATABASE_URL`    | Database connection string. Prisma provides excellent documentation on each type of database supported | :white_check_mark: | [Prisma](https://www.prisma.io/docs/orm/reference/connection-urls) |
