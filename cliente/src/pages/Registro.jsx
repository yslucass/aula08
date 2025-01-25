import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

export default function Registrar() {
  const [Nome, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [NomePet, setNomePet] = useState("");
  const [Endereco, setEndereco] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [Raca, setRaca] = useState("");
  const [Idade, setIdade] = useState("");

  const navigation = useNavigate();

  const registro = async (event) => {
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
      const resposta = await fetch("http://localhost:3000/pets", {
        method: "POST",
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
      <form onSubmit={registro}>
        <h2 className="titulo-registrar">Cadastrar</h2>
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
        <button className="save">Salvar</button>
      </form>
    </main>
  );
}
