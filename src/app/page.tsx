"use client"
import axios from 'axios';
import { UUID, randomUUID } from 'crypto';
import { useEffect, useState } from 'react';

type Item = {
  id: UUID
  text: string,
  checked: false
}

export default function MarketList() {
  const [item, setItem] = useState<Item[]>([]);
  const [text, setText] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadItens();
  }, [])
  
  async function loadItens() {
    const response = await axios.get("http://localhost:3001/itens");
    setItem(response.data);
    loadItens();
  }

  async function handleAddItem() {
    // CRIAR O OBJETO DO ITEM
    const itens = {
      id: randomUUID,
      text: text,
      checked: false
    }
    // CHAMA A API PARA ADICIONAR O ITEM
    await axios.post("http://localhost:3002/itens", itens)
    setText('');
    loadItens();
  }

  async function handleRemoveItem(id: string) {
    await axios.delete(`http://localhost:3001/itens/${id}`)
    // FILTRA O ESTADO E REMOVE O ITEM
    // CHAMA A API PARA REMOVER O ITEM
    // CARREGA OS PRODUTOS NOVAMENTE // loadItens();
    loadItens();
  }
  
  async function handleUpdateItem(id: string, checked: boolean ) {
    
    // CHAMA A API PARA ATUALIZAR O ITEM
    await axios.patch(`http://localhost:3001/itens/${id}`,{checked:checked})
    
    // cheack box
    // CRIA O OBJETO DO ITEM
    // CARREGA OS PRODUTOS NOVAMENTE // loadItens();
    loadItens();
  }

  return (
    <div className="container">
    <div>
      <h1>MarketList</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicione um novo item"
      />
      <button onClick={handleAddItem}>Adicionar item</button>
    </div>
    <div className="content">
      <div>
        
        {item.map(item => (
          <input type='cheackbox' onClick={handleUpdateItem} key={item.id}>
            <span>{text}</span>
            <span>{item.text}</span>
            {item.text} <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
          </input>
        ))}
      </div>
    </div>
  </div>
);
}
