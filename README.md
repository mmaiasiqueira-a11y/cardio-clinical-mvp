# Motor Clínico Cardiovascular — MVP

Protótipo de aplicação web para acompanhamento quantitativo cardiovascular e cardiometabólico.

> **Uso atual:** exclusivamente pacientes fictícios. Não inserir dados identificáveis de pacientes reais até revisão específica de segurança, privacidade, controle de acesso, logs e operação.

## Primeira entrega
- Next.js 16 + TypeScript
- pacientes fictícios locais
- tela de lista de pacientes
- visão resumida de paciente
- formulário visual de nova avaliação
- Motor Clínico isolado: IMC
- teste automatizado do IMC
- schema PostgreSQL/Supabase com RLS
- workflow de CI

## Princípios
1. Motor Clínico independente da interface.
2. Campo ausente não significa normal.
3. Medições históricas não são sobrescritas.
4. Metas ficam separadas dos resultados.
5. Cálculos guardam versão e snapshot de inputs.
6. Dados clínicos não pertencem ao GitHub.

## Rodar
```bash
npm install
npm run dev
```

## Validar
```bash
npm run typecheck
npm test
npm run build
```

## Próximos módulos
1. persistência em ambiente de teste;
2. não-HDL;
3. variação absoluta/percentual de LDL;
4. variação de peso;
5. CKD-EPI 2021;
6. regras de metas/status;
7. PREVENT após validação da implementação/licença oficial.
