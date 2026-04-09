import { useState, useEffect } from "react";

// counterapi.dev — free, no account needed, countapi.xyz drop-in replacement.
// GET /v1/{namespace}/{key}/up  → increments + returns { count: N }
// Dev visits use a separate key so they never inflate the real counter.
const NAMESPACE = "vanshsingh1203";
const KEY_PROD  = "portfolio-v1";
const KEY_DEV   = "portfolio-v1-dev";

export function useVisitorCount() {
  const [count,   setCount]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const key     = isLocal ? KEY_DEV : KEY_PROD;

    fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${key}/up`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => { setCount(d.count); setLoading(false); })
      .catch(() => { setLoading(false); }); // silently fail — footer still renders
  }, []);

  return { count, loading };
}
