# mongo-backup

Projeto criado para fazer o backup diário de um banco de dados MongoDB.

* [Finalidade](#Finalidade)
* [Segurança](#Segurança)
* [Configurações](#Configurações)

## Finalidade

Nesse projeto estou fazendo um backup para um outro banco mongo em vez de um arquivo, que em caso de algum problema eu possa simplesmente mudar o app para consumir o banco de backup de forma rápida, segura e fácil.

## Segurança

Para sua segurança altere o arquivo docker-compose.yml com dados seguros, eu deixei apenas com algumas configurações padrões para servir de exemplo.

## Configurações

Ao realizar o build você deve passar 04 variáveis de ambiente:
-   DB_APP_URL=<URL_DO_MONGODB_DA_SUA_APLICAÇÃO>
-   DB_BACKUP_URL=<URL_DO_MONGODB_DE_BACKUP_OU_CONTAINER_CRIADO>
-   CRON_MIN=<HORA_DO_BACKUP>
-   CRON_HOUR=<MINUTO_DO_BACKUP>

CONFIGURAÇÕES DE EXEMPLO(usando o container criado no docker-compose):
- DB_APP_URL=mongodb://root:123test@localhost:27017
- DB_BACKUP_URL=mongodb://root:backup123@localhost:27019
- CRON_MIN=59
- CRON_HOUR=23