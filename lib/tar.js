import tar from 'tar-stream'
import getStream from 'get-stream'

function pack(files) {
  const archive = tar.pack()
  for (const file of files) {
    archive.entry({name: file.path}, file.data)
  }

  archive.finalize()
  return getStream.buffer(archive)
}

export {pack}
