import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

const INACTIVITY_TIME = 5 * 60 * 1000; // 5 minutes

export default function useAutoLogout() {
  const timer = useRef(null);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      toast.error(err.message);
    }

    navigate("/login");
  };

  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      logout();
    }, INACTIVITY_TIME);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);
}
