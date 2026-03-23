const { exec } = require("child_process");
const path = require("path");

function runSandbox(jobDir) {
  return new Promise((resolve, reject) => {
    const absJobDir = path.resolve(jobDir);

    const command = `timeout 10s docker run --rm \
--memory=256m \
--memory-swap=256m \
--cpus=0.5 \
--pids-limit=64 \
--read-only \
--tmpfs /tmp:rw,noexec,nosuid,size=64m \
--cap-drop=ALL \
--security-opt no-new-privileges \
--network none \
--user 1000:1000 \
-v "${absJobDir}:/workspace:ro" \
sandbox-image`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject({
          error: error.message,
          stdout,
          stderr
        });
      }

      resolve({
        stdout,
        stderr
      });
    });
  });
}

module.exports = { runSandbox };