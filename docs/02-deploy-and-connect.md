# 2. Deploy and connect

## Deploy
1. Make sure the secrets from `01-setup-github-secrets.md` exist (lab accounts: fresh AWS values).
2. Push to `main`, or run the workflow by hand: Actions > CI/CD > Run workflow.
3. Watch the Actions tab. `build` checks the code and pushes the images to Docker Hub.
   `deploy` creates the server the first time (about 2-3 minutes), then starts the containers.
4. The last step prints `site is live: http://<ip>`. Open that address.
   The admin login is the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you set in the secrets.

Every later push only replaces the containers. The server and its IP stay the same
(unless the lab stops the instance, see below).

## Connect to the server
The private key lives in SSM. Fetch it and log in:
```
KEY_ID=$(aws cloudformation describe-stacks --stack-name shop-stack \
  --query "Stacks[0].Outputs[?OutputKey=='KeyPairId'].OutputValue" --output text)
aws ssm get-parameter --name "/ec2/keypair/$KEY_ID" --with-decryption \
  --query Parameter.Value --output text > shop-key.pem
chmod 600 shop-key.pem
ssh -i shop-key.pem ec2-user@<server-ip>
cd shop && docker compose ps && docker compose logs backend
```

## Clean up (saves credits)
```
aws cloudformation delete-stack --stack-name shop-stack
```
This deletes the server and the database data on it.

## Common problems
| Problem | Fix |
|---|---|
| `ExpiredToken` or `InvalidClientTokenId` | Lab credentials expired. Copy fresh values into the three AWS secrets and re-run. |
| `AccessDenied` creating the stack | The account blocks that action. Send me the exact message in the Actions log. |
| `waiting for the server` never ends | Check the instance in the EC2 console. UserData logs: `/var/log/cloud-init-output.log`. |
| Site opens but the page is empty or errors | `docker compose logs backend` on the server. |
| IP changed after a lab restart | Re-run the workflow. The new address is printed at the end. |
| `denied` pulling images | Make `shop-backend` and `shop-frontend` public on Docker Hub. |
