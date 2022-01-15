# hello-lambda-env-public

- Use `yarn deploy` to make the initial deploy
- Use `yarn query` to make an initial call to the endpoint
- Change _src/message.json_ to change the message set in the handler and environment variable
- Use `k6:query:during-deploy` to make several API requests while deploying the stack
- Check CloudWatch Insights and note there
- Change serverless.yml and uncomment the `# - serverless-plugin-canary-deployments` line to use AWS CodeDeploy
- Change _src/message.json_ to change the message set in the handler and environment variable
- Use `k6:query:during-deploy` to make several API requests while deploying the stack

## CloudWatch Insights

The following CloudWatch Insights query shows where the message set in the lambda is different from the one set in the environment variable.

```
fields @timestamp, @message, lambda, environment, lambda != environment as different, @logStream
| sort @timestamp desc
| filter ispresent(different)
| stats count(*) by different, lambda, environment
```
