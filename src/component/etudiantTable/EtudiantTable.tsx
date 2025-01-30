"use client";

// TODO : Note Importante //TODO J'ai changé tous les p-2 en p-3 pour que la table soit plus grande
import Image from "next/image";
import { useState } from "react";
import { registerUser } from "@/actions/signupetudiant";
// import RegisterFormEtudiant from "@/component/formulaires/RegisterFormEtudiant";
import RegisterFormEtudiant from "../formulaires/RegisterFormEtudiant ";
import { updateUser } from "@/actions/updateEtudiant";

type EtudiantType = {
  id: string;
  nom: string;
  email: string;
  image: string;
  classes: string;
  telephone: string;
  adresse: string;
};

const EtudiantTable = ({ etudiants }: { etudiants: EtudiantType[] }) => {
  // States
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [etudiantToUpdate, setEtudiantToUpdate] = useState<EtudiantType | null>(null);
  const [isSur, setIsSur] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 6;

  // Filtrage des étudiants
  const filteredEtudiants = etudiants.filter(
    (etudiant) =>
      etudiant.nom.toLowerCase().includes(search.toLowerCase()) ||
      etudiant.email.toLowerCase().includes(search.toLowerCase()) ||
      etudiant.classes.toLowerCase().includes(search.toLowerCase()) ||
      etudiant.adresse.toLowerCase().includes(search.toLowerCase()) ||
      etudiant.telephone.includes(search)
  );

  // Pagination
  const totalPages = Math.ceil(filteredEtudiants.length / itemsPerPage);
  const currentEtudiants = filteredEtudiants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Gérer la recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Gérer les pages
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Gestion de la mise à jour d'un étudiant
  const toggleModal = () => setIsOpen(!isOpen);
  const handleEditClick = (etudiant: EtudiantType) => {
    setEtudiantToUpdate(etudiant);
    toggleModal();
  };

  // Confirmation de suppression
  const toggleIsSur = () => setIsSur(!isSur);

  return (
    <div className="w-full mt-16 gap-10 flex flex-col justify-start items-center">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold mb-4">Liste des Etudiants</h1>
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            className="border rounded p-2 w-1/3"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="text-green-500 text-2xl" onClick={toggleModal}>
            +
          </button>
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="p-3">Infos</th>
              <th className="p-3">ID_Etudiant</th>
              <th className="p-3">Classes</th>
              <th className="p-3">Téléphone</th>
              <th className="p-3">Adresses</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEtudiants.map((etudiant) => (
              <tr key={etudiant.id} className="border-b-2 border-b-gray-400">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={etudiant.image || "/icons/default-avatar.png"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div>{etudiant.nom}</div>
                      <div className="text-sm text-gray-500">{etudiant.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">{etudiant.id}</td>
                <td className="p-3">{etudiant.classes}</td>
                <td className="p-3">{etudiant.telephone}</td>
                <td className="p-3">{etudiant.adresse}</td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Image
                      src="/icons/pencil.png"
                      alt="update"
                      width={20}
                      height={20}
                      onClick={() => handleEditClick(etudiant)}
                    />
                    <Image
                      src="/icons/eye.png"
                      alt="view"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/icons/delete.png"
                      alt="delete"
                      width={20}
                      height={20}
                      onClick={toggleIsSur}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <div>
            Page {currentPage} sur {totalPages}
          </div>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Modal de mise à jour */}
      {isOpen && etudiantToUpdate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white rounded-lg p-3 shadow-lg lg:px-8 lg:py-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <RegisterFormEtudiant
              onSubmit={async (formData: FormData) => {
                await updateUser(Number(etudiantToUpdate.id), formData);
                toggleModal();
              }}
              title="Mettre à jour un étudiant"
              initialValues={etudiantToUpdate}
            />
          </div>
        </div>
      )}

      {/* Confirmation de suppression */}
      {isSur && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleIsSur}
        >
          <div
            className="bg-white rounded-lg p-2 shadow-lg lg:px-8 lg:py-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-center">Supprimer un Etudiant</h2>
            <form>
              <div className="flex gap-2 text-center flex-col mt-6">
                <div className="text-lg flex justify-center font-medium w-[300px]">
                  êtes-vous sûr de vouloir effectuer cette opération ?
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-xl bg-green-500 rounded-xl px-10 py-2 text-white">
                    OUI
                  </button>
                  <button className="text-xl bg-red-500 rounded-xl px-10 py-2 text-white">
                    NON
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EtudiantTable;
