import { useState } from 'react'
import Modal from 'react-modal'

import { TransactionProvider } from './TransactionContext'

import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { NewTransactionModal } from './components/NewTransactionModal'

import { GlobalStyle } from './styles/global'

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen} 
        onCloseNewTransactionModal={handleCloseNewTransactionModal}
      />
    </TransactionProvider>
  );
}
