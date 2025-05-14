import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecordingsView = () => {
  const [recordings, setRecordings] = useState([]);
  
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await axios.get('/api/recordings');
        setRecordings(response.data);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };
    fetchRecordings();
  }, []);

  const playRecording = (url) => {
    window.open(url, '_blank');
  };

  const downloadRecording = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Enregistrements</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Nouvel Enregistrement
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recordings.map(recording => (
              <tr key={recording._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{recording.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(recording.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recording.duration} minutes</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => playRecording(recording.url)}
                    className="mr-2 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => downloadRecording(recording.url)}
                    className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                  >
                    Télécharger
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordingsView;