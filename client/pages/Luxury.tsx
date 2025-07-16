import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Luxury() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page with luxury filter
    navigate("/?category=luxury");
  }, [navigate]);

  return null;
}
