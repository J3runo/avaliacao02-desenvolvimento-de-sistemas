"use client"
import axios from 'axios';
import { UUID, randomUUID } from 'crypto';
import { useEffect, useState } from 'react';

type Item = {
  id: UUID
  text: "",
  checked: false
}

export default function MarketList() {
  const [item, setItem] = useState<Item[]>([]);
  useEffect(() => {
    loadItens();
  }, [])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function loadItens() {
    const response = await axios.get("http://localhost:3001/db.json");
    
  }

  async function handleAddItem() {
   
    // CRIAR O OBJETO DO ITEM
    const item = {
      id:randomUUID,
      nome:""
    }
    
    // CHAMA A API PARA ADICIONAR O ITEM
    await axios.post("http://localhost:3000/posts", item);

    loadItens();
  }

  function handleRemoveItem(id: string) {
    // FILTRA O ESTADO E REMOVE O ITEM
    // CHAMA A API PARA REMOVER O ITEM
    // CARREGA OS PRODUTOS NOVAMENTE // loadItens();
  }

  function handleUpdateItem(id: string) {
    // CRIA O OBJETO DO ITEM
    // CHAMA A API PARA ATUALIZAR O ITEM
    // CARREGA OS PRODUTOS NOVAMENTE // loadItens();
  }

  return (
    <div className="container">
      <div>
        <h1>MarketList</h1>
        <input type="text" placeholder='Adicione um novo item' />
        <button onClick={handleAddItem}>Adicionar item</button>
      </div>
      <div className='content'>
      {isLoading ? (
                        <h1></h1>
                    ) : (
                        item.map(item => (
                            <Item post={item} key={item.id} setItem={setItem} />
                        ))
                    )}
      </div>
    </div>
  );
}
