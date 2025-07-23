"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [nhsNumber, setNhsNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [variant, setVariant] = useState<string>("info");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`/api/patient/${nhsNumber}?dateOfBith=${dob}&surname=${surname}`);
      if (res.status === 404) {
        setVariant("danger");
        setMessage("Your details could not be found");
        return;
      }
      if (!res.ok) throw new Error("Failed");
      const data: { age: number } = await res.json();

      if (data.age < 16) {
        setVariant("warning");
        setMessage("You are not eligible for this service");
      } else {
        router.push(`/assessment?age=${data.age}`);
      }
    } catch {
      setVariant("danger");
      setMessage("Your details could not be found");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Patient Check</h1>
      {message && (
        <div className={`alert alert-${variant}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">NHS Number</label>
          <input
            type="text"
            className="form-control"
            value={nhsNumber}
            onChange={(e) => setNhsNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Surname</label>
          <input
            type="text"
            className="form-control"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
