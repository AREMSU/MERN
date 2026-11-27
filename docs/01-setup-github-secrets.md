# 1. Add the GitHub secrets

The pipeline needs these secrets. Add them in the repo under
Settings > Secrets and variables > Actions > New repository secret.
Never commit any of these values.

| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | your Docker Hub username (`aremsu`) |
| `DOCKERHUB_TOKEN` | a Docker Hub access token (Account Settings > Personal access tokens, Read & Write) |
| `JWT_SECRET` | output of `openssl rand -hex 32` |
| `ADMIN_EMAIL` | the shop admin email, for example `admin@store.com` |
| `ADMIN_PASSWORD` | the shop admin password |
| `AWS_ACCESS_KEY_ID` | from your AWS account (see below) |
| `AWS_SECRET_ACCESS_KEY` | from your AWS account (see below) |
| `AWS_SESSION_TOKEN` | only if your AWS credentials are temporary (see below) |

## AWS credentials

**Temporary credentials (AWS Academy / lab accounts).** The lab page has an "AWS Details" button with
"AWS CLI: Show". It lists three values: access key id, secret access key and session token.
Put all three in the secrets above. They expire when the lab session ends (about four hours),
so paste fresh values into GitHub every time you start the lab, before you push.

**Normal credentials (an IAM user with access keys).** Add only the first two. Skip `AWS_SESSION_TOKEN`.

Set `AWS_REGION` at the top of `.github/workflows/deploy.yml` to a region your account may use
(lab accounts are usually limited to `us-east-1`).
