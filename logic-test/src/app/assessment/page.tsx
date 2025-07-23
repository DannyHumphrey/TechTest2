"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Assessment() {
  const searchParams = useSearchParams();
  const age = parseInt(searchParams.get("age") || "0", 10);
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>("info");

  const getAgeGroup = () => {
    if (age <= 21) return "16-21";
    if (age <= 40) return "22-40";
    if (age <= 65) return "41-65";
    return "65+";
  };

  const scoring: Record<string, { q1: number; q2: number; q3: number }> = {
    "16-21": { q1: 1, q2: 2, q3: 1 },
    "22-40": { q1: 2, q2: 2, q3: 3 },
    "41-65": { q1: 3, q2: 2, q3: 2 },
    "65+": { q1: 3, q2: 3, q3: 1 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q1 || !q2 || !q3) {
      setMessage("Please answer all questions");
      return;
    }
    const group = getAgeGroup();
    const row = scoring[group];
    let total = 0;
    if (q1 === "yes") total += row.q1;
    if (q2 === "yes") total += row.q2;
    if (q3 === "no") total += row.q3;
    if (total <= 3) {
      setVariant("info");
      setMessage(
        "Thank you for answering our questions, we don't need to see you at this time. Keep up the good work!"
      );
    } else {
        setVariant("warning")
        setMessage(
            "We think there are some simple things you could do to improve you quality of life, please phone to book an appointment"
        );
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Health Questions</h1>
      {message && <div className={`alert alert-${variant}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Q1. Do you drink on more than 2 days a week?</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="q1yes"
                name="q1"
                value="yes"
                checked={q1 === "yes"}
                onChange={() => setQ1("yes")}
              />
              <label className="form-check-label" htmlFor="q1yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="q1no"
                name="q1"
                value="no"
                checked={q1 === "no"}
                onChange={() => setQ1("no")}
              />
              <label className="form-check-label" htmlFor="q1no">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Q2. Do you smoke?</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="q2yes"
                name="q2"
                value="yes"
                checked={q2 === "yes"}
                onChange={() => setQ2("yes")}
              />
              <label className="form-check-label" htmlFor="q2yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="q2no"
                name="q2"
                value="no"
                checked={q2 === "no"}
                onChange={() => setQ2("no")}
              />
              <label className="form-check-label" htmlFor="q2no">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Q3. Do you exercise more than 1 hour per week?</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="q3yes"
                name="q3"
                value="yes"
                checked={q3 === "yes"}
                onChange={() => setQ3("yes")}
              />
              <label className="form-check-label" htmlFor="q3yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="q3no"
                name="q3"
                value="no"
                checked={q3 === "no"}
                onChange={() => setQ3("no")}
              />
              <label className="form-check-label" htmlFor="q3no">
                No
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}