import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import './styles.css';

export default function Home() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const buscarPets = async () => {
            try {
                const resposta = await fetch("http://localhost:3000/pets");
                const dados = await resposta.json();
                setPets(dados);
            } catch {
                alert('Ocorreu um erro ao buscar os dados dos pets!');
            }
        };
        buscarPets();
    }, []);

    const removerPet = async (id) => {
        try {
            await fetch('http://localhost:3000/pets/' + id, {
                method: 'DELETE'
            });
            setPets(pets.filter(pet => pet.id !== id));
        } catch {
            alert("Erro ao remover o pet!");
        }
    };

    const exportarPDF = () => {
        const doc = new jsPDF();
        const tabela = pets.map(pet => [
            pet.id,
            pet.nome,
            pet.email,
            pet.nomePet,
            pet.endereco,
            pet.telefone,
            pet.raca,
            pet.idade
        ]);
        doc.text("Lista de Pets", 10, 10);
        doc.autoTable({
            head: [["ID", "Nome", "E-mail", "Nome do Pet", "Endereço", "Telefone", "Raça", "Idade"]],
            body: tabela
        });
        doc.save("pets.pdf");
    };

    return (
        <div className="home-container">
            <div className="export-container">
                <Button variant="contained" onClick={() => exportarPDF()}>Gerar PDF</Button>
            </div>
            <table className="pets-table">
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>E-mail</td>
                        <td>Nome do Pet</td>
                        <td>Endereço</td>
                        <td>Telefone</td>
                        <td>Raça</td>
                        <td>Idade</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet) => (
                        <tr key={pet.id}>
                            <td>{pet.nome}</td>
                            <td>{pet.email}</td>
                            <td>{pet.nomePet}</td>
                            <td>{pet.endereco}</td>
                            <td>{pet.telefone}</td>
                            <td>{pet.raca}</td>
                            <td>{pet.idade}</td>
                            <td className="actions">
                                <button className="remove-btn" onClick={() => removerPet(pet.id)}>X</button>
                                <Link to={`/alterar/${pet.id}`}>
                                    <button className="edit-btn">Alterar</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
