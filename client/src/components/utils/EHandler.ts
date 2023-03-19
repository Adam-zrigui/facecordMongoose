import axios from "axios";

export default function EHandler(error : unknown) : string {
  let msg = ""
  if (axios.isAxiosError(error) && error.response) {
    let errMsg = null;
    if (error.response.data) errMsg = error.response.data.message
return (msg = errMsg ? errMsg : "Unknown error From BE")  
}
if ( error instanceof Error ) return (msg = error.message)

return (msg = "something went wrong! " + String(error))
}

