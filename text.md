📌 Explicação do Projeto: Sistema de Gerenciamento de Segurança
Este projeto visa garantir um controle rigoroso de acesso, permitir o gerenciamento de recursos internos e fornecer um dashboard interativo para as Indústrias Teste.

🔹 1. Controle de Acesso 🔹
O sistema deve garantir que somente usuários autorizados possam acessar áreas restritas da empresa.

Funcionalidades principais: 
✅ Cadastro e login de usuários com autenticação (JWT, Flask-Login).
✅ Diferentes níveis de acesso (funcionários, gerentes, administradores).
✅ Permissão para cada nível acessar diferentes áreas da empresa.
✅ Registro de logs de acesso (quem entrou/saiu e quando).

Tecnologias sugeridas: Flask, Flask-Login, Flask-JWT, SQLAlchemy (para armazenar usuários e permissões).

🔹 2. Gestão de Recursos 🔹
Administradores poderão gerenciar o inventário de equipamentos, veículos e dispositivos de segurança.

Funcionalidades principais:
✅ Adicionar, remover e atualizar recursos.
✅ Listagem de recursos disponíveis.
✅ Armazenamento de informações no banco de dados.
✅ Controle de status de equipamentos (ativo, em manutenção, etc.).

Tecnologias sugeridas: Flask + SQLite/PostgreSQL + Flask-RESTful (API para gerenciar os recursos).

🔹 3. Dashboard de Visualização 🔹
Criar um painel de controle que exiba dados relevantes sobre segurança e recursos da empresa.

Funcionalidades principais:
✅ Exibir gráficos sobre acessos autorizados e não autorizados.
✅ Listagem rápida de equipamentos e veículos disponíveis.
✅ Histórico de atividades dentro das instalações.
✅ Design responsivo e visualmente atraente.

Tecnologias sugeridas: Flask + Flask-SQLAlchemy + Chart.js ou Dash (para visualização de gráficos).

🔹 Fluxo Geral do Sistema 🔹
1️⃣ Login ➝ O usuário faz autenticação e acessa apenas suas permissões.
2️⃣ Controle de Acesso ➝ O sistema verifica se ele pode entrar em áreas restritas.
3️⃣ Gestão de Recursos ➝ Admins podem cadastrar e monitorar equipamentos.
4️⃣ Dashboard ➝ Painel exibe gráficos e informações sobre segurança e recursos.

