# hello-lambda-env-public

Example showing the issue of changing a lambda's environment variables and changing a lamba's code not happening at the same moment, see https://awsteele.com/blog/2020/12/24/aws-lambda-latest-is-dangerous.html for background information

## Steps

- Use `yarn deploy` to make the initial deploy
- Use `yarn query` to make an initial call to the endpoint
- Change _src/message.json_ to change the message set in the handler and environment variable
- Use `k6:query:during-deploy` to make several API requests (at most 18k) while deploying the stack
- Use the CloudWatch Insights query below and note the message from the lambda and environment will be different for some requests
- Change serverless.yml and uncomment the `# - serverless-plugin-canary-deployments` line to use AWS CodeDeploy
- Change _src/message.json_ to change the message set in the handler and environment variable
- Use `k6:query:during-deploy` to make several API requests while deploying the stack
- Use the CloudWatch Insights query below and note the message from the lambda and environment will be different for some requests. I think this will only happen on the first deployment with AWS CodeBuild switching the _live_ alias.
- Change _src/message.json_ to change the message set in the handler and environment variable
- Use `k6:query:during-deploy` to make several API requests while deploying the stack
- Use the CloudWatch Insights query below and note the message from the lambda and environment won't be different anymore.

## CloudWatch Insights

The following CloudWatch Insights query shows where the message set in the lambda is different from the one set in the environment variable.

```
fields @timestamp, @message, lambda, environment, lambda != environment as different, @logStream
| sort @timestamp desc
| filter ispresent(different)
| stats count(*) by different, lambda, environment
```
