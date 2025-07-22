"use client";
import { useState } from "react";

export default function Home() {
  const [nhsNumber, setNhsNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [variant, setVariant] = useState<string>("info");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`/api/patient/${nhsNumber}`);
      if (res.status === 404) {
        setVariant("danger");
        setMessage("Your details could not be found");
        return;
      }
      if (!res.ok) throw new Error("Failed");
      const data: { name: string; born: string } = await res.json();
      const [apiSurname] = data.name.split(",");
      const dobFormatted = new Date(dob)
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-");
      if (
        apiSurname.trim().toLowerCase() !== surname.trim().toLowerCase() ||
        data.born !== dobFormatted
      ) {
        setVariant("danger");
        setMessage("Your details could not be found");
        return;
      }
      const [day, month, year] = data.born.split("-").map(Number);
      const dobDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      if (age < 16) {
        setVariant("warning");
        setMessage("You are not eligible for this service");
      } else {
        setVariant("success");
        setMessage("Welcome, you can now proceed to part 2");
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
