import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './styles.css';

export default function Alterar() {
  const [Nome, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [NomePet, setNomePet] = useState("");
  const [Endereco, setEndereco] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [Raca, setRaca] = useState("");
  const [Idade, setIdade] = useState("");
  const { id } = useParams(); // Pega o ID do pet da URL
  const navigation = useNavigate();

  // Busca os dados do pet ao carregar a página
  useEffect(() => {
    const buscarPet = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/pets/${id}`);
        const pet = await resposta.json();
        setNome(pet.nome);
        setEmail(pet.email);
        setNomePet(pet.nomePet);
        setEndereco(pet.endereco);
        setTelefone(pet.telefone);
        setRaca(pet.raca);
        setIdade(pet.idade);
      } catch {
        alert('Ocorreu um erro ao buscar os dados do pet!');
      }
    };
    buscarPet();
  }, [id]);

  const alterarPet = async (event) => {
    event.preventDefault();
    console.log({
      nome: Nome,
      email: Email,
      nomePet: NomePet,
      endereco: Endereco,
      telefone: Telefone,
      raca: Raca,
      idade: Idade
    });

    try {
      const resposta = await fetch(`http://localhost:3000/pets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: Nome,
          email: Email,
          nomePet: NomePet,
          endereco: Endereco,
          telefone: Telefone,
          raca: Raca,
          idade: Idade
        })
      });

      if (resposta.ok) {
        navigation("/");
      } else {
        const erro = await resposta.json();
        console.log(erro);
        alert(erro.erro || "Erro desconhecido");
      }
    } catch {
      alert("Ocorreu um erro na aplicação!");
    }
  };

  return (
    <main>
      <form onSubmit={alterarPet}>
        <h2 className="titulo-registrar">Alterar Dados</h2>
        <input
          type="text"
          value={Nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Nome"
        />
        <input
          type="email"
          value={Email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={NomePet}
          onChange={(event) => setNomePet(event.target.value)}
          placeholder="Nome do Pet"
        />
        <input
          type="text"
          value={Endereco}
          onChange={(event) => setEndereco(event.target.value)}
          placeholder="Endereço"
        />
        <input
          type="tel"
          value={Telefone}
          onChange={(event) => setTelefone(event.target.value)}
          placeholder="Telefone"
        />
        <input
          type="text"
          value={Raca}
          onChange={(event) => setRaca(event.target.value)}
          placeholder="Raça"
        />
        <input
          type="number"
          value={Idade}
          onChange={(event) => setIdade(event.target.value)}
          placeholder="Idade"
        />
        <button className="save">Salvar Alterações</button>
      </form>
    </main>
  );
}
