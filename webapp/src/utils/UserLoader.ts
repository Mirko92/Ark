import { useState } from "react"

export function useLoader(startValue: boolean): [ boolean, () => void, () => void, () => void,] {

  const [displayLoader, setDisplayLoader] =
    useState<boolean>(startValue);

  function toggle() {
    setDisplayLoader(!displayLoader);
  }

  function start() {
    setDisplayLoader(true);
  }

  function stop() {
    setDisplayLoader(false);
  }

  return [
    displayLoader,
    toggle,
    start,
    stop
  ]
}