const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let pets = [];

app.post('/pets', (req, res) => {
    const { nome, email, nomePet, endereco, telefone, raca, idade } = req.body;
  
    // Verificando se todos os campos obrigatórios estão presentes
    if (!nome || !email || !nomePet || !endereco || !telefone || !raca || !idade) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }
  
    const novoPet = { id: pets.length + 1, nome, email, nomePet, endereco, telefone, raca, idade };
    pets.push(novoPet);
  
    res.status(201).json(novoPet);
  });
  

app.get('/pets', (req, res) => {
    res.status(200).json(pets);
});

app.get('/pets/:id', (req, res) => {
    const { id } = req.params;
    const pet = pets.find(p => p.id === parseInt(id));

    if (!pet) {
        return res.status(404).json({ erro: 'Pet não encontrado' });
    }

    res.status(200).json(pet);
});

app.put('/pets/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, nomePet, endereco, telefone, raca, idade } = req.body;

    const pet = pets.find(p => p.id === parseInt(id));

    if (!pet) {
        return res.status(404).json({ erro: 'Pet não encontrado' });
    }

    pet.nome = nome || pet.nome;
    pet.email = email || pet.email;
    pet.nomePet = nomePet || pet.nomePet;
    pet.endereco = endereco || pet.endereco;
    pet.telefone = telefone || pet.telefone;
    pet.raca = raca || pet.raca;
    pet.idade = idade || pet.idade;

    res.status(200).json(pet);
});

app.delete('/pets/:id', (req, res) => {
    const { id } = req.params;
    const index = pets.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Pet não encontrado' });
    }

    pets.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
