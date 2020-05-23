const { series } = require('gulp');
const { exec } = require('child_process');
const path = require('path');

/** Configuration Constants */
const BUILD_VERSION = 'v1';
const SERVICE_NAME = 'service-payments';
const CONTAINER_REGISTRY = '730880032795.dkr.ecr.eu-west-1.amazonaws.com';
const DOCKER_FILE_PATH = path.join(__dirname, '../Dockerfile');

/**
 * Build Docker Image
 * @param {*} cb 
 */
function buildDockerImage(cb) {
  let options = {
    cwd: path.join(__dirname, '../')
  };

  exec(`docker build -f ${DOCKER_FILE_PATH} -t ${CONTAINER_REGISTRY}/${SERVICE_NAME}:${BUILD_VERSION} .`, options, (err, stdout, stderr) => {
    console.log('STDOUT', stdout);

    if (stderr)
      console.log('STDERR', stderr);

    cb(err);
  });
}

/**
 * Push Image to Registry
 * @param {*} cb 
 */
function pushDockerImage(cb) {
  exec(`docker push ${CONTAINER_REGISTRY}/${SERVICE_NAME}:${BUILD_VERSION}`, (err, stdout, stderr) => {
    console.log('STDOUT', stdout);

    if (stderr)
      console.log('STDERR', stderr);

    cb(err);
  });
}

exports.default = series(buildDockerImage, pushDockerImage);