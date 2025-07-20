# 📋 ToDo List App

Aplicativo de lista de tarefas (ToDo List) desenvolvido em **React Native** com suporte a autenticação, criação de tarefas, subtarefas, perfis de usuário, notificações de urgência e testes automatizados.

---

## 🧪 Tecnologias Utilizadas

- **React Native** (com Expo)
- **Redux-Saga** (controle de estado global)
- **Redux-ToolKit**
- **React Hook Form** + **Zod** (validação de formulários)
- **React Query** (requisições e cache)
- **Styled Components** (estilização)
- **Jest** + **React Native Testing Library** (testes)
- **JSON Server** (API fake local)
- **Sentry** (log de erros)
- **React Query**
- **React Navigation**
---

## 🚀 Executando a Aplicação

### 📱 Pré-requisitos

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Git
- Editor como VSCode
- Celular com Expo Go **ou** emulador Android/iOS

---

## ⚙️ Instruções de Setup

### 1️⃣ Clonar o projeto

git clone https://github.com/leviutima/list-native.git
cd todo-app

npm install 

Verificar seu IP local (IPv4)
  Execute no terminal:
  ipconfig
  npx json-server --watch db.json --host 192.168.0.101 --port 3000

Atualizar ./service/api.ts

📱 Rodando a Aplicação com Expo
npx expo start

🧪 Rodando os Testes
Testes Unitários e de Integração
npm run test

Testes com Coverage
npm run test:coverage

✅ Funcionalidades
 - Login / Cadastro de Usuário
 - Perfil com edição inline
 - Criar, atualizar e deletar tarefas
 - Subtarefas dinâmicas
 - Notificação de tarefas URGENTES
 - Validações com Zod
 - Testes automatizados (Jest)
 - Integração com API Fake (JSON Server)
 - Estilização com Styled Components
