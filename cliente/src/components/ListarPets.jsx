import React from "react";

export default function ListaPets({ lista, ordenarAZ, ordenarZA }) {
  return (
    <div>
      <h1>Lista de Pets</h1>
      <button onClick={ordenarAZ}>Ordenar A-Z</button>
      <button onClick={ordenarZA}>Ordenar Z-A</button>
      <ul>
        {lista.map((pet) => (
          <li key={pet.id}>
            <h2>{pet.nome}</h2>
            <p><strong>E-mail:</strong> {pet.email}</p>
            <p><strong>Nome do Pet:</strong> {pet.nomePet}</p>
            <p><strong>Raça:</strong> {pet.raca}</p>
            <p><strong>Idade:</strong> {pet.idade} anos</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
