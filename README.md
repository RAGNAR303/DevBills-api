# 💰 DevBills API | O Seu Back-end Inteligente para Controle Financeiro

## Resumo do Projeto

O **DevBills API** é uma robusta solução de back-end desenvolvida para simplificar e otimizar o controle financeiro pessoal. A aplicação atua como o núcleo de um sistema de gerenciamento de contas, fornecendo todas as funcionalidades essenciais para organizar receitas e despesas de forma eficiente. O principal problema que este projeto se propõe a resolver é a dificuldade de manter um registro organizado e categorizado das movimentações financeiras, permitindo que o usuário tenha uma visão clara de seus hábitos de consumo e saúde financeira.

Os principais recursos do sistema incluem a criação e gestão de **categorias** personalizadas (por exemplo, "Alimentação", "Transporte", "Salário"), a inserção detalhada de **transações financeiras** (com nome, valor, data e tipo - receita ou despesa), e a capacidade avançada de **filtragem** e **listagem** dessas transações por período ou categoria. A arquitetura em API RESTful garante que este back-end possa ser facilmente integrado com diversas aplicações front-end (web ou mobile), tornando-o uma ferramenta versátil para desenvolvedores que buscam construir seu próprio aplicativo de gestão de finanças.

***

## 🛠️ Tecnologias Utilizadas

Esta seção detalha as principais linguagens, ambientes de execução, frameworks, bibliotecas e ferramentas utilizadas na construção do **DevBills API**, inferidas a partir da estrutura e das necessidades de uma API moderna de controle financeiro.

| Tipo | Tecnologia | Descrição Breve |
| :--- | :--- | :--- |
| **Linguagem / Runtime** | **Node.js** | Ambiente de execução JavaScript assíncrono e orientado a eventos, crucial para a construção de APIs rápidas e escaláveis. |
| **Linguagem** | **TypeScript** | Uma linguagem de programação que é um superset tipado do JavaScript. É essencial para adicionar tipagem estática ao projeto, melhorando a manutenibilidade, a segurança e a capacidade de detecção de erros em tempo de desenvolvimento. |
| **Framework** | **Express** | Um framework web minimalista e flexível para Node.js, utilizado para configurar rotas, middlewares e manipular requisições HTTP, servindo como a espinha dorsal da API RESTful. |
| **Banco de Dados (DB)** | **MongoDB** | Um banco de dados NoSQL orientado a documentos. Foi escolhido por sua flexibilidade no esquema de dados, ideal para armazenar categorias e transações financeiras. |
| **ORM / ODM** | **Mongoose** | Uma biblioteca de modelagem de dados de objeto (ODM - Object Data Modeling) para MongoDB em Node.js. Facilita a definição de esquemas de dados e a interação com o banco de dados de forma mais estruturada e intuitiva. |
| **Containerização** | **Docker** | Uma plataforma para desenvolver, enviar e executar aplicações em contêineres. Garante que o ambiente de execução da API (incluindo o Node.js e o MongoDB) seja consistente em qualquer máquina, simplificando o setup e o deploy. |
| **Ferramenta Auxiliar** | **Thunder Client / Postman** | Extensões ou ferramentas utilizadas para testar as rotas da API durante o desenvolvimento, verificando se as requisições (GET, POST, PUT, DELETE) e as respostas estão funcionando conforme o esperado. |

***

## 🚀 Como Rodar o Projeto (Instruções Deduzidas)

Para rodar esta API localmente, você precisará ter o **Node.js** e o **MongoDB** instalados, ou optar pelo método de containerização com **Docker** para um ambiente mais isolado.

### Pré-requisitos

* Node.js (versão 18+)
* npm ou yarn
* MongoDB
* Docker e Docker Compose (opcional)

### 1. Clonando o Repositório

```bash
git clone https://github.com/RAGNAR303/DevBills-api.git
cd DevBills-api
````

```bash
# .env
PORT=3000
MONGO_URI="mongodb://localhost:27017/devbills"
````
