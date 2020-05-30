import { storage } from '../config/FirebaseConfig'
import moment from 'moment'

export const registerImage = async (file: File, directory: string) => {
  const ts = moment(new Date()).unix().toString();
  const filename = file.name
  
  var ref = storage.ref().child(`images/${directory}/${ts}_${filename}`);
  await ref.put(file)
  return await ref.getDownloadURL()
}
