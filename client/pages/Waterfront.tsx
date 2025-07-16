import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Waterfront() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page with waterfront filter
    navigate("/?category=waterfront");
  }, [navigate]);

  return null;
}
