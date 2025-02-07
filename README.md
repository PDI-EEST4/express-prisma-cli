# Express-Prisma-CLI

A CLI tool to create Express API resources using prismajs as ORM. 

## Installation

```bash
npm install -g express-cli
```

## Usage

There are two main commands:

- `express-cli start-app`: Start a new Node API project.
- `express-cli create-resource <ResourceName>`: Create a new resource.

When starting a new project, the script will install the necessary dependencies and create the `index.js` file.

When creating a new resource, all the files will be created in the current directory. These files are:

- `controllers/<ResourceName>Controller.js`
- `routes/<ResourceName>Routes.js`
- `repository/<ResourceName>Repository.js`
- `services/<ResourceName>Service.js`

Apart from that, the script will also update the `prisma` schema and the `routes/index.js` file to include the new resource. 

```bash
# Example
express-cli start-app # Start a new Node API project
express-cli create-resource Task # Create a new resource
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you have any suggestions or find any bugs, please open an issue or pull request on GitHub.

