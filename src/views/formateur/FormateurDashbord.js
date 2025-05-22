/*eslint-disable*/
import React, { useCallback, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Calendar, Video, Users, BookOpen, ChevronDown } from 'react-feather';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/fr';
import FormateurCourses from './FormateurCourses';
import FormateurCalendar from '../../views/formateur/FormateurCalendar';
import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { getAllUsers } from "../../services/apiUser";

moment.locale('fr');

const FormateurDashboard = () => {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('courses');
    const [user, setUser] = useState(null);
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [newSession, setNewSession] = useState({
        title: '',
        date: new Date(),
        duration: 60,
        type: 'online',
        conferenceLink: '',
        courseId: ''
    });

    const [data, setData] = useState({
        courses: [
            { id: 1, title: "Français Débutant", students: 15 },
            { id: 2, title: "Communication Professionnelle", students: 8 }
        ],
    });

    const getUsers = useCallback(async () => {
        try {
            console.log("fetching Apprenants... :");
            const res = await getAllUsers("Apprenant");
            console.log(res);
            setUsers(res.data.apprenantListe)
        } catch (error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        getUsers();
        const userInfo = Cookies.get('user_data');
        if (userInfo) setUser(JSON.parse(userInfo));
    }, [getUsers]);

    const handleAddSession = () => {
        const newId = Math.max(...data.sessions.map(s => s.id), 0) + 1;
        const sessionToAdd = {
            id: newId,
            ...newSession,
            conferenceLink: newSession.type === 'online'
                ? `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`
                : null,
            participants: 0
        };

        setData({
            ...data,
            sessions: [...data.sessions, sessionToAdd]
        });
        setShowSessionModal(false);
        setNewSession({
            title: '',
            date: new Date(),
            duration: 60,
            type: 'online',
            conferenceLink: '',
            courseId: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSession({
            ...newSession,
            [name]: value
        });
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'calendar':
                return <FormateurCalendar />;
            // case 'courses':
            //     return (
            //         <div className="space-y-6">
            //             <FormateurCourses />
            //         </div>
            //     );
            case 'students':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Mes Étudiants</h2>
                            <div className="relative">
                                <button className="bg-gray-100 px-4 py-2 rounded-lg flex items-center">
                                    Tous les cours <ChevronDown size={18} className="ml-2" />
                                </button>
                            </div>
                        </div>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        <h3 className="font-semibold text-base text-blueGray-700">
                                            Liste des Apprenants
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Nom
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Prénom
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Email
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Type de formation
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Téléphone
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.filter(user => user.role === "Apprenant").map((user) => (
                                            <tr key={user._id}>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user.nom}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user.prenom}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user.email}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user.formations?.map(f => f.titre).join(", ") || "Aucune formation"}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user.numTel}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Sidebar */}
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    {/* Brand */}
                    <Link
                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        to="/formateur/dashboard"
                    >
                        Tableau de Bord Formateur
                    </Link>
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            <NotificationDropdown />
                        </li>
                        <li className="inline-block relative">
                            <UserDropdown />
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        to="/formateur/dashboard"
                                    >
                                        Formateur
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            {/* <li className="items-center">
                                <button
                                    onClick={() => setActiveTab('courses')}
                                    className={
                                        "text-xs uppercase py-3 font-bold block w-full text-left " +
                                        (activeTab === 'courses' 
                                            ? "text-lightBlue-500 hover:text-lightBlue-600" 
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-book mr-2 text-sm " +
                                            (activeTab === 'courses' 
                                                ? "opacity-75" 
                                                : "text-blueGray-300")
                                        }
                                    ></i>{" "}
                                    Mes Cours
                                </button>
                            </li> */}

                            <li className="items-center">
                                <button
                                    onClick={() => setActiveTab('calendar')}
                                    className={
                                        "text-xs uppercase py-3 font-bold block w-full text-left " +
                                        (activeTab === 'calendar' 
                                            ? "text-lightBlue-500 hover:text-lightBlue-600" 
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-calendar mr-2 text-sm " +
                                            (activeTab === 'calendar' 
                                                ? "opacity-75" 
                                                : "text-blueGray-300")
                                        }
                                    ></i>{" "}
                                    Calendrier
                                </button>
                            </li>

                            <li className="items-center">
                                <button
                                    onClick={() => setActiveTab('students')}
                                    className={
                                        "text-xs uppercase py-3 font-bold block w-full text-left " +
                                        (activeTab === 'students' 
                                            ? "text-lightBlue-500 hover:text-lightBlue-600" 
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-users mr-2 text-sm " +
                                            (activeTab === 'students' 
                                                ? "opacity-75" 
                                                : "text-blueGray-300")
                                        }
                                    ></i>{" "}
                                    Étudiants
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative md:ml-64 bg-blueGray-100">
                {/* Top Navigation */}
                <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                    <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                        <h2 className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
                            {activeTab === 'courses' && 'Mes Cours'}
                            {activeTab === 'calendar' && 'Calendrier'}
                            {activeTab === 'students' && 'Mes Étudiants'}
                        </h2>
                        
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <NotificationDropdown />
                            <UserDropdown />
                        </ul>
                    </div>
                </nav>

                {/* Content */}
                <div className="relative bg-blueGray-100 md:pt-32 pb-32 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="flex flex-wrap">
                            {/* Main Content Area */}
                            <div className="w-full px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                                <h3 className="font-semibold text-base text-blueGray-700">
                                                    {activeTab === 'courses' && 'Gestion des Cours'}
                                                    {activeTab === 'calendar' && 'Calendrier des Sessions'}
                                                    {activeTab === 'students' && 'Liste des Apprenants'}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block w-full overflow-x-auto p-6">
                                        {renderTabContent()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Session Modal */}
            {showSessionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-4">Nouvelle Session</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la session</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newSession.title}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Ex: Introduction au Français"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date et heure</label>
                                    <input
                                        type="datetime-local"
                                        name="date"
                                        value={moment(newSession.date).format('YYYY-MM-DDTHH:mm')}
                                        onChange={(e) => setNewSession({ ...newSession, date: new Date(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Durée (minutes)</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={newSession.duration}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        min="30"
                                        step="15"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de session</label>
                                    <select
                                        name="type"
                                        value={newSession.type}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="online">En ligne (Vidéoconférence)</option>
                                        <option value="presentiel">Présentiel</option>
                                    </select>
                                </div>

                                {newSession.type === 'presentiel' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={newSession.location || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="Ex: Salle B12"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cours associé</label>
                                    <select
                                        name="courseId"
                                        value={newSession.courseId}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Sélectionnez un cours</option>
                                        {data.courses.map(course => (
                                            <option key={course.id} value={course.id}>{course.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowSessionModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleAddSession}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Créer la session
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormateurDashboard;