import React, { useState } from 'react';

export default function Questionnaire() {
  const [form, setForm] = useState({
    interest: '',
    goal: '',
    experience: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // You can handle sending the data to the backend later
  };

  return (
    <div className="min-h-screen bg-blueGray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-blueGray-700">Questionnaire de carrière</h2>

        <div className="mb-4">
          <label className="block text-blueGray-600 font-medium mb-2">Quel domaine t'intéresse ?</label>
          <input
            type="text"
            name="interest"
            value={form.interest}
            onChange={handleChange}
            className="w-full border border-blueGray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ex: Développement web, cybersécurité..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-blueGray-600 font-medium mb-2">Quel est ton objectif de carrière ?</label>
          <input
            type="text"
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="w-full border border-blueGray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ex: Devenir développeur full-stack"
          />
        </div>

        <div className="mb-6">
          <label className="block text-blueGray-600 font-medium mb-2">As-tu une expérience dans ce domaine ?</label>
          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full border border-blueGray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Parle-nous un peu de ton parcours..."
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-md shadow transition duration-150"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
