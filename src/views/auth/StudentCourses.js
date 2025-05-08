import React, { useEffect, useState } from 'react';
import { getMyFormation, getFormationChapters } from '../../services/apiFormation';

const StudentCourses = () => {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await getMyFormation();
        setFormations(res.formations);
      } catch (err) {
        console.error('Error fetching formations:', err);
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    //   if (error.response?.status === 401) {
    //     // Handle unauthorized (redirect to login)
    //     history.push('/login');
    //   } else {
    //     // Show user-friendly error
    //     setError('Impossible de charger les formations');
    //   }
    // }
    };
    fetchFormations();
  }, []);

  const fetchChapters = async (formationId) => {
    try {
      const response = await getFormationChapters(formationId);
      setSelectedFormation(prev => ({ 
        ...prev, 
        chapitres: response.data 
      }));
    } catch (err) {
      console.error('Error fetching chapters:', err);
      setError('Failed to load chapters');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (formations.length === 0) return <div className="text-center py-8">No courses found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">ACCUEIL</h1>
      <div className="flex space-x-4 mb-6">
        <button className="font-medium">Cours</button>
        <button className="font-medium">Calendrier</button>
        <button className="font-medium">Historique des leçons</button>
        <button className="font-medium">Ressources</button>
      </div>

      <h2 className="text-xl font-bold mb-4">Mes Cours</h2>
      <div className="space-y-4">
        {formations.map(formation => (
          <div key={formation._id} className="border rounded p-4 shadow-sm bg-white">
            <h3 className="font-bold text-lg">{formation.titre}</h3>
            <p className="text-sm text-gray-600 mb-2">{formation.description}</p>
            
            <button
              onClick={() => {
                setSelectedFormation(formation);
                fetchChapters(formation._id);
              }}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Voir les chapitres
            </button>

            {selectedFormation?._id === formation._id && selectedFormation?.chapitres && (
              <div className="mt-3">
                <h4 className="font-semibold">Chapitres:</h4>
                <ul className="ml-4 list-disc text-sm text-gray-700">
                  {selectedFormation.chapitres.map(chapitre => (
                    <li key={chapitre._id} className="py-1">
                      {chapitre.titre}
                      {chapitre.lienVideo && (
                        <a href={chapitre.lienVideo} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2">
                          (Vidéo)
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;