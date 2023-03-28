import execa from 'execa'
import getStream from 'get-stream'

async function compress(inputBuffer) {
  const cp = execa('bzip2', {input: inputBuffer})
  const [stdout, stderr] = await Promise.all([
    getStream.buffer(cp.stdout),
    getStream(cp.stderr),
  ])
  if (stderr) {
    throw new Error('bzip2 compression has failed: ' + stderr)
  }

  return stdout
}

export {compress}
