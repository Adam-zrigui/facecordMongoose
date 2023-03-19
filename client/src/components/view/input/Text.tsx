import { useField } from "formik";
import { useMemo } from "react";

import React from 'react'
interface T {
    label: string;
    name: string;
    type: 'text' | 'email' | 'password';
}

export const Text: React.FC<T> = ({label , name , type}) => {
const Field = {name} 
  const [field , meta] = useField({name})
const isError = useMemo(() => !!(meta.touched && meta.error), [meta]);

  return (
    <div>
        <label data-is-error={isError}>{label}</label>
        <input type={type} {...Field} {...field} data-is-error={isError} autoComplete="off"/>
        {isError ? <span>{meta.error}</span> : '' }
    </div>
  )
}
