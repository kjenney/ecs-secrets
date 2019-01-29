# fargate

An example Fargate service.

Runs nodejs with Express.

Passes Environment Variables to container

This example uses a public VPC and Load-Balancer

## Docker Image

The Docker image is very basic. It's just a super-simple NodeJS application that is started by the run.sh script. The purpose of this script is to pass in environmental variables that are set in the CloudFormation stack.

## Deploy

1. Create secrets
2. CF public-vpc.yml
3. CF public-service.yml (Reference stack name created by step 1)
