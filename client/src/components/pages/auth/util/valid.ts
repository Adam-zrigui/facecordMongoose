import * as Yup from "yup"

export default Yup.object().shape({
    username: Yup.string().min(4, "too short").max(15 , "too long").required("required"),
    password: Yup.string().min(8, "too short").max(15 , "too long").required("required"),
})