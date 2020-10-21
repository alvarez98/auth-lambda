# Serverless Lambdas in Typescript

Lambdas in Typescript using functional programming bases.

## Getting Started :arrow_forward:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites :clipboard:

All things required for the project:

- AWS credentials
- [Node](https://nodejs.org/es/)
- [Serverless](https://www.serverless.com/)
- [Typescript](https://www.typescriptlang.org/)
- Postgres Instance
- DynamoDB Instance 

### Installing :arrow_down:

A step by step series of examples that tell you how to get a development env running

Say what the step will be
Create .env file with the properties in `.env.example` and run:

```sh
$ source .env
```

Install libraries and packages:
```sh
$ npm i
```

Run tests:
```sh
$ npm run test-session
$ npm run test-auth
$ npm run test-password
$ npm run test-email
$ npm run test-user
```

Deploy lambdas in AWS:
```sh
$ serverless deploy
```

Set permissions to lambda for DynamoDB access 


## Deployment :package:

Add additional notes about how to deploy this on a live system

## Built With :hammer_and_wrench:

* [Serverless](https://www.serverless.com/)
* [Typescript](https://www.typescriptlang.org/)

## Versioning :triangular_flag_on_post:

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Contributors :family_man_man_boy:

- **Esteban Alvarez** - _Initial work_ - [@alvarez98](https://github.com/alvarez98)

## Credits :star:

- **A template to make good README.md** - _Base template_ - [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

## References :link:

1. [Serverless-Typescript Documentation](https://www.serverless.com/plugins/serverless-plugin-typescript)

## License :page_facing_up:

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

Made with ❤️ by [Esteban Alvarez](https://github.com/alvarez98) 