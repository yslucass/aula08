import { useState } from "react";

export default function Registrar() {
    const [Nome, setNome] = useState("");
    const [Email, setEmail] = useState("");

    const registro = async () => {
      try{
          await fetch('https//localhost:3000/usuarios', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            Nome: Nome,
            Email: Email
          })
        });
      } catch{
        alert("Ocorreu um ero na aplicação!");
      }
    }

  return (
        <main>
          <form onSubmit={event.preventDefault}>
              <input type="text" value={Nome} onChange={(event) => setNome(event.target.value)}></input>
              <input type="text" value={Nome} onChange={(event) => setEmail(event.target.value)}></input>
          </form>
        </main>
  );
}