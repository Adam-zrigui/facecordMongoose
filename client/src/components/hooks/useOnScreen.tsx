import React, { useEffect } from 'react'

export default function useOnScreen(ref : React.RefObject<any>) {
  const [isInter , setInter] = React.useState(false)
const observer = new IntersectionObserver(([entry]) => setInter(entry.isIntersecting))
  useEffect(() => {
    observer.observe(ref.current)
    return () => {
        observer.disconnect()
    }
  }, []) 
  return isInter
}
