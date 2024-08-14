import * as cdk from 'aws-cdk-lib';
import { MyPipelineStack } from '../lib/pipeline-cdk-stack';
import { EcrCdkStack } from '../lib/ecr-cdk-stack';
import { AppCdkStack } from '../lib/app-cdk-stack';

const app = new cdk.App();
const ecrCdkStack = new EcrCdkStack(app, 'ecr-stack', {});

const testCdkStack = new AppCdkStack(app, 'test', {
  ecrRepository: ecrCdkStack.repository,
});

new MyPipelineStack(app, 'MyPipelineStack', {
    ecrRepository: ecrCdkStack.repository,
    fargateServiceTest: testCdkStack.fargateService,
  });


