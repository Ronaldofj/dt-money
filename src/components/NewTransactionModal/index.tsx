import React, { useState } from 'react'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import Modal from 'react-modal'

import { Container, TransactionTypeContainer, RadioBox } from './styles'

import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  onCloseNewTransactionModal: () => void;
  isOpen: boolean;
}

export function NewTransactionModal({
  onCloseNewTransactionModal,
  isOpen,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')


  async function handleCreateNewTransaction(e: React.FormEvent) {
    e.preventDefault();

    await createTransaction({
      title, category, amount, type
    });

    onCloseNewTransactionModal();

    setType('');
    setTitle('');
    setAmount(0);
    setCategory('');
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={() => onCloseNewTransactionModal()}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button"
        className="react-modal-close"
        onClick={() => onCloseNewTransactionModal()}
      >
        <img 
          src={closeImg} 
          alt="Fechar modal" 
        />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input 
          type="number" 
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox 
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>

        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}