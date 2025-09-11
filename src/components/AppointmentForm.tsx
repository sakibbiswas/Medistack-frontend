import React, { useState } from "react";

const AppointmentForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Appointment submitted successfully!");
    console.log(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
          required
        />
      </div>
      <textarea
        name="comment"
        placeholder="Write your comment here..."
        value={form.comment}
        onChange={handleChange}
        className="border p-3 rounded-md w-full h-24"
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
