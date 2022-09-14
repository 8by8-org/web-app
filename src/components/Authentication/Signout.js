import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import errorMessage from "../../functions/errorMessage";
import { auth } from "../../firebase";

export default function Logout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    auth
      .getAuth()
      .signOut()
      .then(() => setLoading(false))
      .catch((e) => setError(errorMessage(e)));
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {!loading && <Redirect to="/" />}
    </>
  );
}
