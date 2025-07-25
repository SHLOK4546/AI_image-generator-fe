import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', prompt: '', photo: '' });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (!form.prompt) return alert('Please provide a proper prompt');
    try {
      setGeneratingImg(true);
      const res = await fetch(
        'https://ai-image-generation-be-fosk.onrender.com/api/v1/stability',
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: form.prompt }) }
      );
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data = await res.json();
      setForm((prev) => ({ ...prev, photo: data.photo }));
    } catch (err) {
      console.error(err);
      alert(`Failed: ${err.message}`);
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.prompt || !form.photo) return alert('Generate an image first');
    try {
      setLoading(true);
      await fetch('https://ai-image-generation-be-fosk.onrender.com/api/v1/stability', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      });
      alert('Shared successfully!');
      navigate('/');
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
          Create & Share
        </h2>
        <p className="mt-3 text-gray-300 text-lg leading-relaxed">
          Generate an imaginative image and share it with the community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Loki"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Sunset over a mountain range..."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        <div className="relative bg-gray-800 border-2 border-gray-600 rounded-lg flex justify-center items-center h-64">
          {form.photo ? (
            <img src={form.photo} alt={form.prompt} className="object-cover w-full h-full rounded-lg" />
          ) : (
            <img src={preview} alt="preview" className="w-1/2 opacity-30" />
          )}
          {generatingImg && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <Loader />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={generateImage}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-md transition"
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>

          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-md transition"
          >
            {loading ? 'Sharing...' : 'Share to Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
