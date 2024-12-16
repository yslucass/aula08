import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Registrar() {
    const [Nome, setNome] = useState("");
    const [Email, setEmail] = useState("");
    
    const navigation = useNavigate();

    const registro = async () => {
      event.preventDefault();
      try{
          const resposta = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {'Content-Type': 'Application/json'},
          body: JSON.stringify({
            nome: Nome,
            email: Email
          })
        });
        if(resposta.ok){
          navigation("/")
        }
      } catch{
        alert("Ocorreu um erro na aplicação!");
      }
    }

  return (
        <main>
          <form onSubmit={registro}>
              <input type="text" name="" value={Nome} onChange={(event) => setNome(event.target.value)}></input>
              <input type="text" name="" value={Email} onChange={(event) => setEmail(event.target.value)}></input>
              <button>Salvar</button>
          </form>
        </main>
  );
}