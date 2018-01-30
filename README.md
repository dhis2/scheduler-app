# Scheduler for DHIS 2

The Scheduler is an app for managing server jobs in DHIS2. It provides the ability to create, modify and delete jobs, given the right permissions.

### Getting started

The dependencies of the app are managed by `npm` or `yarn` (recommended).

```bash
> git clone git@github.com:dhis2/scheduler-app.git
> cd scheduler-app
> yarn
```

Once dependencies are installed, you can run the app locally using yarn (or npm):

```bash
> yarn start
```

By default, the app will be served on [localhost:9000](http://localhost:9000), and will attempt to connect to the DHIS2 API at [localhost:8080/api](http://localhost:8080/api). These settings can be changed in the `constants/development.js` file, where the basic authentication string is a simple base64-encoded version of the string `user:password`. For example,

```javascript
btoa('admin:district'); // returns "YWRtaW46ZGlzdHJpY3Q="
```

This command can be executed in the Chrome inspection panel.

### Development

#### Code style

Before commiting a change, please format your code:

```bash
> yarn run format
```

For this to work, you must have `prettier` installed globally in either `yarn` or `npm`

```bash
> yarn global add prettier
```

### Deployment

The Scheduler app is embedded in the DHIS2 core, and is therefore deployed via Sonatype. Travis is configured to *deploy successful builds automatically*.

The following command is used to deploy the app manually. Always remember to `yarn build` before deployment.

```bash
> yarn run deploy
```