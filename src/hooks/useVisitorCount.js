import { useState, useEffect } from "react";

// Free hit-counter API — no account needed.
// Each call increments the counter and returns the new value.
// Dev visits (localhost) use a separate key so they don't pollute the real count.
const NAMESPACE = "vanshsingh1203";
const KEY_PROD  = "portfolio-v1";
const KEY_DEV   = "portfolio-v1-dev";

export function useVisitorCount() {
  const [count,   setCount]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const key     = isLocal ? KEY_DEV : KEY_PROD;

    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${key}`)
      .then(r => r.json())
      .then(d => { setCount(d.value); setLoading(false); })
      .catch(() => { setLoading(false); }); // silently fail — footer still renders
  }, []);

  return { count, loading };
}
